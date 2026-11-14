"use client";

import { useState } from "react";

export function ShareButton({ title, label, copiedLabel }: { title: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // user cancelled the share sheet
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="rounded border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
