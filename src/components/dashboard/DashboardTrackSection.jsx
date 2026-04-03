import DashboardModuleCard from "@/components/dashboard/DashboardModuleCard";

export default function DashboardTrackSection({
  track,
  modules,
  progress,
  firstAvailableId,
  onSelect,
}) {
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center gap-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold"
          style={{ background: `${track.color}20`, color: track.color }}
        >
          {track.icon}
        </div>
        <h3 className="text-secondary text-xl font-bold">{track.name}</h3>
      </div>
      <div className="relative pl-10 sm:pl-12">
        <div className="border-outline-variant/70 absolute bottom-4 left-[16px] top-4 w-0.5 border-l-2 border-dashed sm:left-[19px]" />
        <div className="flex flex-col gap-6">
          {modules.map((mod) => {
            const hasContent = mod.lessons.length > 0;
            const completed = progress[mod.id]?.completed;
            const isActive = mod.id === firstAvailableId;

            return (
              <DashboardModuleCard
                key={mod.id}
                mod={mod}
                completed={completed}
                hasContent={hasContent}
                isActive={isActive}
                onSelect={onSelect}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
