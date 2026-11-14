const NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP || "").replace(/[^0-9]/g, "");

export function whatsappLink(message: string) {
  return NUMBER ? `https://wa.me/${NUMBER}?text=${encodeURIComponent(message)}` : null;
}
