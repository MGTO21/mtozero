"use client";

import { useState } from "react";
import { Field, FormStatus, SubmitButton, inputCls } from "@/components/form-fields";

type Status = "idle" | "sending" | "success" | "error";

const projectTypes = [
  { value: "website", ar: "موقع إلكتروني", en: "Website" },
  { value: "web_app", ar: "نظام ويب", en: "Web system" },
  { value: "mobile_app", ar: "تطبيق جوال", en: "Mobile app" },
  { value: "saas", ar: "منتج SaaS", en: "SaaS product" },
  { value: "other", ar: "أخرى", en: "Other" },
];

const budgets = [
  { value: "under_1k", ar: "أقل من 1,000$", en: "Under $1,000" },
  { value: "1k_5k", ar: "1,000$ – 5,000$", en: "$1,000 – $5,000" },
  { value: "5k_15k", ar: "5,000$ – 15,000$", en: "$5,000 – $15,000" },
  { value: "over_15k", ar: "أكثر من 15,000$", en: "Over $15,000" },
];

const timelines = [
  { value: "asap", ar: "بأسرع وقت", en: "As soon as possible" },
  { value: "1_3_months", ar: "1 – 3 أشهر", en: "1 – 3 months" },
  { value: "3_6_months", ar: "3 – 6 أشهر", en: "3 – 6 months" },
  { value: "flexible", ar: "مرنة", en: "Flexible" },
];

export function QuoteRequestForm({ locale }: { locale: string }) {
  const isRtl = locale === "ar";
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/quote-requests", {
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

  const l = {
    name: isRtl ? "الاسم" : "Name",
    email: isRtl ? "البريد الإلكتروني" : "Email",
    phone: isRtl ? "رقم الهاتف أو واتساب" : "Phone or WhatsApp",
    projectType: isRtl ? "نوع المشروع" : "Project type",
    budget: isRtl ? "الميزانية التقديرية" : "Estimated budget",
    timeline: isRtl ? "المدة المطلوبة" : "Timeline",
    details: isRtl ? "صف مشروعك: من سيستخدمه، وما المشكلة التي يحلها" : "Describe the project: who will use it and what problem it solves",
    choose: isRtl ? "اختر" : "Choose",
    send: isRtl ? "أرسل الطلب" : "Send request",
    sending: isRtl ? "جارٍ الإرسال…" : "Sending…",
    success: isRtl ? "وصل طلبك. سنرسل لك تقديراً مبدئياً خلال 24 ساعة." : "Request received. We'll send a first estimate within 24 hours.",
    error: isRtl ? "تعذّر الإرسال. جرّب مرة أخرى أو راسلنا على واتساب." : "Couldn't send. Try again or message us on WhatsApp.",
  };

  const label = (o: { ar: string; en: string }) => (isRtl ? o.ar : o.en);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label={l.name} htmlFor="q-name" required>
          <input id="q-name" name="name" required maxLength={255} autoComplete="name" className={inputCls} />
        </Field>
        <Field label={l.email} htmlFor="q-email" required>
          <input id="q-email" name="email" type="email" required maxLength={255} autoComplete="email" dir="ltr" className={inputCls} />
        </Field>
      </div>
      <Field label={l.phone} htmlFor="q-phone">
        <input id="q-phone" name="phone" type="tel" maxLength={50} autoComplete="tel" dir="ltr" className={inputCls} />
      </Field>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <Field label={l.projectType} htmlFor="q-type" required>
          <select id="q-type" name="project_type" required defaultValue="" className={inputCls}>
            <option value="" disabled>{l.choose}</option>
            {projectTypes.map((o) => <option key={o.value} value={o.value}>{label(o)}</option>)}
          </select>
        </Field>
        <Field label={l.budget} htmlFor="q-budget">
          <select id="q-budget" name="budget" defaultValue="" className={inputCls}>
            <option value="">{l.choose}</option>
            {budgets.map((o) => <option key={o.value} value={o.value}>{label(o)}</option>)}
          </select>
        </Field>
        <Field label={l.timeline} htmlFor="q-timeline">
          <select id="q-timeline" name="timeline" defaultValue="" className={inputCls}>
            <option value="">{l.choose}</option>
            {timelines.map((o) => <option key={o.value} value={o.value}>{label(o)}</option>)}
          </select>
        </Field>
      </div>
      <Field label={l.details} htmlFor="q-details" required>
        <textarea id="q-details" name="details" required maxLength={5000} rows={7} className={`${inputCls} resize-y`} />
      </Field>
      <SubmitButton sending={status === "sending"} label={l.send} sendingLabel={l.sending} />
      <FormStatus status={status} success={l.success} error={l.error} />
    </form>
  );
}
