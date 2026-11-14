import Link from "next/link";
import { Screenshot } from "@/components/screenshot";
import { excerpt, pick, projectImages, splitTitle, type Tr } from "@/lib/format";

interface PortfolioType {
  id: number | string;
  title: Tr;
  description: Tr;
  image: unknown;
}

export function PortfolioList({ projects, locale }: { projects: PortfolioType[]; locale: "en" | "ar" }) {
  const [first, ...rest] = projects;

  const meta = (p: PortfolioType) => {
    const { name, tagline } = splitTitle(pick(p.title, locale));
    return { name, tagline, desc: excerpt(pick(p.description, locale), 160), cover: projectImages(p.image)[0] };
  };

  const f = meta(first);

  return (
    <div className="border-t border-foreground">
      <Link href={`/${locale}/portfolio/${first.id}`} className="group grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 lg:gap-12">
        <div className="border border-border bg-card lg:col-span-8">
          {f.cover && <Screenshot src={f.cover} alt={f.name} sizes="(min-width: 1024px) 62vw, 100vw" priority />}
        </div>
        <div className="lg:col-span-4 lg:pt-2">
          <span className="fig-label" dir="ltr">FIG. 01</span>
          <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-foreground group-hover:text-brand md:text-3xl">{f.name}</h2>
          {f.tagline && <p className="mt-2 text-[17px] text-foreground/80">{f.tagline}</p>}
          {f.desc && <p className="mt-4 text-[15px] font-light leading-relaxed text-muted-foreground">{f.desc}</p>}
        </div>
      </Link>

      <div className="grid grid-cols-1 gap-x-8 gap-y-14 border-t border-border pt-10 md:grid-cols-2">
        {rest.map((p, i) => {
          const m = meta(p);
          return (
            <Link key={p.id} href={`/${locale}/portfolio/${p.id}`} className="group block">
              <div className="border border-border bg-card">
                {m.cover && <Screenshot src={m.cover} alt={m.name} sizes="(min-width: 768px) 46vw, 100vw" />}
              </div>
              <div className="mt-4 flex gap-3">
                <span className="fig-label shrink-0 pt-1.5" dir="ltr">FIG. {String(i + 2).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-lg font-bold leading-snug text-foreground group-hover:text-brand">{m.name}</h3>
                  {m.tagline && <p className="mt-1 text-[15px] text-muted-foreground">{m.tagline}</p>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
