"use client";

import { useState } from "react";
import { Field, FormStatus, SubmitButton, inputCls } from "@/components/form-fields";

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
      const res = await fetch("/api/contact", {
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

  const l = {
    name: isRtl ? "الاسم" : "Name",
    email: isRtl ? "البريد الإلكتروني" : "Email",
    subject: isRtl ? "الموضوع" : "Subject",
    message: isRtl ? "رسالتك" : "Your message",
    send: isRtl ? "إرسال الرسالة" : "Send message",
    sending: isRtl ? "جارٍ الإرسال…" : "Sending…",
    success: isRtl ? "وصلت رسالتك. سنرد على بريدك خلال 24 ساعة." : "Message received. We'll reply to your email within 24 hours.",
    error: isRtl ? "تعذّر الإرسال. جرّب مرة أخرى أو راسلنا على واتساب." : "Couldn't send. Try again or message us on WhatsApp.",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field label={l.name} htmlFor="c-name" required>
          <input id="c-name" name="name" required maxLength={100} autoComplete="name" className={inputCls} />
        </Field>
        <Field label={l.email} htmlFor="c-email" required>
          <input id="c-email" name="email" type="email" required maxLength={150} autoComplete="email" dir="ltr" className={inputCls} />
        </Field>
      </div>
      <Field label={l.subject} htmlFor="c-subject">
        <input id="c-subject" name="subject" maxLength={150} className={inputCls} />
      </Field>
      <Field label={l.message} htmlFor="c-message" required>
        <textarea id="c-message" name="message" required maxLength={2000} rows={6} className={`${inputCls} resize-y`} />
      </Field>
      <SubmitButton sending={status === "sending"} label={l.send} sendingLabel={l.sending} />
      <FormStatus status={status} success={l.success} error={l.error} />
    </form>
  );
}
