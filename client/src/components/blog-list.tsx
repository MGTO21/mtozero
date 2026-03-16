"use client";

import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogPostType {
  id: number;
  slug: string;
  title: Record<string, string>;
  content: Record<string, string>;
  image: string | null;
  is_published: boolean;
  created_at: string;
}

export function BlogList({ 
  posts, 
  locale,
  storageUrl,
  translations
}: { 
  posts: BlogPostType[]; 
  locale: 'en' | 'ar';
  storageUrl: string;
  translations: {
    readMore: string;
    team: string;
    untitled: string;
    noContent: string;
  }
}) {
  const isRtl = locale === 'ar';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Link 
            href={`/${locale}/blog/${post.slug}`}
            className="group flex flex-col h-full rounded-2xl overflow-hidden bg-card border border-border hover:border-mtozero-cyan/50 transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
              <Image 
                src={post.image ? (post.image.startsWith('http') ? post.image : `${storageUrl}/${post.image}`) : '/logo.jpeg'} 
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
                  {translations.team}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-mtozero-cyan transition-colors line-clamp-2">
                {post.title[locale] || post.title[locale === 'ar' ? 'en' : 'ar'] || translations.untitled}
              </h3>
              
              <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                {post.content[locale] || post.content[locale === 'ar' ? 'en' : 'ar'] || translations.noContent}
              </p>
              
              <div className="flex items-center gap-2 text-mtozero-cyan text-sm font-bold group-hover:gap-3 transition-all">
                {translations.readMore}
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
