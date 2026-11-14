import { Loader2 } from "lucide-react";

export const inputCls =
  "w-full rounded border border-border bg-card px-3.5 py-3 text-[15px] text-foreground outline-none transition-colors duration-150 placeholder:text-muted-foreground/70 focus:border-foreground";

export function Field({ label, htmlFor, required, children }: { label: string; htmlFor: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      {children}
    </div>
  );
}

export function SubmitButton({ sending, label, sendingLabel }: { sending: boolean; label: string; sendingLabel: string }) {
  return (
    <button
      type="submit"
      disabled={sending}
      className="inline-flex items-center justify-center gap-2 rounded bg-foreground px-6 py-3 text-[15px] font-semibold text-background transition-colors duration-150 hover:bg-brand disabled:opacity-60"
    >
      {sending && <Loader2 className="h-4 w-4 animate-spin" />}
      {sending ? sendingLabel : label}
    </button>
  );
}

export function FormStatus({ status, success, error }: { status: string; success: string; error: string }) {
  if (status === "success")
    return (
      <p role="status" className="border-s-2 border-brand ps-3 text-[15px] text-foreground">
        {success}
      </p>
    );
  if (status === "error")
    return (
      <p role="alert" className="border-s-2 border-destructive ps-3 text-[15px] text-destructive">
        {error}
      </p>
    );
  return null;
}
