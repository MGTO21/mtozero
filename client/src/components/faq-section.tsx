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
    <section className="mx-auto w-full max-w-[1280px] px-4 py-14 md:px-8 lg:py-16">
      <header className="grid grid-cols-1 gap-3 border-t border-foreground pt-5 lg:grid-cols-12 lg:gap-12">
        <p className="text-sm font-medium text-foreground lg:col-span-4">{isRtl ? "أسئلة شائعة" : "FAQ"}</p>
        <h2 className="font-display text-2xl font-bold leading-snug text-foreground md:text-[2rem] lg:col-span-8">
          {isRtl ? "أسئلة يطرحها العملاء قبل البدء" : "Questions clients ask before we start"}
        </h2>
      </header>

      <div className="mt-8 divide-y divide-border border-y border-border lg:ms-[33.333%]">
        {faqs.map((faq, index) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} className="relative">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="group flex w-full items-start gap-5 py-6 text-start"
                aria-expanded={isOpen}
              >
                <span
                  className={`shrink-0 pt-1 font-mono text-sm ${isOpen ? "text-brand" : "text-muted-foreground"}`} dir="ltr"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-lg font-bold text-foreground group-hover:text-brand">
                  {faq.question[locale] ?? faq.question.en}
                </span>
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded border border-border">
                  <Plus
                    className={`w-4 h-4 text-foreground transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
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
                    <p className="max-w-2xl pb-6 ps-10 text-[16px] font-light leading-relaxed text-muted-foreground">
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
