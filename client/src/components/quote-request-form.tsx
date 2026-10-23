"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const API_URL = "/api";

type Status = "idle" | "sending" | "success" | "error";

export function QuoteRequestForm({ locale }: { locale: string }) {
  const isRtl = locale === "ar";
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/quote-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch (err) {
      console.error("Quote request error:", err);
      setStatus("error");
    }
  }

  const labels = {
    name: isRtl ? "الاسم" : "Name",
    email: isRtl ? "البريد الإلكتروني" : "Email",
    phone: isRtl ? "رقم الهاتف" : "Phone",
    projectType: isRtl ? "نوع المشروع" : "Project Type",
    budget: isRtl ? "الميزانية التقديرية" : "Estimated Budget",
    timeline: isRtl ? "المدة الزمنية المطلوبة" : "Desired Timeline",
    details: isRtl ? "أخبرنا عن مشروعك" : "Tell us about your project",
    send: isRtl ? "أرسل الطلب" : "Send Request",
    sending: isRtl ? "جارٍ الإرسال..." : "Sending...",
    success: isRtl
      ? "وصل طلبك بنجاح! سنرسل لك عرض السعر خلال 24 ساعة."
      : "Request received! We'll send you a quote within 24 hours.",
    error: isRtl
      ? "تعذر الإرسال. جرّب مرة أخرى أو راسلنا عبر واتساب."
      : "Couldn't send. Try again or reach us on WhatsApp.",
  };

  const projectTypes = [
    { value: "website", ar: "موقع إلكتروني", en: "Website" },
    { value: "web_app", ar: "تطبيق ويب", en: "Web Application" },
    { value: "mobile_app", ar: "تطبيق جوال", en: "Mobile App" },
    { value: "saas", ar: "منتج SaaS", en: "SaaS Product" },
    { value: "other", ar: "أخرى", en: "Other" },
  ];

  const budgets = [
    { value: "under_1k", ar: "أقل من 1000$", en: "Under $1,000" },
    { value: "1k_5k", ar: "1,000$ - 5,000$", en: "$1,000 - $5,000" },
    { value: "5k_15k", ar: "5,000$ - 15,000$", en: "$5,000 - $15,000" },
    { value: "over_15k", ar: "أكثر من 15,000$", en: "Over $15,000" },
  ];

  const timelines = [
    { value: "asap", ar: "بأسرع وقت ممكن", en: "As soon as possible" },
    { value: "1_3_months", ar: "1 - 3 أشهر", en: "1 - 3 months" },
    { value: "3_6_months", ar: "3 - 6 أشهر", en: "3 - 6 months" },
    { value: "flexible", ar: "مرنة", en: "Flexible" },
  ];

  const inputCls =
    "w-full px-5 py-4 rounded-2xl bg-muted/30 border border-border/60 focus:border-mtozero-cyan/60 focus:ring-2 focus:ring-mtozero-cyan/20 outline-none transition-all placeholder:text-muted-foreground/60";

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 md:p-12 rounded-[2rem] bg-card/40 border border-border/60 backdrop-blur-sm space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input name="name" required maxLength={255} placeholder={labels.name} className={inputCls} />
        <input name="email" type="email" required maxLength={255} placeholder={labels.email} className={inputCls} />
      </div>
      <input name="phone" maxLength={50} placeholder={labels.phone} className={inputCls} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <select name="project_type" required defaultValue="" className={inputCls}>
          <option value="" disabled>
            {labels.projectType}
          </option>
          {projectTypes.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {isRtl ? opt.ar : opt.en}
            </option>
          ))}
        </select>
        <select name="budget" defaultValue="" className={inputCls}>
          <option value="">{labels.budget}</option>
          {budgets.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {isRtl ? opt.ar : opt.en}
            </option>
          ))}
        </select>
        <select name="timeline" defaultValue="" className={inputCls}>
          <option value="">{labels.timeline}</option>
          {timelines.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {isRtl ? opt.ar : opt.en}
            </option>
          ))}
        </select>
      </div>

      <textarea name="details" required maxLength={5000} rows={6} placeholder={labels.details} className={`${inputCls} resize-none`} />

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
  );
}
