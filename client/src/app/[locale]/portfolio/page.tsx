import { getTranslations } from "next-intl/server";
import { AlertCircle } from "lucide-react";
import { PortfolioList } from "@/components/portfolio-list";
import { Metadata } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  await getTranslations({ locale, namespace: 'SEO' });
  
  return {
    title: locale === 'ar' ? `معرض أعمال محمد معتصم | mtozero` : `Mohammed Moatasim Portfolio | mtozero`,
    description: locale === 'ar' 
      ? `شاهد أحدث المشروعات والحلول الرقمية المنفذة بواسطة المطور محمد معتصم. تطبيقات ويب، منصات سحابية، وتصميمات مبتكرة.` 
      : `Latest projects and digital solutions by software developer Mohammed Moatasim. Web apps, cloud platforms, and innovative designs.`,
    alternates: {
      canonical: `/${locale}/portfolio`,
    }
  };
}

async function getProjects() {
  try {
    const res = await fetch(`${API_URL}/portfolio`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function PortfolioPage({ params: { locale } }: { params: { locale: 'en' | 'ar' } }) {
  const navT = await getTranslations("Navigation");
  const projects = await getProjects();

  const isRtl = locale === 'ar';

  return (
    <div className="min-h-[85vh] py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-mtozero-cyan/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-mtozero-purple/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Page Header */}
      <div className="text-center mb-20 relative z-10">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          {navT("portfolio")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
          {locale === 'en' 
            ? "MTOZERO Legacy - Portfolio of Mohammed Moatasim. Craftsmanship meet performance." 
            : "بصمة mtozero - معرض أعمال المطور محمد معتصم. حيث تلتقي الحرفية بالأداء الفائق."}
        </p>
      </div>

      {projects.length > 0 ? (
        <PortfolioList projects={projects} locale={locale} storageUrl={STORAGE_URL} />
      ) : (
        <div className="col-span-full py-20 text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-xl font-medium">{isRtl ? 'عذراً، لم نتمكن من العثور على أي مشاريع حالياً' : 'Sorry, we couldn\'t find any projects right now'}</p>
        </div>
      )}
    </div>
  );
}
