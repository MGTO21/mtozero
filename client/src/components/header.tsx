"use client";

import Link from "next/link";
import Image from "next/image";
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
import { ThemeToggle, LocaleToggle } from "./theme-toggle";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

export function Header({ locale }: { locale: string }) {
  const t = useTranslations("Navigation");
  const [socialLinks, setSocialLinks] = useState<SocialLinkType[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/social-links')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setSocialLinks(data);
        }
      })
      .catch(err => console.error('Failed to fetch social links:', err));
  }, []);

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between mx-auto px-4 md:px-8">
        
        {/* Logo Section */}
        <Link href={`/${locale}`} className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="relative h-9 w-9 overflow-hidden rounded-md border border-mtozero-cyan/20">
            <Image 
              src="/logo.jpeg" 
              alt="MTOZERO" 
              fill 
              sizes="36px"
              className="object-cover" 
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-tighter flex items-center gap-[2px]">
            <span className="text-mtozero-cyan font-light">{"{"}</span>
            <span>MTOZERO</span>
            <span className="text-mtozero-purple font-light">{"}"}</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href={`/${locale}/services`} className="hover:text-foreground transition-colors">{t("services") ?? "Services"}</Link>
          <Link href={`/${locale}/portfolio`} className="hover:text-foreground transition-colors">{t("portfolio") ?? "Portfolio"}</Link>
          <Link href={`/${locale}/saas`} className="hover:text-foreground transition-colors">{t("saas") ?? "SaaS Products"}</Link>
          <Link href={`/${locale}/blog`} className="hover:text-foreground transition-colors">{t("blog") ?? "Blog"}</Link>
        </nav>

        {/* Global Controls */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* Dynamic Social Icons */}
          <div className="hidden sm:flex items-center gap-3 mr-2 border-r border-border pr-5">
            {socialLinks.map((link) => (
              <Link 
                key={link.id} 
                href={link.url} 
                target="_blank" 
                className="text-muted-foreground hover:text-mtozero-cyan transition-colors"
                title={link.platform[locale] || link.platform['en']}
              >
                <IconRenderer name={link.icon} className="h-4 w-4" />
              </Link>
            ))}
            
            {/* Fallback if no links exist */}
            {socialLinks.length === 0 && (
                <div className="flex gap-3">
                   <Link href="https://twitter.com" target="_blank" className="text-muted-foreground hover:text-mtozero-cyan transition-colors">
                     <Twitter className="h-4 w-4" />
                   </Link>
                   <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-mtozero-purple transition-colors">
                     <Github className="h-4 w-4" />
                   </Link>
                </div>
            )}
          </div>

          <LocaleToggle currentLocale={locale} />
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
