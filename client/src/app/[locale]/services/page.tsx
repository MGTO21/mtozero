import { getTranslations } from "next-intl/server";
import { AlertCircle, Search, PenTool, Code2, Rocket } from "lucide-react";
import { ServicesList } from "@/components/services-list";
import { Metadata } from "next";
import Link from "next/link";
import { getServices as fetchServices } from "@/lib/content";


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  await getTranslations({ locale, namespace: 'SEO' });
  
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
  return fetchServices();
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

      {/* How We Work — Process Section */}
      <section className="mt-32 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-mtozero-cyan">
            {isRtl ? 'منهجية العمل' : 'Our Process'}
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-4 tracking-tight">
            {isRtl ? 'كيف نحوّل فكرتك إلى منتج' : 'From Idea to Product'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Search,
              step: '01',
              title: isRtl ? 'الاكتشاف والتحليل' : 'Discovery & Analysis',
              desc: isRtl
                ? 'نجلس معك لفهم عملك وأهدافك، ونحلل المتطلبات ونحدد نطاق المشروع بدقة قبل كتابة أي سطر كود.'
                : 'We sit with you to understand your business and goals, analyze requirements, and define a precise project scope before writing a single line of code.',
            },
            {
              icon: PenTool,
              step: '02',
              title: isRtl ? 'التصميم والنمذجة' : 'Design & Prototyping',
              desc: isRtl
                ? 'نصمم تجربة المستخدم والواجهات، ونشاركك نماذج تفاعلية للمراجعة والموافقة قبل التطوير.'
                : 'We craft the UX and interfaces, sharing interactive prototypes for your review and approval before development begins.',
            },
            {
              icon: Code2,
              step: '03',
              title: isRtl ? 'التطوير والاختبار' : 'Build & Test',
              desc: isRtl
                ? 'تطوير تدريجي بمعايير أمان صارمة، مع اختبارات مستمرة وتحديثات دورية تصلك أولاً بأول.'
                : 'Iterative development with strict security standards, continuous testing, and regular progress updates delivered to you.',
            },
            {
              icon: Rocket,
              step: '04',
              title: isRtl ? 'الإطلاق والدعم' : 'Launch & Support',
              desc: isRtl
                ? 'نشر احترافي على البنية المناسبة لك، مع دعم فني مستمر وتطوير للميزات بعد الإطلاق.'
                : 'Professional deployment on the right infrastructure, with ongoing technical support and feature evolution after launch.',
            },
          ].map((phase) => (
            <div
              key={phase.step}
              className="group relative p-8 rounded-[1.75rem] bg-card/40 border border-border/60 backdrop-blur-sm hover:border-mtozero-cyan/30 transition-all duration-300"
            >
              <span className="absolute top-6 end-8 text-4xl font-black text-foreground/[0.06] group-hover:text-mtozero-cyan/10 transition-colors">
                {phase.step}
              </span>
              <phase.icon className="w-8 h-8 text-mtozero-cyan mb-6" />
              <h3 className="text-lg font-bold mb-3">{phase.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">{phase.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Strip */}
      <section className="mt-24 relative z-10 text-center">
        <p className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground mb-8">
          {isRtl ? 'التقنيات التي نتقنها' : 'Technologies We Master'}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {['Next.js', 'React', 'Laravel', 'Flutter', 'Node.js', 'PostgreSQL', 'MySQL', 'Tailwind CSS', 'AI Integration'].map((tech) => (
            <span
              key={tech}
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-muted/40 border border-border/60 text-foreground/70 hover:text-mtozero-cyan hover:border-mtozero-cyan/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 relative z-10 text-center p-12 rounded-[2.5rem] bg-gradient-to-br from-mtozero-cyan/10 via-background to-mtozero-purple/10 border border-mtozero-cyan/20">
        <h2 className="text-2xl md:text-4xl font-black mb-4">
          {isRtl ? 'عندك مشروع في بالك؟' : 'Have a project in mind?'}
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto font-light">
          {isRtl
            ? 'احجز استشارة مجانية ودعنا نناقش أفضل طريقة لتنفيذ فكرتك.'
            : 'Book a free consultation and let\'s discuss the best way to bring your idea to life.'}
        </p>
        <Link
          href={`/${locale}/quote`}
          className="inline-flex items-center gap-3 px-10 py-5 bg-mtozero-cyan text-black font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-mtozero-cyan/40"
        >
          {isRtl ? 'اطلب عرض سعر' : 'Request a Quote'}
        </Link>
      </section>
    </div>
  );
}
