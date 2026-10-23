"use client";

import { useRef, useState } from "react";
import { motion, animate } from "framer-motion";

interface StatType {
  id: number;
  label: Record<string, string>;
  value: string;
  suffix: string | null;
}

function parseNumeric(value: string) {
  const numeric = parseFloat(value);
  return Number.isNaN(numeric) ? null : numeric;
}

export function StatsSection({ stats, locale }: { stats: StatType[]; locale: "en" | "ar" }) {
  if (stats.length === 0) return null;

  return (
    <section className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50 rtl:divide-x-reverse">
        {stats.map((stat, index) => {
          const numeric = parseNumeric(stat.value);
          const decimals = numeric !== null && stat.value.includes(".") ? stat.value.split(".")[1].length : 0;

          return <StatItem key={stat.id} stat={stat} index={index} numeric={numeric} decimals={decimals} locale={locale} />;
        })}
      </div>
    </section>
  );
}

function StatItem({
  stat,
  index,
  numeric,
  decimals,
  locale,
}: {
  stat: StatType;
  index: number;
  numeric: number | null;
  decimals: number;
  locale: "en" | "ar";
}) {
  const [display, setDisplay] = useState(numeric === null ? stat.value : "0");
  const started = useRef(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => {
        if (started.current || numeric === null) return;
        started.current = true;
        animate(0, numeric, {
          duration: 1.6,
          ease: "easeOut",
          onUpdate: (latest) => setDisplay(latest.toFixed(decimals)),
        });
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center px-6 py-4"
    >
      <p className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-br from-mtozero-cyan to-mtozero-purple bg-clip-text text-transparent tabular-nums">
        {display}
        {stat.suffix}
      </p>
      <p className="mt-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">
        {stat.label[locale] ?? stat.label.en}
      </p>
    </motion.div>
  );
}
