import { BlogSkeleton, Skeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="min-h-[85vh] py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <Skeleton className="h-14 w-72 mx-auto mb-6" />
        <Skeleton className="h-5 w-96 max-w-full mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
