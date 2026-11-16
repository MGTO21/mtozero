import { getTranslations } from "next-intl/server";
import { FaqSection } from "@/components/faq-section";
import { HomeHero } from "@/components/home/home-hero";
import {
  HomeCta,
  HomeFounder,
  HomeProcess,
  HomeProducts,
  HomeServices,
  HomeTestimonial,
  HomeWork,
} from "@/components/home/home-sections";
import { getFaqs, getServices, getTestimonials } from "@/lib/content";
import { whatsappLink } from "@/lib/whatsapp";

export default async function Home({ params: { locale } }: { params: { locale: "en" | "ar" } }) {
  const [t, services, testimonials, faqs] = await Promise.all([
    getTranslations({ locale, namespace: "Home" }),
    getServices(),
    getTestimonials(),
    getFaqs(),
  ]);

  return (
    <>
      <HomeHero
        locale={locale}
        title={t("hero_title")}
        sub={t("hero_sub")}
        ctaWhatsapp={t("cta_whatsapp")}
        ctaWork={t("cta_work")}
        whatsappHref={whatsappLink(t("wa_general"))}
        figCaption={t("hero_fig")}
        facts={[
          { label: t("facts_base_label"), value: t("facts_base") },
          { label: t("facts_products_label"), value: t("facts_products") },
          { label: t("facts_stack_label"), value: t("facts_stack") },
          { label: t("facts_lang_label"), value: t("facts_lang") },
        ]}
      />
      <HomeWork locale={locale} t={t} />
      <HomeProducts locale={locale} t={t} />
      <HomeServices locale={locale} t={t} services={services} />
      <HomeProcess t={t} />
      <HomeTestimonial locale={locale} t={t} testimonials={testimonials} />
      <HomeFounder t={t} />
      {faqs.length > 0 && <FaqSection faqs={faqs} locale={locale} />}
      <HomeCta locale={locale} t={t} />
    </>
  );
}
