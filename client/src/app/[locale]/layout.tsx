import type { Metadata } from "next";
import { Outfit, Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
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

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'SEO' });
  const baseUrl = "https://mtozero.com";

  return {
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: "Mohammed Moatasim", url: "https://github.com/MGTO21" }],
    creator: "Mohammed Moatasim",
    publisher: "MTOZERO",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en-US': '/en',
        'ar-SA': '/ar',
      },
    },
    verification: {
      google: "1wlCGDL4si31kzIKh48hdTHTdOnx3B6v4qMDeMYT77A",
    },
    icons: {
      icon: "/logo.jpeg",
      shortcut: "/logo.jpeg",
      apple: "/logo.jpeg",
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: baseUrl,
      siteName: "MTOZERO",
      images: [
        {
          url: "/logo.jpeg",
          width: 800,
          height: 800,
          alt: "MTOZERO Logo",
        },
      ],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: ["/logo.jpeg"],
      creator: "@mtozero",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MTOZERO",
    "url": "https://mtozero.com",
    "logo": "https://mtozero.com/logo.jpeg",
    "sameAs": [
      "https://github.com/MGTO21",
    ],
    "founder": {
      "@type": "Person",
      "name": "Mohammed Moatasim",
      "jobTitle": "Lead Software Developer"
    }
  };

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
                <div className="absolute inset-x-0 inset-y-0 z-[-1] bg-background pointer-events-none overflow-hidden select-none">
                  {/* Glowing Orbs */}
                  <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-mtozero-cyan/5 blur-[120px] dark:bg-mtozero-cyan/10 translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] rounded-full bg-mtozero-purple/5 blur-[120px] dark:bg-mtozero-purple/10 -translate-x-1/2 translate-y-1/2"></div>
                  
                  {/* Branding Watermarks { } */}
                  <div className={`absolute top-[15%] ${locale === 'ar' ? 'left-[5%]' : 'right-[5%]'} text-[20rem] font-black text-foreground/[0.03] rotate-12 pointer-events-none hidden lg:block`}>
                    {"{"}
                  </div>
                  <div className={`absolute bottom-[10%] ${locale === 'ar' ? 'right-[10%]' : 'left-[10%]'} text-[25rem] font-black text-foreground/[0.02] -rotate-12 pointer-events-none hidden lg:block`}>
                    {"}"}
                  </div>
                  
                  {/* Subtle Grid / Noise */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] brightness-100 contrast-150" />
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
