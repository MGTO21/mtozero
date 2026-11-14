"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useSocialLinks } from "@/lib/social-links";

export function Footer({ locale }: { locale: string }) {
  const nav = useTranslations("Navigation");
  const t = useTranslations("Footer");
  const { links: socialLinks } = useSocialLinks();

  const pages = [
    { href: `/${locale}/services`, label: nav("services") },
    { href: `/${locale}/portfolio`, label: nav("portfolio") },
    { href: `/${locale}/saas`, label: nav("saas") },
    { href: `/${locale}/blog`, label: nav("blog") },
    { href: `/${locale}/contact`, label: nav("contact") },
  ];

  return (
    <footer className="w-full border-t border-border">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-2 gap-x-8 gap-y-10 px-4 py-14 md:px-8 lg:grid-cols-12">
        <div className="col-span-2 lg:col-span-5">
          <Link href={`/${locale}`} className="font-display text-lg font-bold tracking-tight text-foreground" dir="ltr">
            MTOZERO
          </Link>
          <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-muted-foreground">{t("about")}</p>
        </div>

        <div className="lg:col-span-2">
          <h4 className="text-xs text-muted-foreground">{t("pages")}</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="text-foreground hover:text-brand transition-colors duration-150">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="text-xs text-muted-foreground">{t("contact")}</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-foreground">
            <li>{t("location")}</li>
            <li>
              <a href="mailto:mtozero.tech@gmail.com" className="hover:text-brand transition-colors duration-150" dir="ltr">
                mtozero.tech@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {socialLinks.length > 0 && (
          <div className="lg:col-span-2">
            <h4 className="text-xs text-muted-foreground">{t("follow")}</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground capitalize hover:text-brand transition-colors duration-150"
                  >
                    {link.platform[locale] || link.platform["en"]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-border">
        <p className="mx-auto w-full max-w-[1280px] px-4 py-5 text-xs text-muted-foreground md:px-8">
          <span dir="ltr">© {new Date().getFullYear()} MTOZERO.</span> {t("rights")}
        </p>
      </div>
    </footer>
  );
}
