"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface BlogPostType {
  id: number;
  slug: string;
  title: Record<string, string>;
  content: Record<string, string>;
  image: string | null;
  is_published: boolean;
  created_at: string;
}

export default function BlogPostDetail() {
  const t = useTranslations("Navigation");
  const params = useParams();
  const locale = params.locale as 'en' | 'ar';
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  const isRtl = locale === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/blog/${slug}`)
      .then(res => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-mtozero-cyan/30 border-t-mtozero-cyan rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">{isRtl ? 'المقال غير موجود' : 'Post Not Found'}</h1>
        <Link href={`/${locale}/blog`} className="text-mtozero-cyan hover:underline flex items-center gap-2">
          <BackIcon className="w-4 h-4" />
          {isRtl ? 'العودة للمقالات' : 'Back to Blog'}
        </Link>
      </div>
    );
  }

  const title = post.title[locale] || post.title[locale === 'ar' ? 'en' : 'ar'] || (isRtl ? 'مقال بدون عنوان' : 'Untitled Post');
  const content = post.content[locale] || post.content[locale === 'ar' ? 'en' : 'ar'] || (isRtl ? 'لا يوجد محتوى متاح.' : 'No content available.');

  return (
    <article className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative">
      
      {/* Back Navigation */}
      <motion.div 
        initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <Link 
          href={`/${locale}/blog`} 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group px-4 py-2 rounded-full hover:bg-muted"
        >
          <BackIcon className={`w-5 h-5 transition-transform ${isRtl ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
          <span className="font-medium">{t("blog") || (isRtl ? "المقالات" : "Blog")}</span>
        </Link>
      </motion.div>

      {/* Article Header */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 bg-muted/30 p-4 rounded-2xl border border-border/50">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-mtozero-cyan" />
            {new Date(post.created_at).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric'})}
          </span>
          <span className="flex items-center gap-2">
            <User className="w-4 h-4 text-mtozero-purple" />
            MTOZERO Team
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-mtozero-cyan" />
            {Math.ceil(content.length / 500)} min read
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black mb-8 leading-tight tracking-tight">
          {title}
        </h1>

        <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-muted border border-border shadow-2xl mb-12">
          <Image 
            src={post.image ? (post.image.startsWith('http') ? post.image : `http://127.0.0.1:8000/storage/${post.image}`) : '/logo.jpeg'} 
            alt={title} 
            fill 
            className="object-cover" 
            unoptimized
            priority
          />
        </div>
      </header>

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-mtozero-cyan hover:prose-a:underline prose-img:rounded-3xl prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50">
        <div className="whitespace-pre-line leading-relaxed text-foreground/90 text-lg sm:text-xl font-light">
          {content}
        </div>
      </div>

      {/* Footer / Share */}
      <footer className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-mtozero-cyan to-mtozero-purple p-[2px]">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
               <Image src="/logo.jpeg" alt="Author" width={48} height={48} className="object-cover" />
            </div>
          </div>
          <div>
            <p className="font-bold">MTOZERO Engineering</p>
            <p className="text-xs text-muted-foreground">Smart Digital Solutions Team</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted hover:bg-muted/80 transition-colors text-sm font-medium">
            <Share2 className="w-4 h-4" />
            {isRtl ? 'مشاركة' : 'Share'}
          </button>
        </div>
      </footer>

    </article>
  );
}
