"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, ArrowLeft } from "lucide-react";
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
    <div className="space-y-12 relative z-10">
      {/* Featured First Post */}
      {posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Link 
            href={`/${locale}/blog/${posts[0].slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-mtozero-cyan/30 transition-all duration-500 shadow-2xl"
          >
            <div className="relative aspect-video lg:aspect-auto w-full overflow-hidden bg-muted">
              <Image 
                src={posts[0].image ? (posts[0].image.startsWith('http') ? posts[0].image : `${storageUrl}/${posts[0].image}`) : '/logo.jpeg'} 
                alt={posts[0].title[locale] || posts[0].title[locale === 'ar' ? 'en' : 'ar'] || translations.untitled} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
            </div>
            
            <div className="p-8 lg:p-14 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-xs text-mtozero-cyan font-bold mb-6">
                <span className="px-3 py-1 rounded-full bg-mtozero-cyan/10 border border-mtozero-cyan/20">Featured</span>
                <span className="flex items-center gap-1 text-muted-foreground font-medium">
                  <Calendar className="w-3 h-3" />
                  {new Date(posts[0].created_at).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}
                </span>
              </div>
              
              <h2 className="text-3xl lg:text-5xl font-black mb-6 group-hover:text-mtozero-cyan transition-colors leading-tight">
                {posts[0].title[locale] || posts[0].title[locale === 'ar' ? 'en' : 'ar'] || translations.untitled}
              </h2>
              
              <p className="text-muted-foreground text-lg line-clamp-3 mb-10 font-light">
                {posts[0].content[locale] || posts[0].content[locale === 'ar' ? 'en' : 'ar'] || translations.noContent}
              </p>
              
              <div className="flex items-center gap-3 text-mtozero-cyan font-black uppercase tracking-widest text-sm group-hover:gap-5 transition-all">
                {translations.readMore}
                {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Subsequent Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.slice(1).map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link 
              href={`/${locale}/blog/${post.slug}`}
              className="group flex flex-col h-full rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-mtozero-purple/30 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                <Image 
                  src={post.image ? (post.image.startsWith('http') ? post.image : `${storageUrl}/${post.image}`) : '/logo.jpeg'} 
                  alt={post.title[locale] || post.title[locale === 'ar' ? 'en' : 'ar'] || translations.untitled} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground mb-4 uppercase tracking-widest font-bold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.created_at).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US')}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-mtozero-purple transition-colors line-clamp-2">
                  {post.title[locale] || post.title[locale === 'ar' ? 'en' : 'ar'] || translations.untitled}
                </h3>
                
                <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1 font-light">
                  {post.content[locale] || post.content[locale === 'ar' ? 'en' : 'ar'] || translations.noContent}
                </p>
                
                <div className="flex items-center gap-2 text-mtozero-purple text-xs font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                  {translations.readMore}
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
