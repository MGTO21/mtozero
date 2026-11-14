export type Tr = Record<string, string | undefined> | null | undefined;

export function pick(value: Tr, locale: string, fallback = "") {
  if (!value) return fallback;
  return value[locale] || value[locale === "ar" ? "en" : "ar"] || fallback;
}

// Project titles were entered as "Name | tagline" in the old admin.
export function splitTitle(title: string) {
  const [name, ...rest] = title.split("|");
  return { name: name.trim(), tagline: rest.join("|").trim() };
}

export function projectImages(image: unknown): string[] {
  if (Array.isArray(image)) return image.filter((x): x is string => typeof x === "string" && x.length > 0);
  if (typeof image === "string" && image) return [image];
  return [];
}

// Arabic month names with Western digits, per the site's numeral rule.
export function formatDate(iso: string | undefined, locale: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(locale === "ar" ? "ar-EG-u-nu-latn" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function excerpt(text: string, max = 180) {
  const clean = text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return clean.length > max ? `${clean.slice(0, max).replace(/\s+\S*$/, "")}…` : clean;
}
