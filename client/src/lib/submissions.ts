import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { createSubmission } from "./content";

type Rule = { required?: boolean; max: number; email?: boolean };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-instance throttle (5/min/IP), mirroring the old Laravel throttle:5,1.
const hits = new Map<string, number[]>();
function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function handleSubmission(
  request: NextRequest,
  collection: "contact_messages" | "quote_requests",
  rules: Record<string, Rule>,
  extra: Record<string, string> = {},
) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (throttled(ip)) return NextResponse.json({ message: "Too many requests" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const data: Record<string, string> = {};
  const errors: Record<string, string> = {};
  for (const [field, rule] of Object.entries(rules)) {
    const raw = body[field];
    const value = typeof raw === "string" ? raw.trim() : "";
    if (!value) {
      if (rule.required) errors[field] = "required";
      continue;
    }
    if (value.length > rule.max) errors[field] = `max:${rule.max}`;
    else if (rule.email && !EMAIL_RE.test(value)) errors[field] = "email";
    else data[field] = value;
  }
  if (Object.keys(errors).length) return NextResponse.json({ message: "Invalid data", errors }, { status: 422 });

  const ok = await createSubmission(collection, { ...data, ...extra });
  if (!ok) return NextResponse.json({ success: false }, { status: 500 });
  return NextResponse.json({ success: true }, { status: 201 });
}
