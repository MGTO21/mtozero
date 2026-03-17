"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  Twitter,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  Send,
  Ghost,
  Music,
  MessageCircle,
  Link as LinkIcon
} from "lucide-react";

interface SocialLinkType {
  id: number;
  platform: Record<string, string>;
  url: string;
  icon: string | null;
}

// Helper to render icon by name
const IconRenderer = ({ name, className }: { name: string | null, className?: string }) => {
  if (!name) return <LinkIcon className={className} />;

  const normalizedName = name.toLowerCase().trim();

  const iconMap: Record<string, React.ElementType> = {
    'twitter': Twitter,
    'github': Github,
    'linkedin': Linkedin,
    'facebook': Facebook,
    'instagram': Instagram,
    'youtube': Youtube,
    'mail': Mail,
    'email': Mail,
    'phone': Phone,
    'whatsapp': MessageCircle,
    'telegram': Send,
    'snapchat': Ghost,
    'tiktok': Music,
    'x': Twitter,
  };

  const IconComponent = iconMap[normalizedName] || LinkIcon;
  return <IconComponent className={className} />;
};

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("Navigation");
  const [socialLinks, setSocialLinks] = useState<SocialLinkType[]>([]);
  const isRtl = locale === 'ar';

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

  useEffect(() => {
    fetch(`${API_URL}/social-links`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSocialLinks(data);
        }
      })
      .catch(err => console.error('Failed to fetch social links for footer:', err));
  }, [API_URL]);

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12">
      <div className="container max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-6 transition-opacity hover:opacity-80">
              <span className="text-xl font-bold tracking-tighter flex items-center gap-[2px]">
                <span className="text-mtozero-cyan font-light">{"{"}</span>
                <span>MTOZERO</span>
                <span className="text-mtozero-purple font-light">{"}"}</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm font-light leading-relaxed">
              {isRtl
                ? "حلول رقمية ذكية مصممة للمستقبل. نحن نبني الأنظمة التي تدفع عملك للأمام."
                : "Smart digital solutions engineered for the future. We build the systems that drive your business forward."}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">{isRtl ? 'روابط سريعة' : 'Quick Links'}</h4>
            <nav className="flex flex-col gap-4 text-sm text-muted-foreground">
              <Link href={`/${locale}/services`} className="hover:text-mtozero-cyan transition-colors">{t("services")}</Link>
              <Link href={`/${locale}/portfolio`} className="hover:text-mtozero-cyan transition-colors">{t("portfolio")}</Link>
              <Link href={`/${locale}/saas`} className="hover:text-mtozero-cyan transition-colors">{t("saas")}</Link>
              <Link href={`/${locale}/blog`} className="hover:text-mtozero-cyan transition-colors">{t("blog")}</Link>
            </nav>
          </div>

          {/* Contact Section Placeholder */}
          <div className="md:col-span-1">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">{isRtl ? 'اتصل بنا' : 'Connect'}</h4>
            <p className="text-sm text-muted-foreground font-light mb-4">
              {isRtl ? 'الأبيض، السودان' : 'El Obeid, Sudan'}
            </p>
            <p className="text-sm text-mtozero-cyan font-medium">mtozero.tech@gmail.com</p>
          </div>

          {/* ALL Social Links Section */}
          <div className="md:col-span-1">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest">{isRtl ? 'تابعنا' : 'Follow Us'}</h4>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-muted hover:bg-mtozero-cyan/10 hover:text-mtozero-cyan transition-all border border-transparent hover:border-mtozero-cyan/20 group"
                  title={link.platform[locale] || link.platform['en']}
                >
                  <IconRenderer name={link.icon} className="h-5 w-5 transition-transform group-hover:scale-110" />
                </Link>
              ))}
              {socialLinks.length === 0 && (
                <p className="text-xs text-muted-foreground italic">
                  {isRtl ? 'لا توجد روابط تواصل حالياً' : 'No social links available'}
                </p>
              )}
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground font-light">
          <p>© {new Date().getFullYear()} MTOZERO. {isRtl ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
          <div className="flex gap-6">
            <button className="hover:text-foreground transition-colors">{isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}</button>
            <button className="hover:text-foreground transition-colors">{isRtl ? 'اتفاقية الاستخدام' : 'Terms of Service'}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
