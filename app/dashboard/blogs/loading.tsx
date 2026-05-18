function BlogsLoadingCard() {
  return (
    <div className="rounded-[28px] border border-zinc-200/70 bg-white/85 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] backdrop-blur">
      <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.28em] text-zinc-400">
        <div className="dashboard-skeleton h-7 w-40 rounded-full" />
        <div className="dashboard-skeleton h-4 w-24 rounded-full" />
      </div>
      <div className="mt-6 space-y-4">
        <div className="dashboard-skeleton h-9 w-3/4" />
        <div className="space-y-2">
          <div className="dashboard-skeleton h-4 w-full" />
          <div className="dashboard-skeleton h-4 w-5/6" />
          <div className="dashboard-skeleton h-4 w-2/3" />
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <div className="dashboard-skeleton h-10 w-24 rounded-full" />
        <div className="dashboard-skeleton h-10 w-24 rounded-full" />
        <div className="dashboard-skeleton h-10 w-20 rounded-full" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.12),_transparent_24%),radial-gradient(circle_at_top_left,_rgba(244,114,182,0.18),_transparent_24%),#fafaf9] p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <div className="dashboard-skeleton h-4 w-24 rounded-full" />
            <div className="dashboard-skeleton h-12 w-56" />
            <div className="space-y-2">
              <div className="dashboard-skeleton h-4 w-[34rem] max-w-full" />
              <div className="dashboard-skeleton h-4 w-[28rem] max-w-[85%]" />
            </div>
          </div>
          <div className="dashboard-skeleton h-11 w-32 rounded-full" />
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <BlogsLoadingCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
