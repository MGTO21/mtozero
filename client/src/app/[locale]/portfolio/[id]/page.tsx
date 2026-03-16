import { getTranslations } from "next-intl/server";
import { PortfolioDetailContent } from "@/components/portfolio-detail-content";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://127.0.0.1:8000/storage';

interface PortfolioProjectData {
  id: number;
  title: Record<string, string>;
  description: Record<string, string>;
  image: string | string[];
  url?: string;
  is_published: boolean;
  created_at: string;
}

export async function generateMetadata({ params: { locale, id } }: { params: { locale: string; id: string } }): Promise<Metadata> {
  const project = await getProject(id);
  if (!project) return {};

  const title = project.title[locale] || project.title['en'] || 'Project Details';
  const description = project.description[locale] || project.description['en'];

  return {
    title: `${title} | mtozero Portfolio`,
    description: description.substring(0, 160),
    openGraph: {
      title: `${title} | Mohammed Moatasim Portfolio`,
      description: description,
      images: Array.isArray(project.image) && project.image.length > 0 
        ? [`${STORAGE_URL}/${project.image[0]}`] 
        : project.image.startsWith('http') ? [project.image] : [`${STORAGE_URL}/${project.image}`],
    }
  };
}

async function getProject(id: string): Promise<PortfolioProjectData | null> {
  try {
    const res = await fetch(`${API_URL}/portfolio/${id}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function PortfolioDetailPage({ params: { locale, id } }: { params: { locale: 'en' | 'ar', id: string } }) {
  const navT = await getTranslations("Navigation");
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <PortfolioDetailContent 
      project={project} 
      locale={locale} 
      storageUrl={STORAGE_URL}
      translations={{
        backToPortfolio: navT("portfolio"),
        visitLive: locale === 'en' ? 'Visit Live Project' : 'زيارة المشروع المباشر',
        noDescription: locale === 'en' ? 'No description available for this project.' : 'لا يوجد وصف متاح لهذا المشروع.',
        untitled: locale === 'en' ? 'Untitled Project' : 'مشروع بدون عنوان'
      }}
    />
  );
}
