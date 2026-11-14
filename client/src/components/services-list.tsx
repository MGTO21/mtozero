import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ServiceType {
  id: number | string;
  title: Record<string, string>;
  description: Record<string, string>;
}

export function ServicesList({
  services,
  locale,
  translations,
}: {
  services: ServiceType[];
  locale: "en" | "ar";
  translations: { learnMore: string };
}) {
  const Forward = locale === "ar" ? ArrowLeft : ArrowRight;
  const other = locale === "ar" ? "en" : "ar";

  return (
    <ol className="border-t border-foreground text-start">
      {services.map((service, i) => (
        <li key={service.id}>
          <Link
            href={`/${locale}/services/${service.id}`}
            className="group grid grid-cols-1 gap-3 border-b border-border py-8 transition-colors duration-150 hover:bg-card lg:grid-cols-12 lg:gap-12"
          >
            <span className="font-mono text-sm text-muted-foreground lg:col-span-1" dir="ltr">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-brand lg:col-span-4">
              {service.title[locale] || service.title[other]}
            </h3>
            <p className="text-[17px] font-light leading-relaxed text-muted-foreground lg:col-span-5">
              {service.description[locale] || service.description[other]}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand lg:col-span-2 lg:justify-end">
              {translations.learnMore}
              <Forward className="h-4 w-4" />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
