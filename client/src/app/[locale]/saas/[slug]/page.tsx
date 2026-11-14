import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { pageWrap } from "@/components/page-header";
import { HomeCta } from "@/components/home/home-sections";
import { getSaasProduct } from "@/lib/content";
import { excerpt, pick } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";

type Feature = string | { item?: string };

function featureList(value: unknown): string[] {
  if (typeof value === "string") return value.split("\n").map((s) => s.trim()).filter(Boolean);
  if (!Array.isArray(value)) return [];
  return (value as Feature[]).map((f) => (typeof f === "string" ? f : f?.item ?? "")).filter(Boolean);
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const product = await getSaasProduct(slug);
  if (!product) return {};
  return {
    title: pick(product.name, locale),
    description: excerpt(pick(product.description, locale), 160),
    alternates: { canonical: `/${locale}/saas/${slug}` },
  };
}

export default async function SaasDetailPage({ params: { locale, slug } }: { params: { locale: "en" | "ar"; slug: string } }) {
  const [product, t, home] = await Promise.all([
    getSaasProduct(slug),
    getTranslations({ locale, namespace: "Pages" }),
    getTranslations({ locale, namespace: "Home" }),
  ]);
  if (!product) notFound();

  const other = locale === "ar" ? "en" : "ar";
  const name = pick(product.name, locale);
  const description = pick(product.description, locale);
  const pricing = pick(product.pricing, locale);
  const own = featureList(product.features?.[locale]);
  const features = own.length ? own : featureList(product.features?.[other]);
  const wa = whatsappLink(t("saas_wa", { name }));
  const Back = locale === "ar" ? ArrowRight : ArrowLeft;
  const External = locale === "ar" ? ArrowUpLeft : ArrowUpRight;

  return (
    <>
      <article className={`${pageWrap} pb-20 pt-10`}>
        <Link href={`/${locale}/saas`} className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">
          <Back className="h-4 w-4" />
          {t("saas_back")}
        </Link>

        <header className="mt-8 grid grid-cols-1 gap-6 border-b border-border pb-10 lg:grid-cols-12 lg:gap-12">
          <h1 className="font-display text-[2.1rem] font-extrabold leading-[1.25] text-foreground sm:text-5xl lg:col-span-7">{name}</h1>
          <div className="lg:col-span-5 lg:self-end">
            {description && <p className="text-lg font-light leading-relaxed text-muted-foreground">{description}</p>}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] font-semibold">
              {product.url && (
                <a href={product.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded bg-foreground px-4 py-2.5 text-background transition-colors duration-150 hover:bg-brand">
                  {t("saas_demo")}
                  <External className="h-4 w-4" />
                </a>
              )}
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-border decoration-2 underline-offset-[6px] hover:decoration-brand">
                  {t("saas_ask")}
                </a>
              )}
            </div>
          </div>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <section className="lg:col-span-7">
            <h2 className="text-sm font-medium text-foreground">{t("saas_features")}</h2>
            <ol className="mt-4 border-t border-border">
              {features.map((f, i) => (
                <li key={i} className="flex gap-4 border-b border-border py-4 text-[17px] text-foreground">
                  <span className="pt-1 font-mono text-sm text-brand" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
                  {f}
                </li>
              ))}
            </ol>
          </section>
          <aside className="lg:col-span-5">
            <h2 className="text-sm font-medium text-foreground">{t("saas_pricing")}</h2>
            <p className="mt-4 border-t border-border pt-4 font-display text-2xl font-bold text-foreground">
              {pricing || t("saas_pricing_ask")}
            </p>
          </aside>
        </div>
      </article>
      <HomeCta locale={locale} t={home} />
    </>
  );
}
