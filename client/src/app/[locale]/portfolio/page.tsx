import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { PortfolioList } from "@/components/portfolio-list";
import { PageHeader, pageWrap } from "@/components/page-header";
import { getPortfolio } from "@/lib/content";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Pages" });
  return {
    title: locale === "ar" ? "معرض الأعمال" : "Portfolio",
    description: t("portfolio_title") + " " + t("portfolio_lede"),
    alternates: { canonical: `/${locale}/portfolio` },
  };
}

export default async function PortfolioPage({ params: { locale } }: { params: { locale: "en" | "ar" } }) {
  const [nav, t, projects] = await Promise.all([
    getTranslations({ locale, namespace: "Navigation" }),
    getTranslations({ locale, namespace: "Pages" }),
    getPortfolio(),
  ]);

  return (
    <>
      <PageHeader eyebrow={nav("portfolio")} title={t("portfolio_title")} lede={t("portfolio_lede")} />
      <section className={`${pageWrap} pb-20`}>
        {projects.length > 0 ? (
          <PortfolioList projects={projects} locale={locale} />
        ) : (
          <p className="border-t border-foreground py-10 text-muted-foreground">{t("portfolio_empty")}</p>
        )}
      </section>
    </>
  );
}
