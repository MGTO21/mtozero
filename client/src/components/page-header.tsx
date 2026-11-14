export const pageWrap = "mx-auto w-full max-w-[1280px] px-4 md:px-8";

export function PageHeader({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <header className={`${pageWrap} pt-14 pb-10 md:pt-20 md:pb-14`}>
      <p className="text-sm font-medium text-brand">{eyebrow}</p>
      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
        <h1 className="font-display text-[2.1rem] font-extrabold leading-[1.25] text-foreground sm:text-5xl lg:col-span-7">
          {title}
        </h1>
        {lede && (
          <p className="max-w-xl text-lg font-light leading-relaxed text-muted-foreground lg:col-span-5 lg:self-end">{lede}</p>
        )}
      </div>
    </header>
  );
}
