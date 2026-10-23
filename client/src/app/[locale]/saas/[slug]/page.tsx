import { getTranslations } from "next-intl/server";
import { SaasDetailContent } from "@/components/saas-detail-content";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSaasProduct } from "@/lib/content";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || '+249992673760';

interface SaasProductType {
  id: number;
  slug: string;
  name: Record<string, string>;
  description: Record<string, string>;
  features?: Record<string, ({ item: string }[]) | string> | null;
  pricing: Record<string, string> | null;
  is_active: boolean;
}

export async function generateMetadata({ params: { locale, slug } }: { params: { locale: string; slug: string } }): Promise<Metadata> {
  const product = await getProduct(slug);
  if (!product) return {};

  const name = product.name[locale] || product.name['en'];
  const description = product.description[locale] || product.description['en'];

  return {
    title: `${name} | mtozero SaaS Solutions`,
    description: description.substring(0, 160),
    openGraph: {
      title: `${name} - Smart Business Solution by MTOZERO`,
      description: description,
    }
  };
}

async function getProduct(slug: string): Promise<SaasProductType | null> {
  return getSaasProduct(slug);
}

export default async function SaasDetailPage({ params: { locale, slug } }: { params: { locale: 'en' | 'ar', slug: string } }) {
  const navT = await getTranslations("Navigation");
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <SaasDetailContent 
      product={product} 
      locale={locale} 
      whatsappNumber={WHATSAPP_NUMBER}
      translations={{
        backToSaas: navT("saas"),
        requestDemo: locale === 'en' ? 'Request Demo' : 'طلب عرض تجريبي',
        coreFeatures: locale === 'en' ? 'Core Features' : 'الميزات الأساسية',
        customPricing: locale === 'en' ? 'Custom Pricing' : 'تسعير مخصص'
      }}
    />
  );
}
