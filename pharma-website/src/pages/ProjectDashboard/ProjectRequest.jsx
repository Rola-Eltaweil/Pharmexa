import React, { useEffect, useState } from "react";
import {
  FolderPlus,
  Send,
  Paperclip,
  X,
  FileText,
  CalendarDays,
  BriefcaseBusiness,
  Clock3,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { getData, postData } from "../../utils/apiSummary";
import { Endpoint } from "../../utils/routes";
import { toast } from "react-toastify";
import { setProjects } from "../../redux/ProjectRequestSlice";

const ProjectsRequest = () => {
  const dispatch = useDispatch();

  const projects = useSelector((state) => state.projectRequestSlice.projects);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    service: "",
    deadline: "",
    attachment: null,
  });

  // Get user's project requests
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setProjectsLoading(true);

        const response = await getData(Endpoint.myProjectRequests.url);

        dispatch(setProjects(response.data.requests || []));
      } catch (error) {
        console.error("Get Project Requests Error:", error);

        toast.error(
          error.response?.data?.message || "Failed to load project requests.",
        );
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      attachment: e.target.files[0] || null,
    }));
  };

  const resetForm = () => {
    setFormData({
      projectName: "",
      description: "",
      service: "",
      deadline: "",
      attachment: null,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const data = new FormData();

      data.append("projectName", formData.projectName);
      data.append("description", formData.description);
      data.append("service", formData.service);

      if (formData.deadline) {
        data.append("deadline", formData.deadline);
      }

      if (formData.attachment) {
        data.append("attachment", formData.attachment);
      }

      const response = await postData(Endpoint.createProjectRequest.url, data);

      dispatch(setProjects([...projects, response.data.request]));

      toast.success("Project request submitted successfully.");

      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Project Request Error:", error);

      setError(
        error.response?.data?.message || "Failed to submit project request.",
      );
    } finally {
      setLoading(false);
    }
  };

  const closeForm = () => {
    if (loading) return;

    setShowForm(false);
    resetForm();
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";

      case "Pending":
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 size={15} />;

      case "Rejected":
        return <XCircle size={15} />;

      case "Pending":
      default:
        return <Clock3 size={15} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-8">
      {/* Header */}

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
            <FolderPlus size={18} />
            Project Requests
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Request Pharmaceutical Production
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Submit your pharmaceutical manufacturing requirements and our team
            will review your request and get back to you.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <FolderPlus size={18} />
          New Production Request
        </button>
      </div>

      {/* Main Card */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}

          <div className="rounded-2xl bg-blue-50 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <BriefcaseBusiness size={21} />
            </div>

            <h3 className="font-semibold text-slate-900">
              Tell us about your product
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Provide the product name, required service, and detailed
              pharmaceutical manufacturing requirements.
            </p>
          </div>

          {/* Card 2 */}

          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
              <FileText size={21} />
            </div>

            <h3 className="font-semibold text-slate-900">
              Add product requirements
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Attach product specifications, formulas, technical documents,
              packaging requirements, or other relevant files.
            </p>
          </div>

          {/* Card 3 */}

          <div className="rounded-2xl bg-emerald-50 p-5">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <Send size={21} />
            </div>

            <h3 className="font-semibold text-slate-900">Submit for review</h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Our pharmaceutical team will review your request before the
              production project is created.
            </p>
          </div>
        </div>

        {/* Start New Request */}

        {!projectsLoading && projects.length === 0 && (
          <div className="mt-8 border-t border-slate-100 pt-8 text-center">
            <div className="mx-auto flex max-w-md flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <FolderPlus size={30} />
              </div>

              <h2 className="text-xl font-semibold text-slate-900">
                Start a new production request
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Need pharmaceutical manufacturing or product development? Submit
                your requirements and our team will review your request.
              </p>

              <button
                onClick={() => setShowForm(true)}
                className="mt-6 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                <FolderPlus size={18} />
                Create Production Request
              </button>
            </div>
          </div>
        )}
      </div>

      {/* My Requests */}

      <div className="mt-8">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            My Project Requests
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Track the requests you have submitted.
          </p>
        </div>

        {projectsLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-4 text-sm text-slate-500">
              Loading your requests...
            </p>
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FolderPlus size={26} />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No project requests yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Your submitted production requests will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                {/* Top */}

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-slate-900">
                      {project.projectName}
                    </h3>

                    <p className="mt-1 text-sm text-blue-600">
                      {project.service}
                    </p>
                  </div>

                  <div
                    className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                      project.status,
                    )}`}
                  >
                    {getStatusIcon(project.status)}

                    {project.status}
                  </div>
                </div>

                {/* Description */}

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">
                  {project.description}
                </p>

                {/* Info */}

                <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                      <CalendarDays size={17} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Expected Date</p>

                      <p className="text-sm font-medium text-slate-700">
                        {project.deadline
                          ? new Date(project.deadline).toLocaleDateString()
                          : "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                      <FileText size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">Attachment</p>

                      <p className="truncate text-sm font-medium text-slate-700">
                        {project.attachment
                          ? project.attachment.fileName
                          : "No file attached"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* View */}

                <div className="mt-5 flex justify-end border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  New Production Request
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Provide the details of the pharmaceutical product you need.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={loading}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              {/* Error */}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Product Name */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Product Name
                </label>

                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  placeholder="e.g. Vitamin D3 Tablets"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Service */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Required Service
                </label>

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select a service</option>

                  <option value="Pharmaceutical Manufacturing">
                    Pharmaceutical Manufacturing
                  </option>

                  <option value="Product Development">
                    Product Development
                  </option>

                  <option value="Quality Control & Testing">
                    Quality Control & Testing
                  </option>

                  <option value="Contract Manufacturing">
                    Contract Manufacturing
                  </option>
                </select>
              </div>

              {/* Description */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Product Requirements
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the product, dosage form, quantity, formulation, packaging requirements, specifications, and any other important details..."
                  rows={6}
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Please provide as much product and manufacturing information
                  as possible.
                </p>
              </div>

              {/* Deadline */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CalendarDays size={16} />
                  Expected Completion Date
                </label>

                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Attachment */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Product Documents
                </label>

                <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 transition hover:border-blue-400 hover:bg-blue-50/50">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <Paperclip size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-700">
                      {formData.attachment
                        ? formData.attachment.name
                        : "Attach product documents"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      PDF, DOC, DOCX, JPG, JPEG or PNG
                    </p>
                  </div>

                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Actions */}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={loading}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send size={17} />

                  {loading ? "Submitting..." : "Submit Production Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsRequest;
