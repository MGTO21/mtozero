import { getTranslations } from "next-intl/server";
import { AlertCircle } from "lucide-react";
import { SaasList } from "@/components/saas-list";
import { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

interface SaasProductType {
  id: number;
  slug: string;
  name: Record<string, string>;
  description: Record<string, string>;
  pricing: Record<string, string> | null;
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === 'ar' ? `منصات ساس جاهزة | mtozero` : `Ready-to-Deploy SaaS | mtozero`,
    description: locale === 'ar' 
      ? `استعرض منتجات الساس الجاهزة للنشر من mtozero. أنظمة ذكية لإدارة الأعمال والعيادات والمتاجر، مبرمجة بواسطة محمد معتصم.` 
      : `Browse ready-to-deploy SaaS products from mtozero. Smart systems for business, clinic, and retail management by Mohammed Moatasim.`,
    alternates: {
      canonical: `/${locale}/saas`,
    }
  };
}

async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/saas-products`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching SaaS products:", error);
    return [];
  }
}

export default async function SaasIndexPage({ params: { locale } }: { params: { locale: 'en' | 'ar' } }) {
  const navT = await getTranslations("Navigation");
  const products = await getProducts();

  const isRtl = locale === 'ar';

  return (
    <div className="min-h-[85vh] py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-20 right-20 w-[30rem] h-[30rem] bg-mtozero-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-[40rem] h-[40rem] bg-mtozero-purple/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Page Header */}
      <div className="text-center mb-20 relative z-10">
        <span className="inline-block py-1 px-3 mb-4 rounded-full bg-muted border border-border text-sm font-medium text-muted-foreground">
           {locale === 'en' ? "Ready-to-Deploy Platforms" : "منصات جاهزة للنشر"}
        </span>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          {navT("saas")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
          {locale === 'en' 
            ? "MTOZERO SaaS Matrix - Mohammed Moatasim signature cloud solutions." 
            : "مصفوفة ساس mtozero - أنظمة سحابية متكاملة من ابتكار محمد معتصم."}
        </p>
      </div>

      {products.length > 0 ? (
        <SaasList 
          products={products} 
          locale={locale} 
          translations={{
            customPricing: isRtl ? 'تسعير مخصص' : 'Custom Pricing'
          }}
        />
      ) : (
        <div className="col-span-full py-20 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-xl font-medium">{isRtl ? 'عذراً، لم نتمكن من العثور على أي منتجات حالياً' : 'Sorry, we couldn\'t find any products right now'}</p>
        </div>
      )}
    </div>
  );
}
