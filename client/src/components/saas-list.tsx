"use client";

import { motion } from "framer-motion";
import { MoveRight, MoveLeft, Database } from "lucide-react";
import Link from "next/link";

interface SaasProductType {
  id: number;
  slug: string;
  name: Record<string, string>;
  description: Record<string, string>;
  pricing: Record<string, string> | null;
}

export function SaasList({ 
  products, 
  locale,
  translations 
}: { 
  products: SaasProductType[]; 
  locale: 'en' | 'ar';
  translations: {
    customPricing: string;
  }
}) {
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? MoveLeft : MoveRight;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
      {products.map((product, index) => (
        <Link href={`/${locale}/saas/${product.slug}`} key={product.id}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
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
                {product.name[locale] || product.name[locale === 'ar' ? 'en' : 'ar']}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed text-lg mb-8 line-clamp-3">
                {product.description[locale] || product.description[locale === 'ar' ? 'en' : 'ar']}
              </p>
            </div>

            {/* Card Footer */}
            <div className="relative z-10 pt-6 border-t border-border/50 flex items-center justify-between mt-auto">
              <span className="font-semibold text-mtozero-cyan font-mono">
                {product.pricing?.[locale] || product.pricing?.['en'] || translations.customPricing}
              </span>
              
              <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-300 shadow-xl">
                <ArrowIcon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
