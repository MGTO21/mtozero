"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PortfolioProjectData {
  id: number;
  title: Record<string, string>;
  description: Record<string, string>;
  image: string | string[];
  url?: string;
  is_published: boolean;
  created_at: string;
}

export function PortfolioDetailContent({ 
  project, 
  locale,
  storageUrl,
  translations
}: { 
  project: PortfolioProjectData; 
  locale: 'en' | 'ar';
  storageUrl: string;
  translations: {
    backToPortfolio: string;
    visitLive: string;
    noDescription: string;
    untitled: string;
  }
}) {
  const isRtl = locale === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  // Parse Images Safely
  const images: string[] = Array.isArray(project.image) 
    ? project.image.map((img: string) => img.startsWith('http') ? img : `${storageUrl}/${img}`)
    : (project.image ? [project.image.startsWith('http') ? project.image : `${storageUrl}/${project.image}`] : ['/logo.jpeg']);

  const [activeImage, setActiveImage] = useState<string>(images[0]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-mtozero-cyan/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      
      {/* Back Navigation */}
      <motion.div 
        initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <Link 
          href={`/${locale}/portfolio`} 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group px-4 py-2 rounded-full hover:bg-muted"
        >
          <BackIcon className={`w-5 h-5 transition-transform ${isRtl ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
          <span className="font-medium">{translations.backToPortfolio}</span>
        </Link>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6"
        >
          {/* Main Active Image Showcase */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-muted border border-border shadow-2xl group">
            <Image 
              src={activeImage} 
              alt={project.title[locale] || translations.untitled} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Thumbnails Grid (Only show if multiple images exist) */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === img ? 'border-mtozero-cyan scale-105 shadow-lg' : 'border-transparent hover:border-mtozero-cyan/50 opacity-60 hover:opacity-100'}`}
                >
                  <Image src={img} alt={`Thumbnail ${idx+1}`} fill className="object-cover" unoptimized />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right Column: Project Details */}
        <motion.div 
          initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mtozero-cyan/10 text-mtozero-cyan border border-mtozero-cyan/20 w-fit mb-6 text-sm font-semibold">
             <Calendar className="w-4 h-4" />
             {new Date(project.created_at).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric'})}
          </div>

          <h1 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
            {project.title[locale] || project.title[locale === 'ar' ? 'en' : 'ar'] || translations.untitled}
          </h1>

          <div className="w-20 h-1 bg-gradient-to-r from-mtozero-cyan to-mtozero-purple rounded-full mb-8" />

          <p className="text-lg text-muted-foreground leading-relaxed mb-10 whitespace-pre-line">
            {project.description[locale] || project.description[locale === 'ar' ? 'en' : 'ar'] || translations.noDescription}
          </p>

          {project.url && project.url !== '#' && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl bg-foreground text-background font-bold text-lg hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 group"
            >
              <ExternalLink className="w-5 h-5 group-hover:text-mtozero-cyan transition-colors" />
              {translations.visitLive}
            </motion.a>
          )}

        </motion.div>
      </div>
    </div>
  );
}
