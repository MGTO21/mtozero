import type { Metadata } from "next";
import { Outfit, Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import NextTopLoader from 'nextjs-toploader';
import "../globals.css";

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit",
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: "swap" 
});

const cairo = Cairo({ 
  subsets: ["arabic"], 
  variable: "--font-cairo",
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  display: "swap" 
});

export const metadata: Metadata = {
  title: "MTOZERO - Smart Digital Solutions",
  description: "Next Generation Web Platform",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  const fontClass = locale === "ar" 
    ? `font-arabic ${cairo.variable}` 
    : `font-sans ${outfit.variable}`;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${fontClass} antialiased min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300 selection:bg-mtozero-purple selection:text-white`}>
        <NextTopLoader color="#00f0ff" showSpinner={false} />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <Header locale={locale} />
              <main className="flex-1 relative">
                {/* Background Ambience applied globally */}
                <div className="absolute inset-x-0 inset-y-0 z-[-1] bg-background pointer-events-none overflow-hidden">
                  <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-mtozero-cyan/5 blur-[120px] dark:bg-mtozero-cyan/10 translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] rounded-full bg-mtozero-purple/5 blur-[120px] dark:bg-mtozero-purple/10 -translate-x-1/2 translate-y-1/2"></div>
                </div>
                {children}
              </main>
              <Footer locale={locale} />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
