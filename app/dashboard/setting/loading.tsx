function SettingPanelSkeleton() {
  return (
    <div className="rounded-3xl border border-zinc-200/80 bg-white/90 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
      <div className="space-y-3">
        <div className="dashboard-skeleton h-6 w-36" />
        <div className="dashboard-skeleton h-4 w-64 max-w-full" />
      </div>
      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <div className="dashboard-skeleton h-4 w-24" />
          <div className="dashboard-skeleton h-10 w-full rounded-2xl" />
        </div>
        <div className="space-y-2">
          <div className="dashboard-skeleton h-4 w-28" />
          <div className="dashboard-skeleton h-10 w-full rounded-2xl" />
        </div>
        <div className="dashboard-skeleton h-10 w-32 rounded-full" />
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-3">
          <div className="dashboard-skeleton h-10 w-40" />
          <div className="dashboard-skeleton h-4 w-72 max-w-full" />
        </div>

        <SettingPanelSkeleton />
        <SettingPanelSkeleton />
        <SettingPanelSkeleton />
      </div>
    </div>
  );
}
