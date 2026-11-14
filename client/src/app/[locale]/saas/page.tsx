import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { SaasList } from "@/components/saas-list";
import { PageHeader, pageWrap } from "@/components/page-header";
import { getSaasProducts } from "@/lib/content";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Pages" });
  return {
    title: locale === "ar" ? "منتجاتنا" : "Products",
    description: t("saas_lede"),
    alternates: { canonical: `/${locale}/saas` },
  };
}

export default async function SaasIndexPage({ params: { locale } }: { params: { locale: "en" | "ar" } }) {
  const [nav, t, products] = await Promise.all([
    getTranslations({ locale, namespace: "Navigation" }),
    getTranslations({ locale, namespace: "Pages" }),
    getSaasProducts(),
  ]);

  return (
    <>
      <PageHeader eyebrow={nav("saas")} title={t("saas_title")} lede={t("saas_lede")} />
      <section className={`${pageWrap} pb-20`}>
        {products.length > 0 ? (
          <SaasList
            products={products}
            locale={locale}
            labels={{
              demo: t("saas_demo"),
              ask: t("saas_ask"),
              details: t("saas_details"),
              wa: (name) => t("saas_wa", { name }),
            }}
          />
        ) : (
          <p className="border-t border-foreground py-10 text-muted-foreground">{t("saas_empty")}</p>
        )}
      </section>
    </>
  );
}
