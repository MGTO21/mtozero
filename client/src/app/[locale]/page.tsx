import { Hero } from "@/components/hero";
import { StatsSection } from "@/components/stats-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FaqSection } from "@/components/faq-section";
import { getFaqs, getStats, getTestimonials } from "@/lib/content";

export default async function Home({ params: { locale } }: { params: { locale: "en" | "ar" } }) {
  const [stats, testimonials, faqs] = await Promise.all([
    getStats(),
    getTestimonials(),
    getFaqs(),
  ]);

  return (
    <main className="w-full">
      <Hero />
      <StatsSection stats={stats} locale={locale} />
      <TestimonialsSection testimonials={testimonials} locale={locale} />
      <FaqSection faqs={faqs} locale={locale} />
    </main>
  );
}
