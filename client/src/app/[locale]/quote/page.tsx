import { Metadata } from "next";
import { QuoteRequestForm } from "@/components/quote-request-form";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === "ar" ? "اطلب عرض سعر" : "Request a Quote",
    description:
      locale === "ar"
        ? "أخبرنا عن مشروعك واحصل على عرض سعر مخصص من فريق MTOZERO خلال 24 ساعة."
        : "Tell us about your project and get a tailored quote from the MTOZERO team within 24 hours.",
    alternates: {
      canonical: `/${locale}/quote`,
    },
  };
}

export default function QuotePage({ params: { locale } }: { params: { locale: "en" | "ar" } }) {
  const isRtl = locale === "ar";

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto relative overflow-hidden">
      <div className="absolute top-32 left-0 w-96 h-96 bg-mtozero-cyan/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-mtozero-purple/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            {isRtl ? "اطلب عرض سعر" : "Request a Quote"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            {isRtl
              ? "أخبرنا عن مشروعك بالتفصيل وسنعود إليك بعرض سعر مخصص خلال 24 ساعة."
              : "Tell us about your project in detail and we'll get back to you with a tailored quote within 24 hours."}
          </p>
        </div>

        <QuoteRequestForm locale={locale} />
      </div>
    </div>
  );
}
