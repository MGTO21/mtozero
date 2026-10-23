"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <span className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-mtozero-cyan to-mtozero-purple mb-6">
        404
      </span>
      <h1 className="text-3xl md:text-4xl font-black mb-4">
        {isRtl ? "الصفحة غير موجودة" : "Page not found"}
      </h1>
      <p className="text-muted-foreground mb-10 max-w-md">
        {isRtl
          ? "الرابط الذي تبحث عنه غير موجود أو تم نقله. تصفح أقسام الموقع من الرئيسية."
          : "The page you're looking for doesn't exist or has been moved. Browse from the homepage."}
      </p>
      <Link
        href={`/${locale}`}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-mtozero-cyan text-black font-bold hover:scale-105 active:scale-95 transition-transform"
      >
        <BackIcon className="w-4 h-4" />
        {isRtl ? "العودة للرئيسية" : "Back to home"}
      </Link>
    </div>
  );
}
