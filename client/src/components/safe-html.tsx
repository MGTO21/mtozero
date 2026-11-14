"use client";

import { useEffect, useState } from "react";

export function SafeHtml({ html, className }: { html: string; className?: string }) {
  const [clean, setClean] = useState("");

  useEffect(() => {
    let active = true;
    import("dompurify").then(({ default: DOMPurify }) => {
      if (active) setClean(DOMPurify.sanitize(html));
    });
    return () => {
      active = false;
    };
  }, [html]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: clean }} />;
}
