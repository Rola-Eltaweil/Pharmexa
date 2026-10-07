import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  XCircle,
  Eye,
  FileText,
  CalendarDays,
  User,
  BriefcaseBusiness,
  X,
} from "lucide-react";

import { getData, editData } from "../../utils/apiSummary";
import { Endpoint } from "../../utils/routes";

const ProjectRreuestStatus = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const getRequests = async () => {
    try {
      setLoading(true);

      const response = await getData(Endpoint.allProjectRequests.url);

      setRequests(response.data.requests || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      await editData(
        `${Endpoint.updateProjectRequestStatus.url}/${id}/status`,
        {
          status,
        },
      );

      await getRequests();

      if (selectedRequest?._id === id) {
        setSelectedRequest((prev) => ({
          ...prev,
          status,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";

      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200";

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

      default:
        return <Clock3 size={15} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="mb-1 text-sm font-medium text-blue-600">
          Project Management
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Project Requests
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review project requests submitted by clients and manage their
              status.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <span className="text-sm font-medium text-slate-700">
              {requests.length} Requests
            </span>
          </div>
        </div>
      </div>

      {/* Requests */}
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-sm text-slate-500">Loading project requests...</p>
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <FileText size={40} className="mx-auto mb-3 text-slate-300" />

          <h3 className="text-lg font-semibold text-slate-800">
            No Project Requests
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            There are no project requests submitted by clients yet.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Project
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Client
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Service
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Deadline
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {requests.map((request) => (
                  <tr
                    key={request._id}
                    className="transition hover:bg-slate-50/70"
                  >
                    {/* Project */}
                    <td className="px-6 py-5">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {request.projectName}
                        </p>

                        <p className="mt-1 max-w-xs truncate text-xs text-slate-400">
                          {request.description}
                        </p>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                          <User size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {request.clientId?.name || "Unknown Client"}
                          </p>

                          <p className="text-xs text-slate-400">
                            {request.clientId?.email || "-"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <BriefcaseBusiness size={16} />

                        <span>{request.service}</span>
                      </div>
                    </td>

                    {/* Deadline */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarDays size={16} />

                        <span>
                          {request.deadline
                            ? new Date(request.deadline).toLocaleDateString()
                            : "No deadline"}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                          request.status,
                        )}`}
                      >
                        {getStatusIcon(request.status)}
                        {request.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        {/* View */}
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                        >
                          <Eye size={15} />
                          View
                        </button>

                        {/* Approve */}
                        {request.status !== "Approved" && (
                          <button
                            disabled={updatingId === request._id}
                            onClick={() =>
                              updateStatus(request._id, "Approved")
                            }
                            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <CheckCircle2 size={15} />
                            Approve
                          </button>
                        )}

                        {/* Reject */}
                        {request.status !== "Rejected" && (
                          <button
                            disabled={updatingId === request._id}
                            onClick={() =>
                              updateStatus(request._id, "Rejected")
                            }
                            className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <XCircle size={15} />
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
                  Project Request
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selectedRequest.projectName}
                </h2>
              </div>

              <button
                onClick={() => setSelectedRequest(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6 p-6">
              {/* Status */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </p>

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                    selectedRequest.status,
                  )}`}
                >
                  {getStatusIcon(selectedRequest.status)}
                  {selectedRequest.status}
                </span>
              </div>

              {/* Client */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="mb-1 text-xs font-medium text-slate-400">
                    Client
                  </p>

                  <p className="text-sm font-semibold text-slate-800">
                    {selectedRequest.clientId?.name || "Unknown Client"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {selectedRequest.clientId?.email || "-"}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="mb-1 text-xs font-medium text-slate-400">
                    Service
                  </p>

                  <p className="text-sm font-semibold text-slate-800">
                    {selectedRequest.service}
                  </p>
                </div>
              </div>

              {/* Deadline */}
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="mb-1 text-xs font-medium text-slate-400">
                  Deadline
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  {selectedRequest.deadline
                    ? new Date(selectedRequest.deadline).toLocaleDateString()
                    : "No deadline specified"}
                </p>
              </div>

              {/* Description */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Project Description
                </p>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                    {selectedRequest.description}
                  </p>
                </div>
              </div>

              {/* Attachment */}
              {selectedRequest.attachment?.filePath && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Attachment
                  </p>

                  <a
                    href={`http://localhost:5000/${selectedRequest.attachment.filePath.replace(
                      /\\/g,
                      "/",
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <FileText size={19} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {selectedRequest.attachment.fileName}
                      </p>

                      <p className="text-xs text-slate-400">View attachment</p>
                    </div>
                  </a>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
                {selectedRequest.status !== "Rejected" && (
                  <button
                    disabled={updatingId === selectedRequest._id}
                    onClick={() =>
                      updateStatus(selectedRequest._id, "Rejected")
                    }
                    className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    <XCircle size={17} />
                    Reject
                  </button>
                )}

                {selectedRequest.status !== "Approved" && (
                  <button
                    disabled={updatingId === selectedRequest._id}
                    onClick={() =>
                      updateStatus(selectedRequest._id, "Approved")
                    }
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                  >
                    <CheckCircle2 size={17} />
                    Approve
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectRreuestStatus;
