import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { PageHeader, pageWrap } from "@/components/page-header";
import { whatsappLink } from "@/lib/whatsapp";

const EMAIL = "mtozero.tech@gmail.com";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Pages" });
  return {
    title: locale === "ar" ? "تواصل معنا" : "Contact",
    description: t("contact_lede"),
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({ params: { locale } }: { params: { locale: "en" | "ar" } }) {
  const [nav, t, footer] = await Promise.all([
    getTranslations({ locale, namespace: "Navigation" }),
    getTranslations({ locale, namespace: "Pages" }),
    getTranslations({ locale, namespace: "Footer" }),
  ]);
  const wa = whatsappLink(t("contact_wa_msg"));
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(t("contact_email_subject"))}`;

  const channels = [
    wa && { title: t("contact_wa_title"), value: t("contact_wa_value"), cta: t("contact_wa_cta"), href: wa, external: true, primary: true },
    { title: t("contact_email_title"), value: EMAIL, cta: t("contact_email_cta"), href: mailto, external: false, primary: false, ltr: true },
  ].filter(Boolean) as { title: string; value: string; cta: string; href: string; external: boolean; primary: boolean; ltr?: boolean }[];

  return (
    <>
      <PageHeader eyebrow={nav("contact")} title={t("contact_title")} lede={t("contact_lede")} />

      <section className={`${pageWrap} pb-6`}>
        <div className="grid grid-cols-1 border-t border-foreground md:grid-cols-2">
          {channels.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="group border-b border-border py-8 transition-colors duration-150 hover:bg-card md:px-6 md:first:ps-0 md:[&:not(:first-child)]:border-s"
            >
              <h2 className="text-sm font-medium text-muted-foreground">{c.title}</h2>
              <p className="mt-2 font-display text-2xl font-bold text-foreground">
                {c.ltr ? <span dir="ltr">{c.value}</span> : c.value}
              </p>
              <span className={`mt-5 inline-block text-[15px] font-semibold ${c.primary ? "text-brand" : "text-foreground"} group-hover:underline underline-offset-[6px]`}>
                {c.cta}
              </span>
            </a>
          ))}
        </div>
        <dl className="grid grid-cols-2 border-b border-border">
          <div className="py-5">
            <dt className="text-xs text-muted-foreground">{t("contact_location_title")}</dt>
            <dd className="mt-1 text-[15px] font-medium text-foreground">{footer("location")}</dd>
          </div>
          <div className="py-5">
            <dt className="text-xs text-muted-foreground">{t("contact_reply_title")}</dt>
            <dd className="mt-1 text-[15px] font-medium text-foreground">{t("contact_reply_value")}</dd>
          </div>
        </dl>
      </section>

      <section className={`${pageWrap} py-14 lg:py-16`}>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h2 className="font-display text-2xl font-bold text-foreground">{t("contact_form_title")}</h2>
            <p className="mt-4 text-[15px] text-muted-foreground">
              {t("contact_quote_hint")}{" "}
              <Link href={`/${locale}/quote`} className="font-semibold text-brand hover:underline underline-offset-4">
                {t("contact_quote_link")}
              </Link>
            </p>
          </div>
          <div className="lg:col-span-8">
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>
    </>
  );
}
