import React, { useMemo } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

const ProjectCharts = ({ stats, projects }) => {
  const doughnutData = useMemo(
    () => ({
      labels: ["In Progress", "Completed", "Not Started", "On Hold"],

      datasets: [
        {
          data: [
            stats.inProgress,
            stats.completed,
            stats.notStarted,
            stats.onHold,
          ],

          backgroundColor: ["#2563eb", "#16a34a", "#94a3b8", "#f59e0b"],

          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    }),
    [stats],
  );

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 18,
        },
      },
    },
  };

  const barData = {
    labels: projects.map((project) => project.name),

    datasets: [
      {
        label: "Progress",

        data: projects.map((project) => project.progress),

        backgroundColor: "#2563eb",

        borderRadius: 8,

        borderSkipped: false,

        barThickness: 28,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        max: 100,

        ticks: {
          callback: (value) => `${value}%`,
        },

        grid: {
          color: "#e2e8f0",
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-5">
      {/* DOUGHNUT */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Project Status
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Distribution of your projects by status.
          </p>
        </div>

        <div className="relative h-[320px]">
          <Doughnut data={doughnutData} options={doughnutOptions} />

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pb-8">
            <span className="text-4xl font-bold text-slate-900">
              {stats.totalProjects}
            </span>

            <span className="text-sm text-slate-500">Total Projects</span>
          </div>
        </div>
      </div>

      {/* BAR */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-3">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Project Progress
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Track the progress of each project.
          </p>
        </div>

        <div className="h-[320px]">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default ProjectCharts;
