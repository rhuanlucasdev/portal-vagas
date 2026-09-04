type JobCardSkeletonProps = {
  variant?: "featured" | "listing";
};

const pulse = "animate-pulse rounded bg-slate-200";

const JobCardSkeleton = ({ variant = "featured" }: JobCardSkeletonProps) => {
  if (variant === "listing") {
    return (
      <article className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className={`h-5 w-3/4 ${pulse}`} />
            <div className={`mt-2 h-4 w-1/3 ${pulse}`} />
            <div className={`mt-2 h-4 w-1/2 ${pulse}`} />
          </div>
          <div className={`h-12 w-12 shrink-0 ${pulse}`} />
        </div>
        <div className="mt-3 flex gap-2">
          <div className={`h-5 w-14 ${pulse}`} />
          <div className={`h-5 w-20 ${pulse}`} />
          <div className={`h-5 w-28 ${pulse}`} />
        </div>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className={`h-4 w-32 ${pulse}`} />
          <div className="flex gap-2">
            <div className={`h-9 w-20 ${pulse}`} />
            <div className={`h-9 w-28 ${pulse}`} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between md:p-5">
      <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:gap-4">
        <div className={`h-14 w-14 shrink-0 ${pulse}`} />
        <div className="min-w-0 flex-1">
          <div className={`h-5 w-2/3 ${pulse}`} />
          <div className={`mt-2 h-4 w-1/3 ${pulse}`} />
          <div className={`mt-3 h-4 w-1/2 ${pulse}`} />
        </div>
      </div>
      <div className="flex gap-2 md:w-40 md:shrink-0 md:flex-col">
        <div className={`h-9 flex-1 ${pulse}`} />
        <div className={`h-9 flex-1 ${pulse}`} />
      </div>
    </article>
  );
};

export default JobCardSkeleton;
