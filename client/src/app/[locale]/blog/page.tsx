import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { BlogList } from "@/components/blog-list";
import { PageHeader, pageWrap } from "@/components/page-header";
import { getBlogPosts } from "@/lib/content";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Pages" });
  return {
    title: locale === "ar" ? "المقالات" : "Blog",
    description: t("blog_lede"),
    alternates: { canonical: `/${locale}/blog` },
  };
}

export default async function BlogPage({ params: { locale } }: { params: { locale: "en" | "ar" } }) {
  const [nav, t, posts] = await Promise.all([
    getTranslations({ locale, namespace: "Navigation" }),
    getTranslations({ locale, namespace: "Pages" }),
    getBlogPosts(),
  ]);

  return (
    <>
      <PageHeader eyebrow={nav("blog")} title={t("blog_title")} lede={t("blog_lede")} />
      <section className={`${pageWrap} pb-20`}>
        {posts.length > 0 ? (
          <BlogList posts={posts} locale={locale} readLabel={t("blog_read")} />
        ) : (
          <p className="border-t border-foreground py-10 text-muted-foreground">{t("blog_empty")}</p>
        )}
      </section>
    </>
  );
}
