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
  Menu,
  X,
  Link as LinkIcon
} from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle, LocaleToggle } from "./theme-toggle";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { useSocialLinks } from "@/lib/social-links";

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
  const { links: socialLinks } = useSocialLinks();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const navLinks = [
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/portfolio`, label: t("portfolio") },
    { href: `/${locale}/saas`, label: t("saas") },
    { href: `/${locale}/blog`, label: t("blog") },
  ];

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
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground transition-colors">{link.label}</Link>
          ))}
          <Link href={`/${locale}/contact`} className="text-mtozero-cyan hover:text-mtozero-cyan/80 transition-colors font-bold">{t("contact")}</Link>
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
            
            {/* Fallback if no links exist (optional, can be empty) */}
            {socialLinks.length === 0 && (
                <div className="flex gap-3">
                   {/* Removed hardcoded Twitter/Github to respect admin deletions */}
                </div>
            )}
          </div>

          <LocaleToggle currentLocale={locale} />
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/60 text-foreground hover:bg-muted transition-colors"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute inset-x-0 top-full border-b border-border/40 bg-background shadow-lg"
          >
            <nav className="flex flex-col px-4 py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-muted ${
                    pathname?.startsWith(link.href) ? "text-foreground bg-muted/60" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg px-3 py-3 text-base font-bold text-mtozero-cyan hover:bg-muted transition-colors"
              >
                {t("contact")}
              </Link>
            </nav>

            {socialLinks.length > 0 && (
              <div className="sm:hidden flex flex-wrap items-center gap-5 border-t border-border/40 px-7 py-4">
                {socialLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    className="text-muted-foreground hover:text-mtozero-cyan transition-colors"
                    title={link.platform[locale] || link.platform["en"]}
                  >
                    <IconRenderer name={link.icon} className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
