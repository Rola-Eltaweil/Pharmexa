import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getData, editData } from "../../utils/apiSummary";
import { Endpoint } from "../../utils/routes";

const TeamMemberDashboard = () => {
  const user = useSelector((state) => state.user.userDetails);

  const [projects, setProjects] = useState([]);

  const [stats, setStats] = useState({
    totalProjects: 0,
    inProgress: 0,
    completed: 0,
    notStarted: 0,
    onHold: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [formData, setFormData] = useState({
    status: "Not Started",
    progress: 0,
  });

  const [loading, setLoading] = useState(false);

  const getMyProjects = async () => {
    try {
      const response = await getData(Endpoint.projects.url);

      setProjects(response.data.projects || []);
    } catch (error) {
      console.log(error);
    }
  };

  const getMyStats = async () => {
    try {
      const response = await getData(Endpoint.projectStats.url);

      setStats(
        response.data.stats || {
          totalProjects: 0,
          inProgress: 0,
          completed: 0,
          notStarted: 0,
          onHold: 0,
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMyProjects();
    getMyStats();
  }, []);

  // Open Update Modal
  const handleOpenUpdate = (project) => {
    setSelectedProject(project);

    setFormData({
      status: project.status || "Not Started",
      progress: project.progress ?? 0,
    });

    setShowModal(true);
  };

  // Close Update Modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);

    setFormData({
      status: "Not Started",
      progress: 0,
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update project
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedProject) return;

    try {
      setLoading(true);

      await editData(`${Endpoint.projects.url}/${selectedProject._id}`, {
        status: formData.status,
        progress: Number(formData.progress),
      });

      await getMyProjects();
      await getMyStats();

      handleCloseModal();
    } catch (error) {
      console.log("UPDATE PROJECT ERROR:", error);

      console.log(error?.response?.data?.message || "Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8">
          {/* Back to Home */}

          <Link
            to="/"
            className="mb-5 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>

          <p className="mb-1 text-sm font-medium text-blue-600">Team Member</p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            My Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View your assigned projects and track their progress.
          </p>
        </div>

        {/* Stats */}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">My Projects</p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {stats.totalProjects}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">In Progress</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {stats.inProgress}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Completed</p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {stats.completed}
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Not Started</p>

            <h2 className="mt-2 text-3xl font-bold text-slate-600">
              {stats.notStarted}
            </h2>
          </div>
        </div>

        {/* Projects */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              My Assigned Projects
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Projects currently assigned to you.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Project
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Client
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                    Progress
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-slate-50">
                    {/* Project */}

                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {project.name}
                      </p>

                      <p className="mt-1 max-w-xs truncate text-sm text-slate-500">
                        {project.description}
                      </p>
                    </td>

                    {/* Client */}

                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {project.clientId?.name || "N/A"}
                      </p>

                      <p className="text-xs text-slate-400">
                        {project.clientId?.email || ""}
                      </p>
                    </td>

                    {/* Status */}

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {project.status}
                      </span>
                    </td>

                    {/* Progress */}

                    <td className="px-6 py-4">
                      <div className="w-40">
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="text-slate-500">Progress</span>

                          <span className="font-semibold text-slate-700">
                            {project.progress}%
                          </span>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{
                              width: `${project.progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Action */}

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleOpenUpdate(project)}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {projects.length === 0 && (
              <div className="px-6 py-12 text-center">
                <p className="font-medium text-slate-700">
                  No assigned projects
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  You currently have no projects assigned to you.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Update Modal */}

      {showModal && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}

            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-xl font-semibold text-slate-900">
                Update Project
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update the status and progress of this project.
              </p>
            </div>

            {/* Form */}

            <form onSubmit={handleUpdate} className="space-y-5 px-6 py-6">
              {/* Project Name */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Project
                </label>

                <div className="rounded-lg bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {selectedProject.name}
                </div>
              </div>

              {/* Status */}

              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>

              {/* Progress */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="progress"
                    className="text-sm font-medium text-slate-700"
                  >
                    Progress
                  </label>

                  <span className="text-sm font-semibold text-blue-600">
                    {formData.progress}%
                  </span>
                </div>

                <input
                  id="progress"
                  name="progress"
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={handleChange}
                  className="w-full cursor-pointer"
                />

                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={loading}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Updating..." : "Update Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMemberDashboard;
