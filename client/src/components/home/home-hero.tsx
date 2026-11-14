"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  locale: string;
  title: string;
  sub: string;
  ctaWhatsapp: string;
  ctaWork: string;
  whatsappHref: string | null;
  figCaption: string;
  facts: { label: string; value: string }[];
};

export function HomeHero({ locale, title, sub, ctaWhatsapp, ctaWork, whatsappHref, figCaption, facts }: Props) {
  const reduce = useReducedMotion();
  const Forward = locale === "ar" ? ArrowLeft : ArrowRight;

  // The single orchestrated motion on the site: hero pieces settle in once, in order.
  const item = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.08 * i, ease: [0.2, 0.7, 0.2, 1] },
        };

  return (
    <section className="mx-auto w-full max-w-[1280px] px-4 md:px-8 pt-14 md:pt-20 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
        <div className="lg:col-span-5">
          <motion.h1
            {...item(0)}
            className="font-display text-[2.35rem] sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.25] text-foreground"
          >
            {title}
          </motion.h1>
          <motion.p {...item(1)} className="mt-6 max-w-[34rem] text-lg font-light leading-relaxed text-muted-foreground">
            {sub}
          </motion.p>
          <motion.div {...item(2)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded bg-foreground px-5 py-3 text-[15px] font-semibold text-background transition-colors duration-150 hover:bg-brand"
              >
                {ctaWhatsapp}
                <Forward className="h-4 w-4" />
              </a>
            )}
            <Link
              href={`/${locale}/portfolio`}
              className="text-[15px] font-semibold text-foreground underline decoration-border decoration-2 underline-offset-[6px] transition-colors duration-150 hover:decoration-brand"
            >
              {ctaWork}
            </Link>
          </motion.div>
        </div>

        <motion.figure {...item(3)} className="lg:col-span-7">
          <Link href={`/${locale}/portfolio/8`} className="block border border-border bg-card">
            <Image
              src="/work/edumanager.webp"
              alt={figCaption}
              width={1600}
              height={776}
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="h-auto w-full"
            />
          </Link>
          <figcaption className="mt-3 flex gap-3 text-sm text-muted-foreground">
            <span className="fig-label pt-[3px]" dir="ltr">FIG. 01</span>
            <span>{figCaption}</span>
          </figcaption>
        </motion.figure>
      </div>

      <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 border-t border-border">
        {facts.map((f) => (
          <div key={f.label} className="border-b border-border py-4 pe-4 md:border-b-0">
            <dt className="text-xs text-muted-foreground">{f.label}</dt>
            <dd className="mt-1 text-[15px] font-medium text-foreground">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
