"use client";
/* eslint-disable @typescript-eslint/no-explicit-any -- Firestore documents are schemaless here */

import { useCallback, useEffect, useState } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { upload } from "@vercel/blob/client";
import { auth, db } from "@/lib/firebase-client";
import { ADMIN_EMAILS } from "@/lib/firebase-config";
import {
  COLLECTIONS,
  INBOXES,
  QUOTE_STATUSES,
  emptyValue,
  storageSrc,
  type CollectionDef,
  type Field,
} from "./schema";

type Row = Record<string, any> & { id: string };

const input =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mtozero-cyan/40";
const btn = "rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50";
const primary = `${btn} bg-foreground text-background hover:opacity-90`;
const ghost = `${btn} border border-border hover:bg-muted`;

function isAdmin(user: User | null) {
  return !!user?.email && user.emailVerified && ADMIN_EMAILS.includes(user.email.toLowerCase());
}

async function revalidateSite() {
  const token = await auth.currentUser?.getIdToken();
  await fetch("/api/revalidate", { method: "POST", headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
}

function displayTitle(value: unknown): string {
  if (value && typeof value === "object") {
    const v = value as Record<string, string>;
    return v.ar || v.en || "—";
  }
  return String(value ?? "—");
}

function toDate(value: any): Date | null {
  if (!value) return null;
  if (typeof value.toDate === "function") return value.toDate();
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
}

export function AdminApp() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [section, setSection] = useState<string>(COLLECTIONS[0].id);

  useEffect(() => onAuthStateChanged(auth, (u) => (setUser(u), setReady(true))), []);

  if (!ready) return <div className="p-10 text-center text-muted-foreground">جارٍ التحميل...</div>;

  if (!user || !isAdmin(user)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center space-y-5">
          <h1 className="text-2xl font-black">لوحة تحكم MTOZERO</h1>
          {user && <p className="text-sm text-destructive">الحساب {user.email} غير مصرّح له.</p>}
          <button
            className={`${primary} w-full`}
            onClick={() => (user ? signOut(auth) : signInWithPopup(auth, new GoogleAuthProvider()))}
          >
            {user ? "تسجيل الخروج" : "تسجيل الدخول بحساب Google"}
          </button>
        </div>
      </div>
    );
  }

  const def = COLLECTIONS.find((c) => c.id === section);
  const inbox = INBOXES.find((c) => c.id === section);

  return (
    <div className="min-h-screen md:flex">
      <aside className="md:w-60 shrink-0 border-b md:border-b-0 md:border-l border-border bg-card p-4 space-y-1">
        <div className="mb-4 px-2 font-black text-lg">MTOZERO</div>
        {[...COLLECTIONS, ...INBOXES].map((c) => (
          <button
            key={c.id}
            onClick={() => setSection(c.id)}
            className={`block w-full rounded-lg px-3 py-2 text-right text-sm ${section === c.id ? "bg-muted font-bold" : "hover:bg-muted/60"}`}
          >
            {c.label}
          </button>
        ))}
        <div className="pt-4 border-t border-border mt-4 px-2 text-xs text-muted-foreground break-all">{user.email}</div>
        <button className={`${ghost} w-full mt-2`} onClick={() => signOut(auth)}>
          تسجيل الخروج
        </button>
      </aside>
      <main className="flex-1 p-4 md:p-8 min-w-0">
        {def && <CollectionView key={def.id} def={def} />}
        {inbox && <InboxView key={inbox.id} id={inbox.id} label={inbox.label} fields={[...inbox.fields]} />}
      </main>
    </div>
  );
}

function CollectionView({ def }: { def: CollectionDef }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [editing, setEditing] = useState<Row | "new" | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, def.id));
      const list = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
      list.sort((a: Row, b: Row) => String(b.created_at ?? "").localeCompare(String(a.created_at ?? "")));
      setRows(list);
    } catch (e) {
      setError((e as Error).message);
    }
  }, [def.id]);

  useEffect(() => {
    load();
  }, [load]);

  if (editing) {
    return (
      <Editor
        def={def}
        row={editing === "new" ? null : editing}
        onDone={async (changed) => {
          setEditing(null);
          if (changed) await load();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-black">{def.label}</h1>
        <button className={primary} onClick={() => setEditing("new")}>
          + إضافة
        </button>
      </div>
      {error && <p className="text-destructive text-sm">{error}</p>}
      {!rows ? (
        <p className="text-muted-foreground">جارٍ التحميل...</p>
      ) : rows.length === 0 ? (
        <p className="text-muted-foreground">لا توجد عناصر.</p>
      ) : (
        <div className="rounded-2xl border border-border bg-card divide-y divide-border">
          {rows.map((row) => (
            <div key={row.id} className="flex items-center gap-3 p-4">
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${row[def.flag] ? "bg-green-500" : "bg-muted-foreground/40"}`}
                title={row[def.flag] ? "ظاهر" : "مخفي"}
              />
              <span className="flex-1 truncate font-medium">{displayTitle(row[def.titleField])}</span>
              <button className={ghost} onClick={() => setEditing(row)}>
                تعديل
              </button>
              <button
                className={`${ghost} text-destructive`}
                onClick={async () => {
                  if (!window.confirm("حذف هذا العنصر نهائياً؟")) return;
                  await deleteDoc(doc(db, def.id, row.id));
                  await revalidateSite();
                  await load();
                }}
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Editor({ def, row, onDone }: { def: CollectionDef; row: Row | null; onDone: (changed: boolean) => void }) {
  const [values, setValues] = useState<Record<string, any>>(() => {
    const init: Record<string, any> = {};
    for (const f of def.fields) init[f.name] = row?.[f.name] ?? emptyValue(f);
    return init;
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (name: string, value: unknown) => setValues((v) => ({ ...v, [name]: value }));

  async function save() {
    for (const f of def.fields) {
      const v = values[f.name];
      const empty = f.type === "tr" ? !v?.ar && !v?.en : v === "" || v == null;
      if (f.required && empty) return setError(`الحقل "${f.label}" مطلوب`);
    }
    setSaving(true);
    setError("");
    try {
      const now = new Date().toISOString();
      if (row) await updateDoc(doc(db, def.id, row.id), { ...values, updated_at: now });
      else await addDoc(collection(db, def.id), { ...values, created_at: now, updated_at: now });
      await revalidateSite();
      onDone(true);
    } catch (e) {
      setError((e as Error).message);
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <h1 className="text-2xl font-black">
        {row ? "تعديل" : "إضافة"} — {def.label}
      </h1>
      {def.fields.map((f) => (
        <FieldInput key={f.name} field={f} value={values[f.name]} onChange={(v) => set(f.name, v)} />
      ))}
      {error && <p className="text-destructive text-sm">{error}</p>}
      <div className="flex gap-3 sticky bottom-0 bg-background py-4">
        <button className={primary} disabled={saving} onClick={save}>
          {saving ? "جارٍ الحفظ..." : "حفظ"}
        </button>
        <button className={ghost} disabled={saving} onClick={() => onDone(false)}>
          إلغاء
        </button>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <div className="mb-1.5 text-sm font-semibold">{children}</div>;
}

function FieldInput({ field, value, onChange }: { field: Field; value: any; onChange: (v: any) => void }) {
  const label = (
    <Label>
      {field.label}
      {field.required && <span className="text-destructive"> *</span>}
    </Label>
  );

  switch (field.type) {
    case "text":
      return (
        <div>
          {label}
          <input className={input} dir="auto" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
        </div>
      );
    case "textarea":
      return (
        <div>
          {label}
          <textarea className={input} rows={5} dir="auto" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
        </div>
      );
    case "number":
      return (
        <div>
          {label}
          <input
            type="number"
            className={`${input} max-w-[10rem]`}
            dir="ltr"
            value={value ?? 0}
            onChange={(e) => onChange(Number(e.target.value))}
          />
        </div>
      );
    case "bool":
      return (
        <label className="flex items-center gap-3 text-sm font-semibold">
          <input type="checkbox" className="h-4 w-4" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
          {field.label}
        </label>
      );
    case "tr":
    case "trText": {
      const v = value && typeof value === "object" ? value : { ar: "", en: "" };
      const Tag = field.type === "tr" ? "input" : "textarea";
      return (
        <div>
          {label}
          <div className="grid gap-3 md:grid-cols-2">
            {(["ar", "en"] as const).map((lang) => (
              <div key={lang}>
                <div className="mb-1 text-xs text-muted-foreground">{lang === "ar" ? "عربي" : "English"}</div>
                <Tag
                  className={input}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                  {...(Tag === "textarea" ? { rows: 6 } : {})}
                  value={v[lang] ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    onChange({ ...v, [lang]: e.target.value })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    case "trItems": {
      const v = value && typeof value === "object" ? value : { ar: [], en: [] };
      const lines = (lang: "ar" | "en") =>
        (Array.isArray(v[lang]) ? v[lang] : [])
          .map((x: string | { item: string }) => (typeof x === "string" ? x : x?.item ?? ""))
          .join("\n");
      return (
        <div>
          {label}
          <div className="mb-2 text-xs text-muted-foreground">ميزة واحدة في كل سطر</div>
          <div className="grid gap-3 md:grid-cols-2">
            {(["ar", "en"] as const).map((lang) => (
              <textarea
                key={lang}
                className={input}
                rows={5}
                dir={lang === "ar" ? "rtl" : "ltr"}
                placeholder={lang === "ar" ? "عربي" : "English"}
                defaultValue={lines(lang)}
                onChange={(e) =>
                  onChange({
                    ...v,
                    [lang]: e.target.value
                      .split("\n")
                      .map((s) => s.trim())
                      .filter(Boolean)
                      .map((item) => ({ item })),
                  })
                }
              />
            ))}
          </div>
        </div>
      );
    }
    case "tags":
      return (
        <div>
          {label}
          <input
            className={input}
            dir="ltr"
            placeholder="Laravel, Next.js, Flutter"
            defaultValue={(Array.isArray(value) ? value : []).join(", ")}
            onChange={(e) =>
              onChange(
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean),
              )
            }
          />
        </div>
      );
    case "image":
    case "images":
      return (
        <div>
          {label}
          <ImageInput
            multiple={field.type === "images"}
            folder={field.folder ?? "blog-images"}
            value={field.type === "images" ? (Array.isArray(value) ? value : value ? [value] : []) : value ? [value] : []}
            onChange={(list) => onChange(field.type === "images" ? list : list[0] ?? null)}
          />
        </div>
      );
  }
}

function ImageInput({
  value,
  onChange,
  multiple,
  folder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  multiple: boolean;
  folder: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setError("");
    try {
      const token = await auth.currentUser!.getIdToken();
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        const blob = await upload(`${folder}/${file.name}`, file, {
          access: "public",
          handleUploadUrl: "/api/upload",
          clientPayload: token,
        });
        uploaded.push(blob.url);
      }
      onChange(multiple ? [...value, ...uploaded] : uploaded.slice(0, 1));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  const move = (i: number, d: number) => {
    const next = [...value];
    const j = i + d;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {value.map((src, i) => (
            <div key={src + i} className="relative rounded-lg border border-border overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={storageSrc(src)} alt="" className="aspect-square w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 flex justify-between bg-background/80 text-xs">
                {multiple && (
                  <button type="button" className="px-2 py-1" onClick={() => move(i, -1)}>
                    →
                  </button>
                )}
                <button
                  type="button"
                  className="px-2 py-1 text-destructive"
                  onClick={() => onChange(value.filter((_, k) => k !== i))}
                >
                  إزالة
                </button>
                {multiple && (
                  <button type="button" className="px-2 py-1" onClick={() => move(i, 1)}>
                    ←
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      <label className={`${ghost} inline-block cursor-pointer`}>
        {busy ? "جارٍ الرفع..." : multiple ? "رفع صور" : "رفع صورة"}
        <input
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          disabled={busy}
          onChange={(e) => onFiles(e.target.files)}
        />
      </label>
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
}

function InboxView({ id, label, fields }: { id: string; label: string; fields: string[] }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(collection(db, id));
      const list = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
      list.sort((a: Row, b: Row) => (toDate(b.created_at)?.getTime() ?? 0) - (toDate(a.created_at)?.getTime() ?? 0));
      setRows(list);
    } catch (e) {
      setError((e as Error).message);
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black">{label}</h1>
      {error && <p className="text-destructive text-sm">{error}</p>}
      {!rows ? (
        <p className="text-muted-foreground">جارٍ التحميل...</p>
      ) : rows.length === 0 ? (
        <p className="text-muted-foreground">لا توجد رسائل.</p>
      ) : (
        rows.map((row) => (
          <div key={row.id} className="rounded-2xl border border-border bg-card p-5 space-y-2 text-sm">
            <div className="text-xs text-muted-foreground" dir="ltr">
              {toDate(row.created_at)?.toLocaleString("en-GB") ?? ""}
            </div>
            {fields
              .filter((f) => f !== "status")
              .map((f) =>
                row[f] ? (
                  <div key={f}>
                    <span className="font-semibold">{f}: </span>
                    <span className="whitespace-pre-wrap break-words" dir="auto">
                      {String(row[f])}
                    </span>
                  </div>
                ) : null,
              )}
            <div className="flex items-center gap-3 pt-2">
              {fields.includes("status") && (
                <select
                  className={`${input} max-w-[10rem]`}
                  value={row.status ?? "new"}
                  onChange={async (e) => {
                    await updateDoc(doc(db, id, row.id), { status: e.target.value });
                    await load();
                  }}
                >
                  {QUOTE_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              )}
              <button
                className={`${ghost} text-destructive`}
                onClick={async () => {
                  if (!window.confirm("حذف نهائياً؟")) return;
                  await deleteDoc(doc(db, id, row.id));
                  await load();
                }}
              >
                حذف
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
