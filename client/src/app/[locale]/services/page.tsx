import { getTranslations } from "next-intl/server";
import { AlertCircle } from "lucide-react";
import { ServicesList } from "@/components/services-list";
import { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

interface ServiceType {
  id: number;
  icon: string;
  title: Record<string, string>;
  description: Record<string, string>;
  features?: Record<string, string[]>;
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'SEO' });
  
  return {
    title: locale === 'ar' ? `خدماتنا الرقمية | mtozero` : `Our Digital Services | mtozero`,
    description: locale === 'ar' 
      ? `استكشف خدمات البرمجة والحلول الذكية المقدمة من المبرمج محمد معتصم (MTOZERO). تطوير مواقع، تطبيقات، وحلول سحابية.` 
      : `Explore professional software services by Mohammed Moatasim (MTOZERO). Web development, app building, and cloud solutions.`,
    alternates: {
      canonical: `/${locale}/services`,
    }
  };
}

async function getServices() {
  try {
    const res = await fetch(`${API_URL}/services`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function ServicesPage({ params: { locale } }: { params: { locale: 'en' | 'ar' } }) {
  const navT = await getTranslations("Navigation");
  const services = await getServices();

  const isRtl = locale === 'ar';

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Abstract Background Accents */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-mtozero-cyan/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-mtozero-purple/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Page Header */}
      <div className="text-center mb-20 relative z-10">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          {navT("services")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
          {locale === 'en' 
            ? "MTOZERO - Engineered for speed, designed for impact. Mohammed Moatasim signature solutions." 
            : "mtozero - جودة برمجية فائقة، تصميمات ملهمة. حلول المبرمج محمد معتصم الرقمية."}
        </p>
      </div>

      {services.length > 0 ? (
        <ServicesList 
          services={services} 
          locale={locale} 
          translations={{
            learnMore: locale === 'en' ? "Learn More" : "اكتشف المزيد"
          }} 
        />
      ) : (
        <div className="col-span-full py-20 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-xl font-medium">{isRtl ? 'عذراً، لم نتمكن من العثور على أي خدمات حالياً' : 'Sorry, we couldn\'t find any services right now'}</p>
        </div>
      )}
    </div>
  );
}
