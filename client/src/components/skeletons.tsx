const wrap = "mx-auto w-full max-w-[1280px] px-4 md:px-8";

function Bar({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-sm bg-muted ${className}`} />;
}

export function PageSkeleton() {
  return (
    <div aria-busy="true">
      <div className={`${wrap} pt-14 pb-10 md:pt-20 md:pb-14`}>
        <Bar className="h-4 w-24" />
        <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-3 lg:col-span-7">
            <Bar className="h-10 w-full" />
            <Bar className="h-10 w-2/3" />
          </div>
          <div className="space-y-2 lg:col-span-5 lg:self-end">
            <Bar className="h-4 w-full" />
            <Bar className="h-4 w-4/5" />
          </div>
        </div>
      </div>
      <div className={`${wrap} pb-20`}>
        <div className="grid grid-cols-1 gap-8 border-t border-foreground pt-10 lg:grid-cols-12">
          <Bar className="aspect-[16/8] w-full lg:col-span-8" />
          <div className="space-y-3 lg:col-span-4">
            <Bar className="h-6 w-3/4" />
            <Bar className="h-4 w-full" />
            <Bar className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
