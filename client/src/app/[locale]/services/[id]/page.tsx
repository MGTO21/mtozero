"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface ServiceType {
  id: number;
  icon: string;
  title: Record<string, string>;
  description: Record<string, string>;
  content: Record<string, string>;
  features: Record<string, { item: string }[] | null>;
}

export default function ServiceDetail() {
  const t = useTranslations("Navigation");
  const params = useParams();
  const locale = params.locale as 'en' | 'ar';
  const id = params.id as string;
  
  const [service, setService] = useState<ServiceType | null>(null);
  const [loading, setLoading] = useState(true);

  const isRtl = locale === 'ar';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/services/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Service not found");
        return res.json();
      })
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-4 border-mtozero-cyan/30 border-t-mtozero-cyan rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-background">
        <h1 className="text-4xl font-bold mb-4">{isRtl ? 'الخدمة غير موجودة' : 'Service Not Found'}</h1>
        <Link href={`/${locale}/services`} className="text-mtozero-cyan hover:underline flex items-center gap-2">
          <BackIcon className="w-4 h-4" />
          {isRtl ? 'العودة للخدمات' : 'Back to Services'}
        </Link>
      </div>
    );
  }

  const title = service.title[locale] || service.title[locale === 'ar' ? 'en' : 'ar'] || (isRtl ? 'خدمة بدون عنوان' : 'Untitled Service');
  const description = service.description[locale] || service.description[locale === 'ar' ? 'en' : 'ar'];
  const content = service.content?.[locale] || service.content?.[locale === 'ar' ? 'en' : 'ar'] || '';
  const rawFeatures = service.features?.[locale] || service.features?.[locale === 'ar' ? 'en' : 'ar'] || [];
  const features = Array.isArray(rawFeatures) ? rawFeatures : [];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-mtozero-cyan/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-mtozero-purple/5 rounded-full blur-[150px] pointer-events-none" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link 
            href={`/${locale}/services`} 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-mtozero-cyan transition-colors group"
          >
            <BackIcon className={`w-5 h-5 transition-transform ${isRtl ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
            <span className="font-medium">{t("services") || (isRtl ? "الخدمات" : "Services")}</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Info */}
          <div className="lg:col-span-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight text-foreground">
                {title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light mb-12 max-w-4xl leading-relaxed">
                {description}
              </p>
            </motion.div>

            {/* Content & Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
              
              {/* Detailed Content */}
              <motion.div 
                initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-10 h-1 h-px bg-mtozero-cyan" />
                   <h2 className="text-2xl font-bold uppercase tracking-wider">{isRtl ? 'نظرة عامة' : 'Overview'}</h2>
                </div>
                <div 
                  className="prose prose-lg dark:prose-invert max-w-none text-foreground/80 leading-relaxed font-light"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </motion.div>

              {/* Key Features List */}
              <motion.div
                initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card/30 rounded-3xl p-8 border border-border/50 backdrop-blur-sm self-start"
              >
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-mtozero-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)]" />
                  {isRtl ? 'المميزات الرئيسية' : 'Key Features'}
                </h2>
                <div className="space-y-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-mtozero-cyan/20 transition-all">
                      <CheckCircle2 className="w-6 h-6 text-mtozero-cyan flex-shrink-0 mt-0.5" />
                      <span className="text-lg font-medium">{feature.item}</span>
                    </div>
                  ))}
                  {features.length === 0 && (
                     <p className="text-muted-foreground italic">{isRtl ? 'لا توجد مميزات مسجلة حالياً.' : 'No features recorded yet.'}</p>
                  )}
                </div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-20 p-12 rounded-[2.5rem] bg-gradient-to-br from-mtozero-cyan/10 via-background to-mtozero-purple/10 border border-mtozero-cyan/20 text-center relative overflow-hidden"
        >
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-mtozero-cyan/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              {isRtl ? 'هل أنت جاهز لبدء مشروعك؟' : 'Ready to start your project?'}
            </h3>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
              {isRtl 
                ? 'تواصل معنا اليوم لمناقشة كيف يمكننا تحويل رؤيتك الرقمية إلى واقع ملموس.' 
                : 'Contact us today to discuss how we can transform your digital vision into reality.'}
            </p>
            <Link 
              href={`/${locale}`}
              className="inline-flex items-center gap-3 px-10 py-5 bg-mtozero-cyan text-black font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-mtozero-cyan/40"
            >
              {isRtl ? 'تواصل معنا' : 'Contact Us'}
              <NextIcon className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

      </main>
    </div>
  );
}
