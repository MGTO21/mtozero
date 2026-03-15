"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MoveRight, MoveLeft, Database, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CardSkeleton } from "@/components/skeletons";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

interface SaasProductType {
  id: number;
  slug: string;
  name: Record<string, string>;
  description: Record<string, string>;
  pricing: Record<string, string> | null;
}

export default function SaasIndexPage({ params: { locale } }: { params: { locale: 'en' | 'ar' } }) {
  const t = useTranslations("Navigation");
  const [products, setProducts] = useState<SaasProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/saas-products`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch saas products:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? MoveLeft : MoveRight;

  return (
    <div className="min-h-[85vh] py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-20 right-20 w-[30rem] h-[30rem] bg-mtozero-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-[40rem] h-[40rem] bg-mtozero-purple/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative z-10"
      >
        <span className="inline-block py-1 px-3 mb-4 rounded-full bg-muted border border-border text-sm font-medium text-muted-foreground">
           {locale === 'en' ? "Ready-to-Deploy Platforms" : "منصات جاهزة للنشر"}
        </span>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          {t("saas")}
        </h1>
      </motion.div>

      {/* SaaS Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {loading ? (
          [...Array(4)].map((_, i) => <CardSkeleton key={i} />)
        ) : error ? (
          <div className="col-span-full py-20 text-center">
             <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
             <p className="text-xl font-medium">{isRtl ? 'عذراً، فشل تحميل المنتجات' : 'Sorry, failed to load products'}</p>
          </div>
        ) : products.map((product, index) => (
          <Link href={`/${locale}/saas/${product.slug}`} key={product.id}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group h-full p-8 md:p-10 rounded-3xl bg-card border border-border hover:border-mtozero-purple/40 transition-all duration-300 relative overflow-hidden flex flex-col"
            >
              {/* Card Hover Ambience */}
              <div className="absolute inset-0 bg-gradient-to-br from-mtozero-purple/0 to-mtozero-cyan/0 group-hover:from-mtozero-purple/5 group-hover:to-mtozero-cyan/5 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
              
              <div className="relative z-10 flex-1">
                <div className="mb-8 w-16 h-16 rounded-2xl bg-foreground/5 flex items-center justify-center group-hover:bg-mtozero-purple/10 transition-colors duration-300">
                  <Database className="w-8 h-8 text-foreground group-hover:text-mtozero-purple transition-colors duration-300" />
                </div>
                
                <h3 className="text-3xl font-bold mb-4 tracking-tight group-hover:text-mtozero-purple transition-colors duration-300">
                  {product.name[locale] || product.name['en']}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  {product.description[locale] || product.description['en']}
                </p>
              </div>

              {/* Card Footer */}
              <div className="relative z-10 pt-6 border-t border-border/50 flex items-center justify-between mt-auto">
                <span className="font-semibold text-mtozero-cyan font-mono">
                  {product.pricing?.[locale] || product.pricing?.['en'] || (isRtl ? 'تسعير مخصص' : 'Custom Pricing')}
                </span>
                
                <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-300 shadow-xl">
                  <ArrowIcon className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
