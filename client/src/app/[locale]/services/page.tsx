import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { ServicesList } from "@/components/services-list";
import { PageHeader, pageWrap } from "@/components/page-header";
import { HomeCta, HomeProcess } from "@/components/home/home-sections";
import { getServices } from "@/lib/content";

const STACK = ["Next.js", "React", "Laravel", "Flutter", "Node.js", "PostgreSQL", "MySQL", "Firebase", "Tailwind CSS"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Pages" });
  return {
    title: locale === "ar" ? "الخدمات" : "Services",
    description: t("services_lede"),
    alternates: { canonical: `/${locale}/services` },
  };
}

export default async function ServicesPage({ params: { locale } }: { params: { locale: "en" | "ar" } }) {
  const [nav, t, home, services] = await Promise.all([
    getTranslations({ locale, namespace: "Navigation" }),
    getTranslations({ locale, namespace: "Pages" }),
    getTranslations({ locale, namespace: "Home" }),
    getServices(),
  ]);

  return (
    <>
      <PageHeader eyebrow={nav("services")} title={t("services_title")} lede={t("services_lede")} />
      <section className={`${pageWrap} pb-6`}>
        <ServicesList services={services} locale={locale} translations={{ learnMore: t("services_more") }} />
      </section>
      <HomeProcess t={home} n="02" />
      <section className={`${pageWrap} pb-16`}>
        <div className="grid grid-cols-1 gap-4 border-t border-border pt-5 lg:grid-cols-12 lg:gap-12">
          <h2 className="text-sm font-medium text-foreground lg:col-span-4">{t("services_stack")}</h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-muted-foreground lg:col-span-8" dir="ltr">
            {STACK.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </section>
      <HomeCta locale={locale} t={home} />
    </>
  );
}
