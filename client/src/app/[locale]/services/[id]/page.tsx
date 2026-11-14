import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { pageWrap } from "@/components/page-header";
import { SafeHtml } from "@/components/safe-html";
import { HomeCta } from "@/components/home/home-sections";
import { getService } from "@/lib/content";
import { excerpt, pick } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";

type Feature = string | { item?: string };

function features(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return (value as Feature[]).map((f) => (typeof f === "string" ? f : f?.item ?? "")).filter(Boolean);
}

export async function generateMetadata({ params: { locale, id } }: { params: { locale: string; id: string } }): Promise<Metadata> {
  const service = await getService(id);
  if (!service) return {};
  return {
    title: pick(service.title, locale),
    description: excerpt(pick(service.description, locale), 160),
    alternates: { canonical: `/${locale}/services/${id}` },
  };
}

export default async function ServiceDetail({ params: { locale, id } }: { params: { locale: "en" | "ar"; id: string } }) {
  const [service, t, home] = await Promise.all([
    getService(id),
    getTranslations({ locale, namespace: "Pages" }),
    getTranslations({ locale, namespace: "Home" }),
  ]);
  if (!service) notFound();

  const other = locale === "ar" ? "en" : "ar";
  const title = pick(service.title, locale);
  const description = pick(service.description, locale);
  const content: string = service.content?.[locale] || service.content?.[other] || "";
  const list = features(service.features?.[locale]).length ? features(service.features?.[locale]) : features(service.features?.[other]);
  const wa = whatsappLink(t("service_wa", { name: title }));
  const Back = locale === "ar" ? ArrowRight : ArrowLeft;

  return (
    <>
      <article className={`${pageWrap} pb-20 pt-10`}>
        <Link href={`/${locale}/services`} className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">
          <Back className="h-4 w-4" />
          {t("service_back")}
        </Link>

        <header className="mt-8 grid grid-cols-1 gap-6 border-b border-border pb-10 lg:grid-cols-12 lg:gap-12">
          <h1 className="font-display text-[2.1rem] font-extrabold leading-[1.25] text-foreground sm:text-5xl lg:col-span-7">{title}</h1>
          <div className="lg:col-span-5 lg:self-end">
            {description && <p className="text-lg font-light leading-relaxed text-muted-foreground">{description}</p>}
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex rounded bg-foreground px-4 py-2.5 text-[15px] font-semibold text-background transition-colors duration-150 hover:bg-brand">
                {home("cta_whatsapp")}
              </a>
            )}
          </div>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          {content && (
            <section className="lg:col-span-7">
              <h2 className="text-sm font-medium text-foreground">{t("service_overview")}</h2>
              <SafeHtml html={content} className="rich mt-4 text-[17px] text-foreground/85" />
            </section>
          )}
          <section className={content ? "lg:col-span-5" : "lg:col-span-8"}>
            <h2 className="text-sm font-medium text-foreground">{t("service_features")}</h2>
            {list.length > 0 ? (
              <ol className="mt-4 border-t border-border">
                {list.map((f, i) => (
                  <li key={i} className="flex gap-4 border-b border-border py-4 text-[17px] text-foreground">
                    <span className="font-mono text-sm text-brand pt-1" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
                    {f}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-4 text-muted-foreground">{t("service_no_features")}</p>
            )}
          </section>
        </div>
      </article>
      <HomeCta locale={locale} t={home} />
    </>
  );
}
