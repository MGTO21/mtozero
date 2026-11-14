import Link from "next/link";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { pick, type Tr } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";

export interface SaasProduct {
  id: string | number;
  slug: string;
  name: Tr;
  description: Tr;
  url?: string | null;
}

export function SaasList({
  products,
  locale,
  labels,
}: {
  products: SaasProduct[];
  locale: "en" | "ar";
  labels: { demo: string; ask: string; details: string; wa: (name: string) => string };
}) {
  const External = locale === "ar" ? ArrowUpLeft : ArrowUpRight;
  return (
    <div className="border-t border-foreground">
      {products.map((p, i) => {
        const name = pick(p.name, locale);
        const wa = whatsappLink(labels.wa(name));
        return (
          <article key={p.id} className="grid grid-cols-1 gap-4 border-b border-border py-10 lg:grid-cols-12 lg:gap-12">
            <span className="font-mono text-sm text-muted-foreground lg:col-span-1" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                <Link href={`/${locale}/saas/${p.slug}`} className="hover:text-brand transition-colors duration-150">{name}</Link>
              </h2>
              <p className="mt-3 text-[17px] font-light leading-relaxed text-muted-foreground">{pick(p.description, locale)}</p>
            </div>
            <div className="flex flex-wrap items-start gap-x-5 gap-y-2 text-[15px] font-semibold lg:col-span-4 lg:flex-col lg:items-end">
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-brand underline-offset-[6px] hover:underline">
                  {labels.demo}
                  <External className="h-4 w-4" />
                </a>
              )}
              <Link href={`/${locale}/saas/${p.slug}`} className="text-foreground hover:text-brand transition-colors duration-150">{labels.details}</Link>
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-brand transition-colors duration-150">{labels.ask}</a>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
