"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label={theme === "light" ? "Dark mode" : "Light mode"}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded border border-border text-foreground transition-colors duration-150 hover:bg-muted"
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
      lang={currentLocale === "en" ? "ar" : "en"}
      className="inline-flex h-9 items-center justify-center rounded border border-border px-3 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted"
    >
      <span>{currentLocale === "en" ? "عربي" : "English"}</span>
    </button>
  );
}
