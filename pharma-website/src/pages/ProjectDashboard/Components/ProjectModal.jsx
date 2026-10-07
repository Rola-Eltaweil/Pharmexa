import React, { useEffect, useState } from "react";
import { Plus, Save, X } from "lucide-react";

const ProjectModal = ({
  project,
  projectRequests = [],
  teamMembers = [],
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Not Started",
    progress: 0,
    projectRequestId: "",
    assignedMembers: [],
  });

  // ---------------- LOAD DATA ----------------

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        description: project.description || "",
        status: project.status || "Not Started",
        progress: project.progress || 0,
        projectRequestId:
          typeof project.projectRequestId === "object"
            ? project.projectRequestId?._id
            : project.projectRequestId || "",
        assignedMembers: Array.isArray(project.assignedMembers)
          ? project.assignedMembers.map((member) =>
              typeof member === "object" ? member._id : member,
            )
          : [],
      });
    } else {
      setFormData({
        name: "",
        description: "",
        status: "Not Started",
        progress: 0,
        projectRequestId: "",
        assignedMembers: [],
      });
    }
  }, [project]);

  // ---------------- HANDLE INPUT ----------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------- SELECT PROJECT REQUEST ----------------

  const handleRequestChange = (e) => {
    const requestId = e.target.value;

    const selectedRequest = projectRequests.find(
      (request) => request._id === requestId,
    );

    setFormData((prev) => ({
      ...prev,
      projectRequestId: requestId,
      name: selectedRequest?.projectName || "",
      description: selectedRequest?.description || "",
    }));
  };

  // ---------------- SELECT TEAM MEMBERS ----------------

  const handleTeamMembersChange = (e) => {
    const selectedMembers = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );

    setFormData((prev) => ({
      ...prev,
      assignedMembers: selectedMembers,
    }));
  };

  // ---------------- SUBMIT ----------------

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!project) {
      const data = {
        projectRequestId: formData.projectRequestId,
        status: formData.status,
        progress: Number(formData.progress),
        assignedMembers: formData.assignedMembers,
      };

      onSubmit(data);
      return;
    }

    const data = {
      name: formData.name,
      description: formData.description,
      status: formData.status,
      progress: Number(formData.progress),
      assignedMembers: formData.assignedMembers,
    };

    onSubmit(data);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-slate-900/50 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* MODAL */}
      <div className="flex w-full max-w-2xl max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-5">
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-slate-900">
              {project ? "Edit Project" : "Create Project"}
            </h2>

            <p className="mt-1 truncate text-sm text-slate-500">
              {project
                ? "Update project information."
                : "Create a project from an approved client request."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* SCROLLABLE FORM */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-6"
        >
          <div className="space-y-5">
            {/* APPROVED REQUEST */}
            {!project && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Approved Project Request
                </label>

                <select
                  name="projectRequestId"
                  value={formData.projectRequestId}
                  onChange={handleRequestChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select an approved request</option>

                  {projectRequests.map((request) => (
                    <option key={request._id} value={request._id}>
                      {request.projectName} -{" "}
                      {request.clientId?.name || "Unknown Client"}
                    </option>
                  ))}
                </select>

                {projectRequests.length === 0 && (
                  <p className="mt-2 text-xs text-red-500">
                    No approved project requests available.
                  </p>
                )}
              </div>
            )}

            {/* PROJECT NAME */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Project Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                readOnly={!project}
                placeholder="Project name"
                className={`w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                  !project ? "bg-slate-50" : ""
                }`}
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                readOnly={!project}
                rows={4}
                placeholder="Describe the project..."
                className={`w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
                  !project ? "bg-slate-50" : ""
                }`}
              />
            </div>

            {/* STATUS + PROGRESS */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Progress (%)
                </label>

                <input
                  type="number"
                  name="progress"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* TEAM MEMBERS */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Team Members
              </label>

              <select
                multiple
                value={formData.assignedMembers}
                onChange={handleTeamMembersChange}
                className="h-40 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                {teamMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name} - {member.email}
                  </option>
                ))}
              </select>

              {teamMembers.length === 0 && (
                <p className="mt-2 text-xs text-red-500">
                  No team members available.
                </p>
              )}

              {teamMembers.length > 0 && (
                <p className="mt-2 text-xs text-slate-400">
                  Hold Ctrl and select multiple team members.
                </p>
              )}
            </div>

            {/* BUTTONS */}
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  !project &&
                  (!formData.projectRequestId || projectRequests.length === 0)
                }
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {project ? <Save size={17} /> : <Plus size={17} />}

                {project ? "Save Changes" : "Create Project"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
