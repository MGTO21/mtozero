"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations("Pages");

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-20 md:px-8 md:py-28">
      <p className="font-mono text-sm text-brand" dir="ltr">404</p>
      <h1 className="mt-4 max-w-2xl font-display text-[2.1rem] font-extrabold leading-[1.25] text-foreground sm:text-5xl">{t("notfound_title")}</h1>
      <p className="mt-5 max-w-xl text-lg font-light text-muted-foreground">{t("notfound_sub")}</p>
      <Link href={`/${locale}`} className="mt-8 inline-flex rounded bg-foreground px-5 py-3 text-[15px] font-semibold text-background transition-colors duration-150 hover:bg-brand">
        {t("notfound_home")}
      </Link>
    </section>
  );
}
