import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ShareButton } from "@/components/blog-detail-content";
import { pageWrap } from "@/components/page-header";
import { resolveSrc } from "@/components/screenshot";
import { getBlogPost } from "@/lib/content";
import { excerpt, formatDate, pick } from "@/lib/format";

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(slug);
  if (!post) return {};
  const title = pick(post.title, locale);
  const description = excerpt(pick(post.content, locale), 160);
  return {
    title,
    description,
    openGraph: { title, description, type: "article", images: post.image ? [resolveSrc(post.image)] : ["/og-image.png"] },
    alternates: { canonical: `/${locale}/blog/${slug}` },
  };
}

export default async function BlogPostDetailPage({ params: { locale, slug } }: { params: { locale: "en" | "ar"; slug: string } }) {
  const [post, t] = await Promise.all([getBlogPost(slug), getTranslations({ locale, namespace: "Pages" })]);
  if (!post) notFound();

  const title = pick(post.title, locale);
  const content = pick(post.content, locale);
  const minutes = Math.max(1, Math.round(content.split(/\s+/).length / 200));
  const Back = locale === "ar" ? ArrowRight : ArrowLeft;

  return (
    <article className={`${pageWrap} pb-20 pt-10`}>
      <Link href={`/${locale}/blog`} className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">
        <Back className="h-4 w-4" />
        {t("blog_back")}
      </Link>

      <header className="mx-auto mt-10 max-w-3xl">
        <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <time>{formatDate(post.created_at, locale)}</time>
          <span>
            <span dir="ltr">{minutes}</span> {t("blog_minutes")}
          </span>
          <span>{t("blog_author")}</span>
        </p>
        <h1 className="mt-4 font-display text-[2rem] font-extrabold leading-[1.3] text-foreground sm:text-[2.75rem]">{title}</h1>
      </header>

      {post.image && (
        <figure className="mx-auto mt-10 max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden border border-border bg-muted">
            <Image src={resolveSrc(post.image)} alt={title} fill priority sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
          </div>
        </figure>
      )}

      <div className="rich mx-auto mt-12 max-w-3xl whitespace-pre-line text-[18px] font-light text-foreground/90">{content}</div>

      <footer className="mx-auto mt-16 flex max-w-3xl items-center justify-between gap-4 border-t border-border pt-6">
        <Link href={`/${locale}/blog`} className="text-[15px] font-semibold text-brand hover:underline underline-offset-[6px]">
          {t("blog_back")}
        </Link>
        <ShareButton title={title} label={t("blog_share")} copiedLabel={t("blog_copied")} />
      </footer>
    </article>
  );
}
