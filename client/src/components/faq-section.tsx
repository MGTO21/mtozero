"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface FaqType {
  id: number;
  question: Record<string, string>;
  answer: Record<string, string>;
}

export function FaqSection({ faqs, locale }: { faqs: FaqType[]; locale: "en" | "ar" }) {
  const isRtl = locale === "ar";
  const [openId, setOpenId] = useState<number | null>(faqs[0]?.id ?? null);

  if (faqs.length === 0) return null;

  return (
    <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs font-black uppercase tracking-[0.4em] text-mtozero-cyan">
          {isRtl ? "أسئلة شائعة" : "FAQ"}
        </span>
        <h2 className="text-3xl md:text-5xl font-black mt-4 tracking-tight">
          {isRtl ? "أسئلة قد تدور في ذهنك" : "Questions You Might Have"}
        </h2>
      </div>

      <div className="divide-y divide-border/50 border-y border-border/50">
        {faqs.map((faq, index) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="relative">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full flex items-start gap-6 py-8 text-start group"
                aria-expanded={isOpen}
              >
                <span
                  className={`text-4xl md:text-5xl font-black tabular-nums flex-shrink-0 transition-colors duration-300 ${
                    isOpen ? "text-mtozero-cyan" : "text-foreground/[0.08] group-hover:text-mtozero-cyan/20"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 pt-1 md:pt-2 font-bold text-lg md:text-xl">
                  {faq.question[locale] ?? faq.question.en}
                </span>
                <span className="flex-shrink-0 mt-1 md:mt-2 w-8 h-8 rounded-full border border-border/60 flex items-center justify-center">
                  <Plus
                    className={`w-4 h-4 text-mtozero-cyan transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="ps-[3.25rem] md:ps-[4rem] pb-8 text-muted-foreground font-light leading-relaxed max-w-2xl">
                      {faq.answer[locale] ?? faq.answer.en}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
