"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const API_URL = "/api";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm({ locale }: { locale: string }) {
  const isRtl = locale === "ar";
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    }
  }

  const labels = {
    heading: isRtl ? "أو أرسل رسالة مباشرة" : "Or send a direct message",
    sub: isRtl
      ? "تصل رسالتك لفريقنا فوراً وسنرد عليك عبر بريدك الإلكتروني."
      : "Your message reaches our team instantly and we'll reply to your email.",
    name: isRtl ? "الاسم" : "Name",
    email: isRtl ? "البريد الإلكتروني" : "Email",
    subject: isRtl ? "الموضوع" : "Subject",
    message: isRtl ? "رسالتك" : "Your message",
    send: isRtl ? "إرسال الرسالة" : "Send Message",
    sending: isRtl ? "جارٍ الإرسال..." : "Sending...",
    success: isRtl
      ? "وصلت رسالتك بنجاح! سنعود إليك خلال 24 ساعة."
      : "Message received! We'll get back to you within 24 hours.",
    error: isRtl
      ? "تعذر الإرسال. جرّب مرة أخرى أو راسلنا عبر واتساب."
      : "Couldn't send. Try again or reach us on WhatsApp.",
  };

  const inputCls =
    "w-full px-5 py-4 rounded-2xl bg-muted/30 border border-border/60 focus:border-mtozero-cyan/60 focus:ring-2 focus:ring-mtozero-cyan/20 outline-none transition-all placeholder:text-muted-foreground/60";

  return (
    <div className="max-w-3xl mx-auto mt-24">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black mb-4">{labels.heading}</h2>
        <p className="text-muted-foreground font-light">{labels.sub}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-8 md:p-12 rounded-[2rem] bg-card/40 border border-border/60 backdrop-blur-sm space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="name" required maxLength={100} placeholder={labels.name} className={inputCls} />
          <input name="email" type="email" required maxLength={150} placeholder={labels.email} className={inputCls} />
        </div>
        <input name="subject" maxLength={150} placeholder={labels.subject} className={inputCls} />
        <textarea name="message" required maxLength={2000} rows={6} placeholder={labels.message} className={`${inputCls} resize-none`} />

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-12 py-5 rounded-full bg-mtozero-cyan text-black font-black uppercase tracking-widest text-sm hover:scale-[1.03] active:scale-95 transition-transform disabled:opacity-60 disabled:hover:scale-100"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {labels.sending}
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              {labels.send}
            </>
          )}
        </button>

        {status === "success" && (
          <p className="flex items-center gap-3 text-green-500 font-medium" role="status">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            {labels.success}
          </p>
        )}
        {status === "error" && (
          <p className="flex items-center gap-3 text-destructive font-medium" role="alert">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {labels.error}
          </p>
        )}
      </form>
    </div>
  );
}
