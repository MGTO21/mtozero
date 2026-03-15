import React from "react";

export const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted/50 ${className}`}
      {...props}
    />
  );
};

export const CardSkeleton = () => (
  <div className="p-8 rounded-2xl bg-card border border-border/50 space-y-4">
    <Skeleton className="w-14 h-14 rounded-xl" />
    <Skeleton className="h-8 w-3/4" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
    <Skeleton className="h-4 w-1/4 mt-8" />
  </div>
);

export const PortfolioSkeleton = () => (
  <div className="rounded-3xl overflow-hidden bg-card border border-border">
    <Skeleton className="w-full h-64" />
    <div className="p-8 space-y-4">
      <Skeleton className="h-8 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  </div>
);

export const BlogSkeleton = () => (
  <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-card border border-border">
    <Skeleton className="aspect-[16/9] w-full" />
    <div className="p-6 space-y-4">
      <div className="flex gap-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-20" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
      <Skeleton className="h-4 w-1/4 mt-4" />
    </div>
  </div>
);
