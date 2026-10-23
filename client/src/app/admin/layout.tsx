import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });

export const metadata: Metadata = {
  title: "MTOZERO Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      dir="rtl"
      lang="ar"
      className={`${cairo.variable} bg-background text-foreground min-h-screen`}
      style={{ fontFamily: "var(--font-cairo), sans-serif" }}
    >
      {children}
    </div>
  );
}
