import { getTranslations } from "next-intl/server";
import { BlogDetailContent } from "@/components/blog-detail-content";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage';

interface BlogPostType {
  id: number;
  slug: string;
  title: Record<string, string>;
  content: Record<string, string>;
  image: string | null;
  is_published: boolean;
  created_at: string;
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const post = await getPost(slug);
  if (!post) return {};

  const title = post.title[locale] || post.title['en'];
  const content = post.content[locale] || post.content['en'];

  return {
    title: `${title} | mtozero Insights`,
    description: content.substring(0, 160),
    openGraph: {
      title: `${title} - Tech Insights by MTOZERO`,
      description: content.substring(0, 200),
      images: post.image ? [post.image.startsWith('http') ? post.image : `${STORAGE_URL}/${post.image}`] : ['/logo.jpeg'],
    }
  };
}

async function getPost(slug: string): Promise<BlogPostType | null> {
  try {
    const res = await fetch(`${API_URL}/blog/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export default async function BlogPostDetailPage({ params: { locale, slug } }: { params: { locale: 'en' | 'ar', slug: string } }) {
  const navT = await getTranslations("Navigation");
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogDetailContent 
      post={post} 
      locale={locale} 
      storageUrl={STORAGE_URL}
      translations={{
        backToBlog: navT("blog") || (locale === 'ar' ? "المقالات" : "Blog"),
        share: locale === 'ar' ? 'مشاركة' : 'Share',
        readingTime: locale === 'ar' ? 'دقائق قراءة' : 'min read',
        team: locale === 'ar' ? 'فريق mtozero' : 'mtozero Team',
        untitled: locale === 'ar' ? 'مقال بدون عنوان' : 'Untitled Post',
        noContent: locale === 'ar' ? 'لا يوجد محتوى متاح.' : 'No content available.'
      }}
    />
  );
}
