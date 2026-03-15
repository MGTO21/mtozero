"use client";

import * as React from "react";
import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 bg-background border border-border shadow-sm"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

export function LocaleToggle({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = currentLocale === "en" ? "ar" : "en";
    if (!pathname) return;
    
    // Replace the locale in the pathname
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    // If it's the root path (/)
    if (pathname === '/' || pathname === `/${currentLocale}`) {
       router.push(`/${newLocale}`);
       return;
    }
    
    // Avoid double slashes if any
    router.push(newPath.replace('//', '/'));
  };

  return (
    <button
      onClick={toggleLocale}
      className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3 bg-background border border-border shadow-sm uppercase tracking-wider"
    >
      <Globe className="h-4 w-4" />
      <span>{currentLocale === "en" ? "Ar" : "En"}</span>
    </button>
  );
}
