"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Share2 } from "lucide-react";
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

export function BlogDetailContent({ 
  post, 
  locale,
  storageUrl,
  translations
}: { 
  post: BlogPostType; 
  locale: 'en' | 'ar';
  storageUrl: string;
  translations: {
    backToBlog: string;
    share: string;
    readingTime: string;
    team: string;
    untitled: string;
    noContent: string;
  }
}) {
  const isRtl = locale === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  const [copied, setCopied] = useState(false);
  const title = post.title[locale] || post.title[locale === 'ar' ? 'en' : 'ar'] || translations.untitled;
  const content = post.content[locale] || post.content[locale === 'ar' ? 'en' : 'ar'] || translations.noContent;

  const handleShare = async () => {
    const shareData = {
      title: title,
      text: content.substring(0, 100) + '...',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <article className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative">
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
          <span className="font-medium">{translations.backToBlog}</span>
        </Link>
      </motion.div>

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8 bg-muted/30 p-4 rounded-2xl border border-border/50">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-mtozero-cyan" />
            {new Date(post.created_at).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric'})}
          </span>
          <span className="flex items-center gap-2">
            <User className="w-4 h-4 text-mtozero-purple" />
            {translations.team}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-mtozero-cyan" />
            {Math.ceil(content.length / 500)} {translations.readingTime}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black mb-8 leading-tight tracking-tight">
          {title}
        </h1>

        <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-muted border border-border shadow-2xl mb-12">
          <Image 
            src={post.image ? (post.image.startsWith('http') ? post.image : `${storageUrl}/${post.image}`) : '/logo.jpeg'} 
            alt={title} 
            fill 
            className="object-cover" 
            unoptimized
            priority
          />
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-mtozero-cyan hover:prose-a:underline prose-img:rounded-3xl prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border/50">
        <div className="whitespace-pre-line leading-relaxed text-foreground/90 text-lg sm:text-xl font-light">
          {content}
        </div>
      </div>

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
          <button 
            onClick={handleShare}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all text-sm font-medium ${copied ? 'bg-mtozero-cyan text-black' : 'bg-muted hover:bg-muted/80'}`}
          >
            <Share2 className="w-4 h-4" />
            {copied ? (isRtl ? 'تم النسخ!' : 'Copied!') : translations.share}
          </button>
        </div>
      </footer>
    </article>
  );
}
