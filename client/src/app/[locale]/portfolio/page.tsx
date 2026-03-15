"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ExternalLink, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PortfolioSkeleton } from "@/components/skeletons";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage';

interface PortfolioType {
  id: number;
  title: Record<string, string>;
  description: Record<string, string>;
  image: string | string[];
  url?: string;
}

export default function PortfolioPage({ params: { locale } }: { params: { locale: 'en' | 'ar' } }) {
  const t = useTranslations("Navigation");
  const [projects, setProjects] = useState<PortfolioType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isRtl = locale === 'ar';

  useEffect(() => {
    fetch(`${API_URL}/portfolio`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data)) {
          setProjects(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch portfolio:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-[85vh] py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-mtozero-cyan/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-mtozero-purple/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          {t("portfolio")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
          {locale === 'en' 
            ? "A showcase of our digital craftsmanship and engineering capabilities." 
            : "معرض لحرفيتنا الرقمية وقدراتنا الهندسية."}
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
        {loading ? (
          [...Array(4)].map((_, i) => <PortfolioSkeleton key={i} />)
        ) : error ? (
          <div className="col-span-full py-20 text-center">
             <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
             <p className="text-xl font-medium">{isRtl ? 'عذراً، فشل تحميل معرض الأعمال' : 'Sorry, failed to load portfolio'}</p>
          </div>
        ) : projects.map((project, index) => (
          <motion.div
             key={project.id}
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: index * 0.15 }}
          >
           <Link
             href={`/${locale}/portfolio/${project.id}`}
             className="group block rounded-3xl overflow-hidden bg-card border border-border hover:border-mtozero-cyan/50 transition-all duration-500 shadow-lg hover:shadow-2xl h-full"
           >
             <div className="relative w-full h-64 overflow-hidden bg-muted group">
               {/* Full Cover Image */}
               <Image 
                 src={Array.isArray(project.image) && project.image.length > 0 
                         ? (project.image[0].startsWith('http') ? project.image[0] : `${STORAGE_URL}/${project.image[0]}`)
                         : (typeof project.image === 'string' && project.image.startsWith('http') ? project.image : `${STORAGE_URL}/${project.image}`) || '/logo.jpeg'} 
                 alt={project.title[locale]} 
                 fill 
                 className="object-cover group-hover:scale-105 transition-transform duration-700" 
                 unoptimized
                 priority={index < 2}
               />
               
               {/* Overlay for abstract tech feel */}
               <div className="absolute inset-0 bg-gradient-to-br from-mtozero-cyan/10 to-mtozero-purple/10 opacity-60 group-hover:opacity-20 transition-opacity duration-700 mix-blend-overlay" />
               <div className="absolute inset-0 bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               
               <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg">
                 <ExternalLink className="w-4 h-4 text-foreground text-mtozero-cyan" />
               </div>
             </div>
             
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-mtozero-cyan transition-colors">
                  {project.title[locale] || project.title[locale === 'ar' ? 'en' : 'ar'] || (locale === 'ar' ? 'مشروع بدون عنوان' : 'Untitled Project')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description[locale] || project.description[locale === 'ar' ? 'en' : 'ar'] || (locale === 'ar' ? 'لا يوجد وصف متاح.' : 'No description available.')}
                </p>
              </div>
           </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
