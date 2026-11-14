import Image from "next/image";
import Link from "next/link";
import { resolveSrc } from "@/components/screenshot";
import { excerpt, formatDate, pick, type Tr } from "@/lib/format";

export interface BlogPost {
  id: string | number;
  slug: string;
  title: Tr;
  content: Tr;
  image: string | null;
  created_at: string;
}

export function BlogList({ posts, locale, readLabel }: { posts: BlogPost[]; locale: "en" | "ar"; readLabel: string }) {
  const [first, ...rest] = posts;
  const firstTitle = pick(first.title, locale);

  return (
    <div className="border-t border-foreground">
      <Link href={`/${locale}/blog/${first.slug}`} className="group grid grid-cols-1 gap-6 py-10 lg:grid-cols-12 lg:gap-12">
        {first.image && (
          <div className="relative aspect-[16/9] overflow-hidden border border-border bg-muted lg:col-span-7">
            <Image src={resolveSrc(first.image)} alt={firstTitle} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
          </div>
        )}
        <div className={first.image ? "lg:col-span-5" : "lg:col-span-8"}>
          <time className="text-sm text-muted-foreground">{formatDate(first.created_at, locale)}</time>
          <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-foreground group-hover:text-brand md:text-[2rem]">{firstTitle}</h2>
          <p className="mt-4 text-[17px] font-light leading-relaxed text-muted-foreground">{excerpt(pick(first.content, locale), 220)}</p>
          <span className="mt-6 inline-block text-[15px] font-semibold text-brand">{readLabel}</span>
        </div>
      </Link>

      <ol className="border-t border-border">
        {rest.map((post) => {
          const title = pick(post.title, locale);
          return (
            <li key={post.id}>
              <Link href={`/${locale}/blog/${post.slug}`} className="group grid grid-cols-1 gap-3 border-b border-border py-7 transition-colors duration-150 hover:bg-card lg:grid-cols-12 lg:gap-12">
                <time className="text-sm text-muted-foreground lg:col-span-3 lg:pt-1">{formatDate(post.created_at, locale)}</time>
                <div className="lg:col-span-7">
                  <h3 className="font-display text-xl font-bold leading-snug text-foreground group-hover:text-brand">{title}</h3>
                  <p className="mt-2 text-[15px] font-light leading-relaxed text-muted-foreground">{excerpt(pick(post.content, locale), 150)}</p>
                </div>
                {post.image && (
                  <div className="relative hidden aspect-[16/9] overflow-hidden border border-border bg-muted lg:col-span-2 lg:block">
                    <Image src={resolveSrc(post.image)} alt="" fill sizes="12vw" className="object-cover" />
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
