import React from "react";

import {
  FolderKanban,
  Clock3,
  CheckCircle2,
  CircleDashed,
  PauseCircle,
  ArrowUpRight,
} from "lucide-react";

const StatCards = ({ stats }) => {
  const cards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: FolderKanban,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: Clock3,
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      iconStyle: "bg-green-50 text-green-600",
    },
    {
      title: "Not Started",
      value: stats.notStarted,
      icon: CircleDashed,
      iconStyle: "bg-slate-100 text-slate-500",
    },
    {
      title: "On Hold",
      value: stats.onHold,
      icon: PauseCircle,
      iconStyle: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-4 flex items-center justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconStyle}`}
              >
                <Icon size={21} />
              </div>

              <ArrowUpRight size={18} className="text-slate-400" />
            </div>

            <p className="text-sm text-slate-500">{card.title}</p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              {card.value}
            </h2>
          </div>
        );
      })}
    </div>
  );
};

export default StatCards;
