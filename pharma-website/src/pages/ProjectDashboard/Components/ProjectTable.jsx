import React from "react";

import { FolderKanban, Pencil, Trash2 } from "lucide-react";

const ProjectTable = ({ projects, role, onEdit, onDelete }) => {
  const canEdit =
    role === "admin" || role === "teammember" || role === "teamMember";

  const canDelete = role === "admin";

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-50 text-green-700";

      case "in progress":
        return "bg-blue-50 text-blue-700";

      case "on hold":
        return "bg-amber-50 text-amber-700";

      case "not started":
        return "bg-slate-100 text-slate-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">Projects</h2>

        <p className="mt-1 text-sm text-slate-500">
          Overview of all your current projects.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Project
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Client
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Progress
              </th>

              {canEdit && (
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <tr
                key={project._id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
              >
                {/* PROJECT */}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <FolderKanban size={18} className="text-blue-600" />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-800">
                        {project.name}
                      </p>

                      <p className="mt-1 max-w-[250px] truncate text-xs text-slate-400">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </td>

                {/* CLIENT */}

                <td className="px-6 py-5">
                  <p className="text-sm font-medium text-slate-700">
                    {project.clientId?.name || "—"}
                  </p>

                  <p className="text-xs text-slate-400">
                    {project.clientId?.email || ""}
                  </p>
                </td>

                {/* STATUS */}

                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                      project.status,
                    )}`}
                  >
                    {project.status}
                  </span>
                </td>

                {/* PROGRESS */}

                <td className="px-6 py-5">
                  <div className="w-44">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Progress</span>

                      <span className="text-xs font-bold text-slate-700">
                        {project.progress}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{
                          width: `${Math.min(
                            Math.max(project.progress, 0),
                            100,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                {/* ACTIONS */}

                {canEdit && (
                  <td className="px-6 py-5">
                    <div className="flex justify-end gap-2">
                      {/* EDIT */}

                      <button
                        onClick={() => onEdit(project)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </button>

                      {/* DELETE */}

                      {canDelete && (
                        <button
                          onClick={() => onDelete(project._id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <div className="px-6 py-16 text-center">
            <FolderKanban size={40} className="mx-auto mb-3 text-slate-300" />

            <p className="font-medium text-slate-600">No projects found</p>

            <p className="mt-1 text-sm text-slate-400">
              Your projects will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectTable;
