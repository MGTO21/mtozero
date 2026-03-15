"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Calendar, User, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BlogSkeleton } from "@/components/skeletons";

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

export default function BlogPage({ params: { locale } }: { params: { locale: 'en' | 'ar' } }) {
  const t = useTranslations("Navigation");
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isRtl = locale === 'ar';

  useEffect(() => {
    fetch(`${API_URL}/blog`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data)) {
          setPosts(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch blog posts:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-[85vh] py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-mtozero-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          {t("blog") || (isRtl ? "المقالات" : "Blog")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
          {isRtl 
            ? "أحدث الأفكار والابتكارات في عالم التكنولوجيا والحلول الرقمية." 
            : "Latest insights and innovations in technology and digital solutions."}
        </p>
      </motion.div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {loading ? (
          [...Array(6)].map((_, i) => <BlogSkeleton key={i} />)
        ) : error ? (
          <div className="col-span-full py-20 text-center">
             <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
             <p className="text-xl font-medium">{isRtl ? 'عذراً، فشل تحميل المقالات' : 'Sorry, failed to load blog posts'}</p>
          </div>
        ) : posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link 
              href={`/${locale}/blog/${post.slug}`}
              className="group flex flex-col h-full rounded-2xl overflow-hidden bg-card border border-border hover:border-mtozero-cyan/50 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                <Image 
                  src={post.image ? (post.image.startsWith('http') ? post.image : `${STORAGE_URL}/${post.image}`) : '/logo.jpeg'} 
                  alt={post.title[locale] || post.title[locale === 'ar' ? 'en' : 'ar']} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.created_at).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    MTOZERO Team
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-mtozero-cyan transition-colors line-clamp-2">
                  {post.title[locale] || post.title[locale === 'ar' ? 'en' : 'ar'] || (isRtl ? 'مقال بدون عنوان' : 'Untitled Post')}
                </h3>
                
                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                  {post.content[locale] || post.content[locale === 'ar' ? 'en' : 'ar'] || (isRtl ? 'لا يوجد محتوى متاح.' : 'No content available.')}
                </p>
                
                <div className="flex items-center gap-2 text-mtozero-cyan text-sm font-bold group-hover:gap-3 transition-all">
                  {isRtl ? 'اقرأ المزيد' : 'Read More'}
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
