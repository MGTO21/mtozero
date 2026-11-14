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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-6 px-4 md:px-8">
        <Link href={`/${locale}`} className="flex items-center gap-2.5" dir="ltr">
          <span className="relative h-8 w-8 overflow-hidden rounded border border-border">
            <Image src="/logo.jpeg" alt="" fill sizes="32px" className="object-cover" priority />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">MTOZERO</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-[15px] text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname?.startsWith(link.href) ? "page" : undefined}
              className="transition-colors duration-150 hover:text-foreground aria-[current=page]:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link href={`/${locale}/contact`} className="font-semibold text-brand transition-colors duration-150 hover:text-foreground">
            {t("contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
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
    </header>
  );
}
