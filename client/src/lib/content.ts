/* eslint-disable @typescript-eslint/no-explicit-any -- Firestore documents are schemaless here */
import "server-only";
import { firebaseConfig, CONTENT_TAG } from "./firebase-config";

// Reads go through the Firestore REST API (not the JS SDK) so they flow through
// Next's fetch cache: ISR + revalidateTag(CONTENT_TAG) after admin edits.
const BASE = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents`;
const KEY = `key=${firebaseConfig.apiKey}`;
const CACHE: RequestInit = { next: { revalidate: 3600, tags: [CONTENT_TAG] } };

type FsValue = Record<string, any>;
export type Doc = any;

export function decodeValue(v: FsValue): any {
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("nullValue" in v) return null;
  if ("timestampValue" in v) return v.timestampValue;
  if ("arrayValue" in v) return (v.arrayValue.values ?? []).map(decodeValue);
  if ("mapValue" in v) return decodeFields(v.mapValue.fields ?? {});
  return null;
}

function decodeFields(fields: Record<string, FsValue>) {
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(fields)) out[k] = decodeValue(v);
  return out;
}

function toDoc(raw: { name: string; fields?: Record<string, FsValue> }): Doc {
  return { ...decodeFields(raw.fields ?? {}), id: raw.name.split("/").pop()! };
}

type Collection =
  | "services"
  | "portfolio_projects"
  | "saas_products"
  | "blog_posts"
  | "social_links"
  | "stats"
  | "testimonials"
  | "faqs";

const VISIBLE_FLAG: Record<Collection, string> = {
  services: "is_active",
  saas_products: "is_active",
  social_links: "is_active",
  portfolio_projects: "is_published",
  blog_posts: "is_published",
  stats: "is_published",
  testimonials: "is_published",
  faqs: "is_published",
};

// Security rules only allow public reads of visible docs, so every list query
// must filter on the same flag the rules check.
async function listVisible(collection: Collection): Promise<Doc[]> {
  try {
    const res = await fetch(`${BASE}:runQuery?${KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: collection }],
          where: {
            fieldFilter: {
              field: { fieldPath: VISIBLE_FLAG[collection] },
              op: "EQUAL",
              value: { booleanValue: true },
            },
          },
        },
      }),
      ...CACHE,
    });
    if (!res.ok) {
      console.error(`Firestore list ${collection} failed: ${res.status}`);
      return [];
    }
    const rows: { document?: any }[] = await res.json();
    return rows.filter((r) => r.document).map((r) => toDoc(r.document));
  } catch (error) {
    console.error(`Firestore list ${collection} error:`, error);
    return [];
  }
}

async function getVisible(collection: Collection, id: string): Promise<Doc | null> {
  if (!/^[A-Za-z0-9_-]{1,128}$/.test(id)) return null;
  try {
    const res = await fetch(`${BASE}/${collection}/${id}?${KEY}`, CACHE);
    if (!res.ok) return null;
    const doc = toDoc(await res.json());
    return doc[VISIBLE_FLAG[collection]] === true ? doc : null;
  } catch {
    return null;
  }
}

const byCreatedDesc = (a: Doc, b: Doc) => String(b.created_at ?? "").localeCompare(String(a.created_at ?? ""));
const byCreatedAsc = (a: Doc, b: Doc) => -byCreatedDesc(a, b);
const byField = (f: string) => (a: Doc, b: Doc) => (a[f] ?? 0) - (b[f] ?? 0);

export const getServices = async () => (await listVisible("services")).sort(byCreatedAsc);
export const getService = (id: string) => getVisible("services", id);

export const getPortfolio = async () => (await listVisible("portfolio_projects")).sort(byCreatedDesc);
export const getPortfolioProject = (id: string) => getVisible("portfolio_projects", id);

export const getSaasProducts = async () => (await listVisible("saas_products")).sort(byCreatedAsc);
export const getSaasProduct = async (slug: string) =>
  (await listVisible("saas_products")).find((p) => p.slug === slug) ?? null;

export const getBlogPosts = async () => (await listVisible("blog_posts")).sort(byCreatedDesc);
export const getBlogPost = async (slug: string) =>
  (await listVisible("blog_posts")).find((p) => p.slug === slug) ?? null;

export const getSocialLinks = async () => (await listVisible("social_links")).sort(byField("sort_order"));
export const getStats = async () => (await listVisible("stats")).sort(byField("sort"));
export const getTestimonials = async () => (await listVisible("testimonials")).sort(byField("sort"));
export const getFaqs = async () => (await listVisible("faqs")).sort(byField("sort"));

// Unauthenticated create; firestore.rules validates shape/sizes and that
// created_at equals the server request time.
export async function createSubmission(
  collection: "contact_messages" | "quote_requests",
  data: Record<string, string>,
): Promise<boolean> {
  const fields: Record<string, FsValue> = {};
  for (const [k, v] of Object.entries(data)) fields[k] = { stringValue: v };
  const id = crypto.randomUUID().replace(/-/g, "");
  const res = await fetch(`${BASE}:commit?${KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({
      writes: [
        {
          update: { name: `projects/${firebaseConfig.projectId}/databases/(default)/documents/${collection}/${id}`, fields },
          updateTransforms: [{ fieldPath: "created_at", setToServerValue: "REQUEST_TIME" }],
          currentDocument: { exists: false },
        },
      ],
    }),
  });
  if (!res.ok) console.error(`Firestore create ${collection} failed: ${res.status} ${await res.text()}`);
  return res.ok;
}
