import { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP || "").replace(/[^0-9]/g, "");
const EMAIL = "mtozero.tech@gmail.com";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === "ar" ? "تواصل معنا" : "Contact Us",
    description:
      locale === "ar"
        ? "تواصل مع فريق MTOZERO لمناقشة مشروعك القادم — واتساب، بريد إلكتروني، أو زيارة مباشرة."
        : "Get in touch with the MTOZERO team to discuss your next project — WhatsApp, email, or in person.",
    alternates: {
      canonical: `/${locale}/contact`,
    },
  };
}

export default function ContactPage({ params: { locale } }: { params: { locale: "en" | "ar" } }) {
  const isRtl = locale === "ar";

  const whatsappMessage = isRtl
    ? "مرحباً MTOZERO، أود مناقشة مشروع جديد"
    : "Hello MTOZERO, I'd like to discuss a new project";
  const whatsappHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`
    : null;
  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    isRtl ? "استفسار عن مشروع — MTOZERO" : "Project Inquiry — MTOZERO"
  )}`;

  const cards = [
    whatsappHref && {
      href: whatsappHref,
      external: true,
      icon: MessageCircle,
      accent: "text-[#25D366]",
      ring: "hover:border-[#25D366]/40 hover:shadow-[0_20px_50px_rgba(37,211,102,0.15)]",
      title: isRtl ? "واتساب" : "WhatsApp",
      value: isRtl ? "الرد الأسرع — عادة خلال ساعات" : "Fastest response — usually within hours",
      cta: isRtl ? "ابدأ محادثة" : "Start a chat",
    },
    {
      href: mailtoHref,
      external: false,
      icon: Mail,
      accent: "text-mtozero-cyan",
      ring: "hover:border-mtozero-cyan/40 hover:shadow-[0_20px_50px_rgba(0,240,255,0.12)]",
      title: isRtl ? "البريد الإلكتروني" : "Email",
      value: EMAIL,
      cta: isRtl ? "أرسل رسالة" : "Send an email",
    },
  ].filter(Boolean) as {
    href: string;
    external: boolean;
    icon: typeof Mail;
    accent: string;
    ring: string;
    title: string;
    value: string;
    cta: string;
  }[];

  return (
    <div className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-32 left-0 w-96 h-96 bg-mtozero-cyan/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-mtozero-purple/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            {isRtl ? "لنبنِ شيئاً عظيماً معاً" : "Let's Build Something Great"}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            {isRtl
              ? "أخبرنا عن فكرتك أو مشكلتك التقنية، وسنعود إليك بخطة واضحة — بلا التزام."
              : "Tell us about your idea or technical challenge, and we'll get back to you with a clear plan — no strings attached."}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noopener noreferrer" : undefined}
              className={`group p-10 rounded-[2rem] bg-card/40 border border-border/60 backdrop-blur-sm transition-all duration-300 ${card.ring}`}
            >
              <card.icon className={`w-10 h-10 mb-6 ${card.accent} transition-transform group-hover:scale-110`} />
              <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
              <p className="text-muted-foreground mb-6 font-light">{card.value}</p>
              <span className={`inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest ${card.accent}`}>
                {card.cta}
                <span className={`transition-transform ${isRtl ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}>
                  {isRtl ? "←" : "→"}
                </span>
              </span>
            </Link>
          ))}
        </div>

        {/* Info strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-4 p-6 rounded-2xl bg-muted/30 border border-border/40">
            <MapPin className="w-6 h-6 text-mtozero-purple flex-shrink-0" />
            <div>
              <p className="font-bold text-sm">{isRtl ? "الموقع" : "Location"}</p>
              <p className="text-sm text-muted-foreground">{isRtl ? "الأبيض، السودان" : "El Obeid, Sudan"}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 rounded-2xl bg-muted/30 border border-border/40">
            <Clock className="w-6 h-6 text-mtozero-cyan flex-shrink-0" />
            <div>
              <p className="font-bold text-sm">{isRtl ? "أوقات الرد" : "Response Time"}</p>
              <p className="text-sm text-muted-foreground">
                {isRtl ? "خلال 24 ساعة كحد أقصى" : "Within 24 hours, guaranteed"}
              </p>
            </div>
          </div>
        </div>

        {/* Direct message form → lands in the Filament admin inbox */}
        <ContactForm locale={locale} />

        <p className="text-center mt-8 text-sm text-muted-foreground">
          {isRtl ? "عندك مشروع محدد وتحتاج عرض سعر؟ " : "Have a specific project and need a quote? "}
          <Link href={`/${locale}/quote`} className="font-bold text-mtozero-cyan hover:underline">
            {isRtl ? "اطلب عرض سعر" : "Request a quote"}
          </Link>
        </p>
      </div>
    </div>
  );
}
