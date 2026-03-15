"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MoveRight, MoveLeft, Sparkles, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CardSkeleton } from "@/components/skeletons";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

interface ServiceType {
  id: number;
  icon: string;
  title: Record<string, string>;
  description: Record<string, string>;
  features?: Record<string, string[]>;
}

export default function ServicesPage({ params: { locale } }: { params: { locale: 'en' | 'ar' } }) {
  const t = useTranslations("Navigation");

  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data)) {
          setServices(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch services:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? MoveLeft : MoveRight;

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Abstract Background Accents */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-mtozero-cyan/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-mtozero-purple/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          {t("services")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
          {locale === 'en' 
            ? "Engineered for speed, designed for impact. Discover our core technical offerings." 
            : "مصممة للسرعة، ومهندسة للتأثير. اكتشف عروضنا التقنية الأساسية."}
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {loading ? (
          [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
        ) : error ? (
          <div className="col-span-full py-20 text-center">
             <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
             <p className="text-xl font-medium">{isRtl ? 'عذراً، فشل تحميل الخدمات' : 'Sorry, failed to load services'}</p>
          </div>
        ) : services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-mtozero-cyan/50 transition-all duration-500 overflow-hidden"
          >
            {/* Glowing Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-mtozero-cyan/0 via-mtozero-purple/0 to-mtozero-cyan/0 group-hover:from-mtozero-cyan/10 group-hover:via-background group-hover:to-mtozero-purple/10 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
            
            {/* Floating Border Highlight */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-mtozero-cyan to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-background border border-border group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <Sparkles className="w-6 h-6 text-mtozero-cyan" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-mtozero-cyan group-hover:to-mtozero-purple transition-all duration-300">
                {service.title[locale]}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-8">
                {service.description[locale]}
              </p>

              <Link 
                href={`/${locale}/services/${service.id}`}
                className="flex items-center gap-2 text-sm font-semibold hover:text-mtozero-cyan transition-colors mt-auto group/btn"
              >
                {locale === 'en' ? "Learn More" : "اكتشف المزيد"}
                <ArrowIcon className={`w-4 h-4 transition-transform duration-300 ${isRtl ? 'group-hover/btn:-translate-x-2' : 'group-hover/btn:translate-x-2'}`} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
