import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { ProjectGallery } from "@/components/portfolio-detail-content";
import { pageWrap } from "@/components/page-header";
import { resolveSrc } from "@/components/screenshot";
import { getPortfolioProject } from "@/lib/content";
import { excerpt, pick, projectImages, splitTitle } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";

export async function generateMetadata({ params: { locale, id } }: { params: { locale: string; id: string } }): Promise<Metadata> {
  const project = await getPortfolioProject(id);
  if (!project) return {};
  const { name } = splitTitle(pick(project.title, locale));
  const description = excerpt(pick(project.description, locale), 160);
  const cover = projectImages(project.image)[0];
  return {
    title: name,
    description,
    openGraph: { title: name, description, images: cover ? [resolveSrc(cover)] : ["/og-image.png"] },
    alternates: { canonical: `/${locale}/portfolio/${id}` },
  };
}

export default async function PortfolioDetailPage({ params: { locale, id } }: { params: { locale: "en" | "ar"; id: string } }) {
  const [project, t] = await Promise.all([getPortfolioProject(id), getTranslations({ locale, namespace: "Pages" })]);
  if (!project) notFound();

  const { name, tagline } = splitTitle(pick(project.title, locale));
  const description = pick(project.description, locale);
  const images = projectImages(project.image);
  const url: string | undefined = project.url && project.url !== "#" ? project.url : undefined;
  const wa = whatsappLink(t("portfolio_wa", { name }));
  const Back = locale === "ar" ? ArrowRight : ArrowLeft;
  const External = locale === "ar" ? ArrowUpLeft : ArrowUpRight;

  return (
    <article className={`${pageWrap} pb-20 pt-10`}>
      <Link href={`/${locale}/portfolio`} className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground">
        <Back className="h-4 w-4" />
        {t("portfolio_back")}
      </Link>

      <header className="mt-8 grid grid-cols-1 gap-6 border-b border-border pb-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <h1 className="font-display text-[2rem] font-extrabold leading-[1.3] text-foreground sm:text-[2.75rem]">{name}</h1>
          {tagline && <p className="mt-3 text-xl font-light text-muted-foreground">{tagline}</p>}
        </div>
        <div className="flex flex-wrap items-end gap-x-6 gap-y-3 text-[15px] font-semibold lg:col-span-4 lg:justify-end">
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-brand underline-offset-[6px] hover:underline">
              {t("portfolio_visit")}
              <External className="h-4 w-4" />
            </a>
          )}
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded bg-foreground px-4 py-2.5 text-background transition-colors duration-150 hover:bg-brand">
              {t("portfolio_want")}
            </a>
          )}
        </div>
      </header>

      {images.length > 0 && (
        <section className="mt-10">
          <ProjectGallery images={images} name={name} screenLabel={t("portfolio_screen_n")} />
        </section>
      )}

      {description && (
        <section className="mt-16 grid grid-cols-1 gap-4 border-t border-foreground pt-5 lg:grid-cols-12 lg:gap-12">
          <h2 className="text-sm font-medium text-foreground lg:col-span-4">{t("portfolio_about")}</h2>
          <div className="whitespace-pre-line text-[17px] font-light leading-[1.9] text-foreground/85 lg:col-span-8">{description}</div>
        </section>
      )}
    </article>
  );
}
