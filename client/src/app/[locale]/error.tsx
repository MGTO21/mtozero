"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const locale = useLocale();
  const t = useTranslations("Pages");

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 py-20 md:px-8 md:py-28">
      <h1 className="max-w-2xl font-display text-[2.1rem] font-extrabold leading-[1.25] text-foreground sm:text-5xl">{t("error_title")}</h1>
      <p className="mt-5 max-w-xl text-lg font-light text-muted-foreground">{t("error_sub")}</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={reset}
          className="rounded bg-foreground px-5 py-3 text-[15px] font-semibold text-background transition-colors duration-150 hover:bg-brand"
        >
          {t("error_retry")}
        </button>
        <Link href={`/${locale}`} className="text-[15px] font-semibold text-foreground underline decoration-border decoration-2 underline-offset-[6px] hover:decoration-brand">
          {t("notfound_home")}
        </Link>
      </div>
    </section>
  );
}
