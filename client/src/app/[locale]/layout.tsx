import type { Metadata } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic, IBM_Plex_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsappButton } from "@/components/whatsapp-button";
import NextTopLoader from 'nextjs-toploader';
import { getSocialLinks } from "@/lib/content";
import "../globals.css";

const display = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-display",
  display: "swap",
});

const body = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
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
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/logo.jpeg", type: "image/jpeg" },
      ],
      shortcut: "/icon.svg",
      apple: "/logo.jpeg",
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: baseUrl,
      siteName: "MTOZERO",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "MTOZERO — software studio, El Obeid, Sudan",
        },
      ],
      locale: locale === "ar" ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: ["/og-image.png"],
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
  const fontClass = `font-sans ${display.variable} ${body.variable} ${mono.variable}`;

  const [seo, socialLinks] = await Promise.all([getTranslations({ locale, namespace: "SEO" }), getSocialLinks()]);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MTOZERO",
    url: "https://mtozero.com",
    logo: "https://mtozero.com/logo.jpeg",
    description: seo("description"),
    email: "mtozero.tech@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "ar" ? "الأبيض" : "El Obeid",
      addressCountry: "SD",
    },
    sameAs: Array.from(new Set(["https://github.com/MGTO21", ...socialLinks.map((l: { url: string }) => l.url).filter((u: string) => u?.startsWith("http") && !u.includes("wa.me"))])),
    founder: {
      "@type": "Person",
      name: locale === "ar" ? "محمد معتصم" : "Mohammed Moatasim",
    },
  };

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${fontClass} antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <NextTopLoader color="#08695F" height={2} showSpinner={false} />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <Header locale={locale} />
              <main className="flex-1 relative">
                {children}
              </main>
              <Footer locale={locale} />
              <WhatsappButton locale={locale} />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
