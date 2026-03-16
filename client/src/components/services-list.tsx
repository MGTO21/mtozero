"use client";

import { motion } from "framer-motion";
import { MoveRight, MoveLeft, Sparkles } from "lucide-react";
import Link from "next/link";

interface ServiceType {
  id: number;
  icon: string;
  title: Record<string, string>;
  description: Record<string, string>;
  features?: Record<string, string[]>;
}

export function ServicesList({ 
  services, 
  locale, 
  translations 
}: { 
  services: ServiceType[]; 
  locale: 'en' | 'ar';
  translations: {
    learnMore: string;
  }
}) {
  const isRtl = locale === 'ar';
  const ArrowIcon = isRtl ? MoveLeft : MoveRight;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
      {services.map((service, index) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
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
              {translations.learnMore}
              <ArrowIcon className={`w-4 h-4 transition-transform duration-300 ${isRtl ? 'group-hover/btn:-translate-x-2' : 'group-hover/btn:translate-x-2'}`} />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
