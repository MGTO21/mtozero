"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PortfolioType {
  id: number;
  title: Record<string, string>;
  description: Record<string, string>;
  image: string | string[];
  url?: string;
}

export function PortfolioList({ 
  projects, 
  locale,
  storageUrl
}: { 
  projects: PortfolioType[]; 
  locale: 'en' | 'ar';
  storageUrl: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
      {projects.map((project, index) => (
        <motion.div
           key={project.id}
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, delay: index * 0.1 }}
        >
         <Link
           href={`/${locale}/portfolio/${project.id}`}
           className="group block rounded-3xl overflow-hidden bg-card border border-border hover:border-mtozero-cyan/50 transition-all duration-500 shadow-lg hover:shadow-2xl h-full"
         >
            <div className="relative w-full h-64 overflow-hidden bg-muted group flex items-center justify-center">
              {/* Blurred Backdrop */}
              <Image 
                src={Array.isArray(project.image) && project.image.length > 0 
                        ? (project.image[0].startsWith('http') ? project.image[0] : `${storageUrl}/${project.image[0]}`)
                        : (typeof project.image === 'string' && project.image.startsWith('http') ? project.image : `${storageUrl}/${project.image}`) || '/logo.jpeg'} 
                alt=""
                fill 
                className="object-cover blur-2xl opacity-40 scale-110" 
                unoptimized
              />

              {/* Main Image (Contain) */}
              <div className="relative w-full h-full p-4">
                <Image 
                  src={Array.isArray(project.image) && project.image.length > 0 
                          ? (project.image[0].startsWith('http') ? project.image[0] : `${storageUrl}/${project.image[0]}`)
                          : (typeof project.image === 'string' && project.image.startsWith('http') ? project.image : `${storageUrl}/${project.image}`) || '/logo.jpeg'} 
                  alt={project.title[locale]} 
                  fill 
                  className="object-contain group-hover:scale-[1.02] transition-transform duration-700" 
                  unoptimized
                  priority={index < 2}
                />
              </div>
             
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
              <p className="text-muted-foreground leading-relaxed line-clamp-2">
                {project.description[locale] || project.description[locale === 'ar' ? 'en' : 'ar'] || (locale === 'ar' ? 'لا يوجد وصف متاح.' : 'No description available.')}
              </p>
            </div>
         </Link>
        </motion.div>
      ))}
    </div>
  );
}
