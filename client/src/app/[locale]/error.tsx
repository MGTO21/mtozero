"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { RefreshCcw, Home } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-mtozero-cyan to-mtozero-purple mb-6">
        {"{ ! }"}
      </span>
      <h1 className="text-3xl md:text-4xl font-black mb-4">
        {isRtl ? "حدث خطأ غير متوقع" : "Something went wrong"}
      </h1>
      <p className="text-muted-foreground mb-10 max-w-md">
        {isRtl
          ? "نعتذر عن هذا الخلل المؤقت. جرّب إعادة تحميل الصفحة، وإن استمرت المشكلة تواصل معنا."
          : "We apologize for this temporary glitch. Try reloading the page, and contact us if it persists."}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-mtozero-cyan text-black font-bold hover:scale-105 active:scale-95 transition-transform"
        >
          <RefreshCcw className="w-4 h-4" />
          {isRtl ? "إعادة المحاولة" : "Try again"}
        </button>
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border font-bold hover:bg-muted transition-colors"
        >
          <Home className="w-4 h-4" />
          {isRtl ? "الصفحة الرئيسية" : "Home"}
        </Link>
      </div>
    </div>
  );
}
