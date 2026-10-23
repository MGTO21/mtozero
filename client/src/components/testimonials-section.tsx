"use client";

import { Star, Quote } from "lucide-react";

interface TestimonialType {
  id: number;
  name: string;
  company: string | null;
  role: Record<string, string> | null;
  content: Record<string, string>;
  rating: number;
}

function TestimonialCard({ item, locale }: { item: TestimonialType; locale: "en" | "ar" }) {
  return (
    <div className="w-[320px] sm:w-[380px] flex-shrink-0 p-8 rounded-[1.75rem] bg-card/40 border border-border/60 backdrop-blur-sm flex flex-col">
      <Quote className="w-8 h-8 text-mtozero-cyan/40 mb-4" />
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < item.rating ? "fill-mtozero-cyan text-mtozero-cyan" : "text-muted-foreground/30"}`}
          />
        ))}
      </div>
      <p className="text-muted-foreground font-light leading-relaxed flex-1">
        {item.content[locale] ?? item.content.en}
      </p>
      <div className="mt-6 pt-6 border-t border-border/40">
        <p className="font-bold">{item.name}</p>
        {(item.role || item.company) && (
          <p className="text-sm text-muted-foreground">
            {[item.role?.[locale] ?? item.role?.en, item.company].filter(Boolean).join(" — ")}
          </p>
        )}
      </div>
    </div>
  );
}

export function TestimonialsSection({ testimonials, locale }: { testimonials: TestimonialType[]; locale: "en" | "ar" }) {
  const isRtl = locale === "ar";
  if (testimonials.length === 0) return null;

  // Duplicated so the CSS animation can loop seamlessly from -50% back to 0.
  const track = [...testimonials, ...testimonials];

  return (
    <section className="relative z-10 py-24 overflow-hidden">
      <div className="text-center mb-16 px-4">
        <span className="text-xs font-black uppercase tracking-[0.4em] text-mtozero-cyan">
          {isRtl ? "آراء العملاء" : "Testimonials"}
        </span>
        <h2 className="text-3xl md:text-5xl font-black mt-4 tracking-tight">
          {isRtl ? "ماذا يقول عملاؤنا" : "What Our Clients Say"}
        </h2>
      </div>

      <div
        className="group relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        <div
          className={`flex gap-6 w-max ${isRtl ? "animate-marquee-reverse" : "animate-marquee"} group-hover:[animation-play-state:paused]`}
        >
          {track.map((item, i) => (
            <TestimonialCard key={`${item.id}-${i}`} item={item} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
