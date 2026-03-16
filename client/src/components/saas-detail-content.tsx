"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface SaasProductType {
  id: number;
  slug: string;
  name: Record<string, string>;
  description: Record<string, string>;
  features?: Record<string, ({ item: string }[]) | string> | null;
  pricing: Record<string, string> | null;
  is_active: boolean;
}

export function SaasDetailContent({ 
  product, 
  locale,
  whatsappNumber,
  translations
}: { 
  product: SaasProductType; 
  locale: 'en' | 'ar';
  whatsappNumber: string;
  translations: {
    backToSaas: string;
    requestDemo: string;
    coreFeatures: string;
    customPricing: string;
  }
}) {
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const rawFeatures = product.features?.[locale] || product.features?.['en'];
  const features: { item: string }[] = Array.isArray(rawFeatures) 
    ? rawFeatures.map((f: string | { item: string }) => typeof f === 'string' ? { item: f } : f)
    : (typeof rawFeatures === 'string' 
        ? rawFeatures.split('\n').filter(Boolean).map((f: string) => ({ item: f.trim() })) 
        : []);

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center py-20 px-4 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-mtozero-cyan/20 to-mtozero-purple/20 blur-[100px]"
        />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <Link href={`/${locale}/saas`} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-12 transition-colors">
          <ArrowIcon className="w-4 h-4 rotate-180" />
          {translations.backToSaas}
        </Link>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.7 }}
           className="bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mtozero-cyan to-mtozero-purple" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
               <h1 className="text-4xl lg:text-5xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/70">
                 {product.name[locale] || product.name['en']}
               </h1>
               <p className="text-lg text-muted-foreground leading-relaxed font-light mb-8">
                 {product.description[locale] || product.description['en']}
               </p>
               
               <div className="flex items-center gap-4 mb-2">
                 <span className="text-mtozero-cyan font-bold text-2xl">
                   {product.pricing?.[locale] || product.pricing?.['en'] || translations.customPricing}
                 </span>
               </div>
               
               <Link 
                 href={`https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(
                   locale === 'en' 
                     ? `Hello, I'm interested in a demo for ${product.name[locale] || product.name['en']}`
                     : `مرحباً، أود الحصول على عرض تجريبي لمنتج ${product.name[locale] || product.name['en']}`
                 )}`}
                 target="_blank"
                 className="mt-8 w-full md:w-auto px-8 py-4 bg-foreground text-background font-semibold rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-3 group text-center"
               >
                 {translations.requestDemo}
                 <ArrowIcon className={`w-5 h-5 transition-transform ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
               </Link>
            </div>

            {features && features.length > 0 && (
              <div className="bg-background/50 border border-border/50 rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-6">
                   {translations.coreFeatures}
                </h3>
                <ul className="space-y-4">
                  {features.map((feature, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-6 h-6 text-mtozero-purple shrink-0" />
                      <span className="text-foreground/80 font-medium">{feature.item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
