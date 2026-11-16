import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";

type Tr = Record<string, string | undefined> | null | undefined;
type T = (key: string) => string;

const wrap = "mx-auto w-full max-w-[1280px] px-4 md:px-8";

function pick(value: Tr, locale: string) {
  if (!value) return "";
  return value[locale] || value[locale === "ar" ? "en" : "ar"] || "";
}

function SectionHead({ n, index, title }: { n: string; index: string; title: string }) {
  return (
    <header className="grid grid-cols-1 gap-3 border-t border-foreground pt-5 lg:grid-cols-12 lg:gap-12">
      <p className="flex items-baseline gap-3 text-sm font-medium text-foreground lg:col-span-4">
        <span className="font-mono text-xs text-muted-foreground" dir="ltr">{n}</span>
        {index}
      </p>
      <h2 className="font-display text-2xl font-bold leading-snug text-foreground md:text-[2rem] lg:col-span-8">
        {title}
      </h2>
    </header>
  );
}

function Fig({ n, caption }: { n: string; caption: string }) {
  return (
    <figcaption className="mt-3 flex gap-3 text-sm leading-relaxed text-muted-foreground">
      <span className="fig-label shrink-0 pt-[3px]" dir="ltr">FIG. {n}</span>
      <span>{caption}</span>
    </figcaption>
  );
}

const WORK = [
  { id: 7, img: "ecommerce", w: 1600, h: 776, key: "work_ecommerce", span: "lg:col-span-7", tall: false },
  { id: 8, img: "edumanager", w: 1600, h: 776, key: "work_edumanager", span: "lg:col-span-5", tall: false },
  { id: 5, img: "statcenter", w: 1600, h: 776, key: "work_statcenter", span: "lg:col-span-5", tall: false },
  { id: 6, img: "barista", w: 1600, h: 776, key: "work_barista", span: "lg:col-span-7", tall: false },
];

export function HomeWork({ locale, t }: { locale: string; t: T }) {
  const Forward = locale === "ar" ? ArrowLeft : ArrowRight;
  return (
    <section className={`${wrap} py-14 lg:py-16`}>
      <SectionHead n="02" index={t("work_index")} title={t("work_title")} />
      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-14 lg:grid-cols-12">
        {WORK.map((w, i) => (
          <figure key={w.id} className={w.span}>
            <Link
              href={`/${locale}/portfolio/${w.id}`}
              className={`group block overflow-hidden border border-border bg-card ${w.tall ? "aspect-[4/5] lg:aspect-auto lg:h-full lg:max-h-[30rem]" : ""}`}
            >
              <Image
                src={`/work/${w.img}.webp`}
                alt={t(w.key)}
                width={w.w}
                height={w.h}
                sizes={w.span.includes("8") || w.span.includes("7") ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
                className={`w-full transition-transform duration-200 group-hover:scale-[1.01] ${w.tall ? "h-full object-cover object-top" : "h-auto"}`}
              />
            </Link>
            <Fig n={String(i + 2).padStart(2, "0")} caption={t(w.key)} />
          </figure>
        ))}
      </div>
      <Link
        href={`/${locale}/portfolio`}
        className="mt-12 inline-flex items-center gap-2 text-[15px] font-semibold text-brand underline-offset-[6px] hover:underline"
      >
        {t("work_all")}
        <Forward className="h-4 w-4" />
      </Link>
    </section>
  );
}

export function HomeProducts({ locale, t }: { locale: string; t: T }) {
  const External = locale === "ar" ? ArrowUpLeft : ArrowUpRight;
  const products = [
    { name: t("proclinic_name"), desc: t("proclinic_desc"), demo: t("proclinic_demo"), url: "https://proclinic.mtozero.com", wa: t("proclinic_wa") },
    { name: t("store_name"), desc: t("store_desc"), demo: t("store_demo"), url: "https://store.mtozero.com", wa: t("store_wa") },
  ];
  return (
    <section className={`${wrap} py-14 lg:py-16`}>
      <SectionHead n="03" index={t("products_index")} title={t("products_title")} />
      <div className="mt-10">
        {products.map((p) => {
          const wa = whatsappLink(p.wa);
          return (
            <article key={p.name} className="grid grid-cols-1 gap-4 border-b border-border py-8 lg:grid-cols-12 lg:gap-12">
              <h3 className="font-display text-xl font-bold text-foreground lg:col-span-4">{p.name}</h3>
              <p className="text-[17px] font-light leading-relaxed text-muted-foreground lg:col-span-5">{p.desc}</p>
              <div className="flex flex-wrap items-start gap-x-5 gap-y-2 text-[15px] font-semibold lg:col-span-3 lg:flex-col">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-brand hover:underline underline-offset-[6px]">
                  {p.demo}
                  <External className="h-4 w-4" />
                </a>
                {wa && (
                  <a href={wa} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-brand transition-colors duration-150">
                    {t("ask_price")}
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

type Service = { id: string; title: Tr; description: Tr };

export function HomeServices({ locale, t, services }: { locale: string; t: T; services: Service[] }) {
  if (!services.length) return null;
  return (
    <section className={`${wrap} py-14 lg:py-16`}>
      <SectionHead n="04" index={t("services_index")} title={t("services_title")} />
      <ol className="mt-10">
        {services.map((s, i) => (
          <li key={s.id}>
            <Link
              href={`/${locale}/services/${s.id}`}
              className="group grid grid-cols-1 gap-3 border-b border-border py-7 transition-colors duration-150 hover:bg-card lg:grid-cols-12 lg:gap-12"
            >
              <span className="font-mono text-sm text-muted-foreground lg:col-span-1" dir="ltr">0{i + 1}</span>
              <h3 className="font-display text-xl font-bold text-foreground group-hover:text-brand lg:col-span-3">{pick(s.title, locale)}</h3>
              <p className="text-[17px] font-light leading-relaxed text-muted-foreground lg:col-span-8">{pick(s.description, locale)}</p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function HomeProcess({ t, n = "05" }: { t: T; n?: string }) {
  const steps = [1, 2, 3, 4];
  return (
    <section className={`${wrap} py-14 lg:py-16`}>
      <SectionHead n={n} index={t("process_index")} title={t("process_title")} />
      <ol className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((n) => (
          <li key={n} className="border-t border-border pt-5">
            <span className="font-mono text-sm text-brand" dir="ltr">0{n}</span>
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">{t(`process_${n}_title`)}</h3>
            <p className="mt-2 text-[15px] font-light leading-relaxed text-muted-foreground">{t(`process_${n}_desc`)}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

type Testimonial = { id: string; name: string; company?: string | null; role: Tr; content: Tr };

export function HomeTestimonial({ locale, t, testimonials }: { locale: string; t: T; testimonials: Testimonial[] }) {
  const first = testimonials[0];
  if (!first) return null;
  const role = pick(first.role, locale);
  return (
    <section className={`${wrap} py-14 lg:py-16`}>
      <div className="grid grid-cols-1 gap-6 border-t border-foreground pt-5 lg:grid-cols-12 lg:gap-12">
        <p className="flex items-baseline gap-3 text-sm font-medium text-foreground lg:col-span-4">
          <span className="font-mono text-xs text-muted-foreground" dir="ltr">06</span>
          {t("testimonial_index")}
        </p>
        <figure className="lg:col-span-8">
          <blockquote className="font-display text-2xl font-medium leading-[1.6] text-foreground md:text-[1.9rem]">
            {locale === "ar" ? "«" : "“"}
            {pick(first.content, locale).trim()}
            {locale === "ar" ? "»" : "”"}
          </blockquote>
          <figcaption className="mt-6 text-[15px] text-muted-foreground">
            <span className="font-semibold text-foreground">{first.name.trim()}</span>
            {role && <> — {role}</>}
            {first.company && <>{locale === "ar" ? "، " : ", "}{first.company}</>}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function HomeFounder({ t }: { t: T }) {
  return (
    <section className={`${wrap} py-14 lg:py-16`}>
      <div className="grid grid-cols-1 gap-8 border-t border-foreground pt-5 lg:grid-cols-12 lg:gap-12">
        <p className="flex items-baseline gap-3 text-sm font-medium text-foreground lg:col-span-4">
          <span className="font-mono text-xs text-muted-foreground" dir="ltr">07</span>
          {t("founder_index")}
        </p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[minmax(0,15rem)_1fr] lg:col-span-8">
          <figure className="border border-border bg-card">
            <Image src="/team/mohammed.webp" alt={t("founder_photo_alt")} width={674} height={780} sizes="(min-width: 640px) 15rem, 100vw" className="h-auto w-full" />
          </figure>
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">{t("founder_name")}</h3>
            <p className="mt-1 text-[15px] text-muted-foreground">{t("founder_role")}</p>
            <p className="mt-6 text-[17px] font-light leading-relaxed text-foreground/85">{t("founder_bio_1")}</p>
            <p className="mt-4 text-[17px] font-light leading-relaxed text-foreground/85">{t("founder_bio_2")}</p>
            <a
              href="https://github.com/MGTO21"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block font-mono text-sm text-brand hover:underline underline-offset-4"
              dir="ltr"
            >
              github.com/MGTO21
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeCta({ locale, t }: { locale: string; t: T }) {
  const Forward = locale === "ar" ? ArrowLeft : ArrowRight;
  const wa = whatsappLink(t("wa_general"));
  return (
    <section className="bg-night text-night-foreground">
      <div className={`${wrap} grid grid-cols-1 gap-10 py-20 lg:grid-cols-12 lg:gap-12 lg:py-28`}>
        <h2 className="font-display text-3xl font-extrabold leading-tight md:text-5xl lg:col-span-7">{t("cta_title")}</h2>
        <div className="lg:col-span-5">
          <p className="text-lg font-light leading-relaxed text-night-foreground/75">{t("cta_sub")}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded bg-night-foreground px-5 py-3 text-[15px] font-semibold text-night transition-colors duration-150 hover:bg-brand hover:text-night-foreground"
              >
                {t("cta_whatsapp")}
                <Forward className="h-4 w-4" />
              </a>
            )}
            <Link
              href={`/${locale}/quote`}
              className="text-[15px] font-semibold underline decoration-night-foreground/30 decoration-2 underline-offset-[6px] hover:decoration-night-foreground"
            >
              {t("cta_quote")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
