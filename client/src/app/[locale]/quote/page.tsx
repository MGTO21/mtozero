import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { QuoteRequestForm } from "@/components/quote-request-form";
import { PageHeader, pageWrap } from "@/components/page-header";
import { whatsappLink } from "@/lib/whatsapp";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Pages" });
  return {
    title: locale === "ar" ? "اطلب عرض سعر" : "Request a quote",
    description: t("quote_lede"),
    alternates: { canonical: `/${locale}/quote` },
  };
}

export default async function QuotePage({ params: { locale } }: { params: { locale: "en" | "ar" } }) {
  const [t, home] = await Promise.all([
    getTranslations({ locale, namespace: "Pages" }),
    getTranslations({ locale, namespace: "Home" }),
  ]);
  const wa = whatsappLink(home("wa_general"));

  return (
    <>
      <PageHeader eyebrow={t("contact_quote_link")} title={t("quote_title")} lede={t("quote_lede")} />
      <section className={`${pageWrap} pb-20`}>
        <div className="grid grid-cols-1 gap-8 border-t border-foreground pt-10 lg:grid-cols-12 lg:gap-12">
          <aside className="lg:col-span-4">
            {wa && (
              <p className="text-[15px] text-muted-foreground">
                {t("quote_or_wa")}{" "}
                <a href={wa} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand hover:underline underline-offset-4">
                  {t("quote_wa_link")}
                </a>
              </p>
            )}
          </aside>
          <div className="lg:col-span-8">
            <QuoteRequestForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
