import { getTranslations } from "next-intl/server";
import { AlertCircle } from "lucide-react";
import { BlogList } from "@/components/blog-list";
import { Metadata } from "next";

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

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === 'ar' ? `مدونة mtozero | مقالات تقنية` : `mtozero Blog | Tech Insights`,
    description: locale === 'ar' 
      ? `اقرأ أحدث المقالات التقنية والأفكار حول البرمجة والذكاء الاصطناعي من فريق mtozero والمبرمج محمد معتصم.` 
      : `Read the latest tech articles and insights on programming and AI from mtozero team and Mohammed Moatasim.`,
    alternates: {
      canonical: `/${locale}/blog`,
    }
  };
}

async function getPosts() {
  try {
    const res = await fetch(`${API_URL}/blog`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPage({ params: { locale } }: { params: { locale: 'en' | 'ar' } }) {
  const navT = await getTranslations("Navigation");
  const posts = await getPosts();

  const isRtl = locale === 'ar';

  return (
    <div className="min-h-[85vh] py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-mtozero-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Page Header */}
      <div className="text-center mb-20 relative z-10">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          {navT("blog") || (isRtl ? "المقالات" : "Blog")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
          {isRtl 
            ? "أفكار mtozero - رؤى المبرمج محمد معتصم حول تقنيات المستقبل." 
            : "mtozero Insights - Mohammed Moatasim's vision on future technologies."}
        </p>
      </div>

      {posts.length > 0 ? (
        <BlogList 
          posts={posts} 
          locale={locale} 
          storageUrl={STORAGE_URL}
          translations={{
            readMore: isRtl ? 'اقرأ المزيد' : 'Read More',
            team: isRtl ? 'فريق mtozero' : 'mtozero Team',
            untitled: isRtl ? 'مقال بدون عنوان' : 'Untitled Post',
            noContent: isRtl ? 'لا يوجد محتوى متاح.' : 'No content available.'
          }}
        />
      ) : (
        <div className="col-span-full py-20 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-xl font-medium">{isRtl ? 'عذراً، لم نتمكن من العثور على أي مقالات حالياً' : 'Sorry, we couldn\'t find any blog posts right now'}</p>
        </div>
      )}
    </div>
  );
}
