export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "bool"
  | "tr" // { ar, en } short text
  | "trText" // { ar, en } long text / HTML
  | "trItems" // { ar: [{item}], en: [{item}] }
  | "tags" // string[]
  | "image" // single image path or URL
  | "images"; // image path/URL array

export interface Field {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  folder?: "blog-images" | "portfolio-images";
}

export interface CollectionDef {
  id: string;
  label: string;
  titleField: string;
  flag: string;
  fields: Field[];
}

export const COLLECTIONS: CollectionDef[] = [
  {
    id: "services",
    label: "الخدمات",
    titleField: "title",
    flag: "is_active",
    fields: [
      { name: "title", label: "العنوان", type: "tr", required: true },
      { name: "description", label: "الوصف المختصر", type: "trText" },
      { name: "icon", label: "الأيقونة (lucide)", type: "text" },
      { name: "content", label: "المحتوى التفصيلي (HTML)", type: "trText" },
      { name: "features", label: "المميزات", type: "trItems" },
      { name: "is_active", label: "مفعّلة", type: "bool" },
    ],
  },
  {
    id: "portfolio_projects",
    label: "أعمالنا",
    titleField: "title",
    flag: "is_published",
    fields: [
      { name: "title", label: "العنوان", type: "tr", required: true },
      { name: "description", label: "الوصف", type: "trText" },
      { name: "image", label: "الصور", type: "images", folder: "portfolio-images" },
      { name: "url", label: "رابط المشروع", type: "text" },
      { name: "client_name", label: "العميل", type: "text" },
      { name: "duration", label: "المدة", type: "text" },
      { name: "challenge", label: "التحدي", type: "trText" },
      { name: "solution", label: "الحل", type: "trText" },
      { name: "tech_stack", label: "التقنيات", type: "tags" },
      { name: "featured", label: "مميز", type: "bool" },
      { name: "is_published", label: "منشور", type: "bool" },
    ],
  },
  {
    id: "saas_products",
    label: "منتجات SaaS",
    titleField: "name",
    flag: "is_active",
    fields: [
      { name: "name", label: "الاسم", type: "tr", required: true },
      { name: "slug", label: "المعرّف في الرابط (slug)", type: "text", required: true },
      { name: "description", label: "الوصف", type: "trText" },
      { name: "pricing", label: "السعر", type: "tr" },
      { name: "features", label: "المميزات", type: "trItems" },
      { name: "url", label: "رابط المنتج", type: "text" },
      { name: "is_active", label: "مفعّل", type: "bool" },
    ],
  },
  {
    id: "blog_posts",
    label: "المدونة",
    titleField: "title",
    flag: "is_published",
    fields: [
      { name: "title", label: "العنوان", type: "tr", required: true },
      { name: "slug", label: "المعرّف في الرابط (slug)", type: "text", required: true },
      { name: "content", label: "المحتوى", type: "trText" },
      { name: "image", label: "الصورة", type: "image", folder: "blog-images" },
      { name: "is_published", label: "منشور", type: "bool" },
    ],
  },
  {
    id: "testimonials",
    label: "آراء العملاء",
    titleField: "name",
    flag: "is_published",
    fields: [
      { name: "name", label: "الاسم", type: "text", required: true },
      { name: "company", label: "الشركة", type: "text" },
      { name: "role", label: "المنصب", type: "tr" },
      { name: "content", label: "الرأي", type: "trText" },
      { name: "rating", label: "التقييم (1-5)", type: "number" },
      { name: "sort", label: "الترتيب", type: "number" },
      { name: "is_published", label: "منشور", type: "bool" },
    ],
  },
  {
    id: "faqs",
    label: "الأسئلة الشائعة",
    titleField: "question",
    flag: "is_published",
    fields: [
      { name: "question", label: "السؤال", type: "tr", required: true },
      { name: "answer", label: "الإجابة", type: "trText" },
      { name: "sort", label: "الترتيب", type: "number" },
      { name: "is_published", label: "منشور", type: "bool" },
    ],
  },
  {
    id: "stats",
    label: "الإحصائيات",
    titleField: "label",
    flag: "is_published",
    fields: [
      { name: "label", label: "العنوان", type: "tr", required: true },
      { name: "value", label: "القيمة", type: "text", required: true },
      { name: "suffix", label: "اللاحقة (+ أو %)", type: "text" },
      { name: "sort", label: "الترتيب", type: "number" },
      { name: "is_published", label: "منشور", type: "bool" },
    ],
  },
  {
    id: "social_links",
    label: "روابط التواصل",
    titleField: "platform",
    flag: "is_active",
    fields: [
      { name: "platform", label: "المنصة", type: "tr", required: true },
      { name: "url", label: "الرابط", type: "text", required: true },
      { name: "icon", label: "الأيقونة", type: "text" },
      { name: "sort_order", label: "الترتيب", type: "number" },
      { name: "is_active", label: "مفعّل", type: "bool" },
    ],
  },
];

export const INBOXES = [
  {
    id: "quote_requests",
    label: "طلبات عروض الأسعار",
    fields: ["name", "email", "phone", "project_type", "budget", "timeline", "details", "status"],
  },
  { id: "contact_messages", label: "رسائل التواصل", fields: ["name", "email", "subject", "message"] },
] as const;

export const QUOTE_STATUSES = ["new", "reviewed", "quoted", "closed"];

export function emptyValue(field: Field): unknown {
  switch (field.type) {
    case "bool":
      return true;
    case "number":
      return 0;
    case "tr":
    case "trText":
      return { ar: "", en: "" };
    case "trItems":
      return { ar: [], en: [] };
    case "tags":
    case "images":
      return [];
    case "image":
      return null;
    default:
      return "";
  }
}

export function storageSrc(path: string) {
  return path.startsWith("http") ? path : `/storage/${path}`;
}
