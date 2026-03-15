"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface PortfolioProjectData {
  id: number;
  title: Record<string, string>;
  description: Record<string, string>;
  image: string | string[];
  url?: string;
  is_published: boolean;
  created_at: string;
}

export default function PortfolioDetailPage() {
  const t = useTranslations("Navigation");
  const params = useParams();
  const locale = params.locale as 'en' | 'ar';
  const id = params.id as string;
  
  const [project, setProject] = useState<PortfolioProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const isRtl = locale === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/portfolio/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Project not found");
        return res.json();
      })
      .then(data => {
        setProject(data);
        // Handle parsing legacy string images vs the new array format
        if (data.image) {
          if (Array.isArray(data.image) && data.image.length > 0) {
            setActiveImage(`http://127.0.0.1:8000/storage/${data.image[0]}`);
          } else if (typeof data.image === 'string') {
            setActiveImage(data.image.startsWith('http') ? data.image : `http://127.0.0.1:8000/storage/${data.image}`);
          }
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-mtozero-cyan/30 border-t-mtozero-cyan rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">{locale === 'en' ? 'Project Not Found' : 'المشروع غير موجود'}</h1>
        <Link href={`/${locale}/portfolio`} className="text-mtozero-cyan hover:underline flex items-center gap-2">
          <BackIcon className="w-4 h-4" />
          {locale === 'en' ? 'Back to Portfolio' : 'العودة لمعرض الأعمال'}
        </Link>
      </div>
    );
  }

  // Parse Images Safely
  const images: string[] = Array.isArray(project.image) 
    ? project.image.map((img: string) => img.startsWith('http') ? img : `http://127.0.0.1:8000/storage/${img}`)
    : (project.image ? [project.image.startsWith('http') ? project.image : `http://127.0.0.1:8000/storage/${project.image}`] : ['/logo.jpeg']);

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
          <span className="font-medium">{t("portfolio")}</span>
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
            {activeImage ? (
              <Image 
                src={activeImage} 
                alt={project.title[locale]} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized // Required for external domains if not explicitly configured
              />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
                </div>
            )}
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
            {project.title[locale] || project.title[locale === 'ar' ? 'en' : 'ar'] || (locale === 'ar' ? 'مشروع بدون عنوان' : 'Untitled Project')}
          </h1>

          <div className="w-20 h-1 bg-gradient-to-r from-mtozero-cyan to-mtozero-purple rounded-full mb-8" />

          <p className="text-lg text-muted-foreground leading-relaxed mb-10 whitespace-pre-line">
            {project.description[locale] || project.description[locale === 'ar' ? 'en' : 'ar'] || (locale === 'ar' ? 'لا يوجد وصف متاح لهذا المشروع حالياً.' : 'No description available for this project at the moment.')}
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
              {locale === 'en' ? 'Visit Live Project' : 'زيارة المشروع المباشر'}
            </motion.a>
          )}

        </motion.div>
      </div>
    </div>
  );
}
