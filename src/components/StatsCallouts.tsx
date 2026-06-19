import type { ProjectStat } from "../data/projects";

export function StatsCallouts({ stats }: { stats: ProjectStat[] }) {
  return (
    <div className="reveal mb-8 grid grid-cols-2 border border-[var(--color-tan)] md:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`flex flex-col items-center justify-center bg-[var(--color-cream)] px-4 py-10 text-center ${
            index > 0 ? "border-l border-[var(--color-tan)]" : ""
          } ${index >= 2 ? "border-t border-[var(--color-tan)] md:border-t-0" : ""}`}
        >
          <span className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-none text-[var(--color-dark)]">
            {stat.value}
          </span>
          <span className="label-accent mt-4 max-w-[12rem] text-[var(--color-tan)]">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
