import React, { useEffect, useState } from "react";

import {
  Eye,
  Search,
  Filter,
  Clock3,
  CheckCircle2,
  LoaderCircle,
  X,
  Trash2,
  FileText,
  Download,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { getData, editData, deleteData } from "../../utils/apiSummary";

import { Endpoint } from "../../utils/routes";

import { setCustomersData } from "../../redux/ContactSlice";

import { toast } from "react-toastify";

const CustomerService = () => {
  const dispatch = useDispatch();

  const requests = useSelector((state) => state.contact.Customers);

  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [viewLoading, setViewLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("oldest");

  // Normalize uploaded file path and create the correct backend URL
  const getFileUrl = (filePath) => {
    if (!filePath) return "";

    const normalizedPath = filePath.replace(/\\/g, "/").replace(/^\/+/, "");

    return `http://localhost:5000/${normalizedPath}`;
  };

  // Get all customer requests
  const getAllRequests = async () => {
    try {
      setLoading(true);

      const response = await getData(Endpoint.allContacts.url);

      if (response.data.success) {
        dispatch(setCustomersData(response.data.data));
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to load customer requests",
      );
    } finally {
      setLoading(false);
    }
  };

  // Search customer requests
  const searchRequests = async () => {
    try {
      const params = new URLSearchParams();

      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }

      const url = params.toString()
        ? `${Endpoint.searchContacts.url}?${params.toString()}`
        : Endpoint.allContacts.url;

      const response = await getData(url);

      if (response.data.success) {
        dispatch(setCustomersData(response.data.data));
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to search customer requests",
      );
    }
  };

  useEffect(() => {
    getAllRequests();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      searchRequests();
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  // View request details
  const handleView = async (id) => {
    try {
      setViewLoading(true);

      const response = await getData(`${Endpoint.oneContact.url}/${id}`);

      if (response.data.success) {
        setSelectedRequest(response.data.data);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to load request details",
      );
    } finally {
      setViewLoading(false);
    }
  };

  // Update request status
  const handleStatusChange = async (id, status) => {
    try {
      const response = await editData(
        `${Endpoint.updateContactStatus.url}/${id}/status`,
        {
          status,
        },
      );

      if (response.data.success) {
        toast.success("Request status updated successfully");

        await getAllRequests();

        if (selectedRequest?._id === id) {
          setSelectedRequest(response.data.data);
        }
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to update request status",
      );
    }
  };

  // Delete entire request
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this request?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await deleteData(`${Endpoint.deleteContact.url}/${id}`);

      if (response.data.success) {
        toast.success("Request deleted successfully");

        if (selectedRequest?._id === id) {
          setSelectedRequest(null);
        }

        await getAllRequests();
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to delete request");
    }
  };
  const handleDeleteFile = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this attached file?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await deleteData(
        `${Endpoint.deleteContactFile.url}/${id}`,
      );

      if (response.data.success) {
        toast.success("File deleted successfully");

        setSelectedRequest((prev) => ({
          ...prev,
          file: null,
        }));

        await getAllRequests();
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Failed to delete file");
    }
  };
  const closeModal = () => {
    setSelectedRequest(null);
  };

  // Status styles
  const getStatusStyle = (status) => {
    if (status === "Pending") {
      return {
        className: "bg-amber-50 text-amber-700 border-amber-200",
        icon: <Clock3 size={14} />,
      };
    }

    if (status === "In Progress") {
      return {
        className: "bg-blue-50 text-blue-700 border-blue-200",
        icon: <LoaderCircle size={14} />,
      };
    }

    return {
      className: "bg-green-50 text-green-700 border-green-200",
      icon: <CheckCircle2 size={14} />,
    };
  };

  // Sort requests
  const sortedRequests = [...requests].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    if (sortOrder === "oldest") {
      return dateA - dateB;
    }

    return dateB - dateA;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            Customer Requests
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage and follow up on customer requests and inquiries.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-5 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative w-full md:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search customer, company, subject..."
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Filter / Sort */}
          <div className="relative flex items-center gap-2">
            <Filter size={17} className="text-gray-500" />

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 outline-none transition focus:border-primary"
            >
              <option value="oldest">Oldest first</option>
              <option value="newest">Newest first</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div
            className={`overflow-x-auto ${
              sortedRequests.length > 5 ? "max-h-[430px] overflow-y-auto" : ""
            }`}
          >
            <table className="w-full min-w-[1100px] text-left">
              {/* Table Header */}
              <thead className="sticky top-0 z-10 border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Company
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Request Type
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Subject
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-10 text-center text-sm text-gray-500"
                    >
                      Loading requests...
                    </td>
                  </tr>
                ) : sortedRequests.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-10 text-center text-sm text-gray-500"
                    >
                      {searchTerm
                        ? "No requests match your search."
                        : "No requests found."}
                    </td>
                  </tr>
                ) : (
                  sortedRequests.map((request) => {
                    const currentStatus = request.status || "Pending";
                    const statusStyle = getStatusStyle(currentStatus);

                    return (
                      <tr
                        key={request._id}
                        className="transition hover:bg-gray-50"
                      >
                        {/* Customer */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">
                              {request.name}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {request.email}
                            </p>
                          </div>
                        </td>

                        {/* Company */}
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {request.companyName}
                          </span>
                        </td>

                        {/* Request Type */}
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">
                            {request.requestType}
                          </span>
                        </td>

                        {/* Subject */}
                        <td className="max-w-[220px] px-6 py-4">
                          <p className="truncate text-sm text-gray-700">
                            {request.subject}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${statusStyle.className}`}
                          >
                            {statusStyle.icon}
                            {currentStatus}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="whitespace-nowrap px-6 py-4">
                          <span className="text-sm text-gray-500">
                            {new Date(request.createdAt).toLocaleDateString()}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {/* View */}
                            <button
                              type="button"
                              onClick={() => handleView(request._id)}
                              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:border-primary hover:text-primary"
                            >
                              <Eye size={16} />
                              View
                            </button>

                            {/* Update Status */}
                            <select
                              value={currentStatus}
                              onChange={(e) =>
                                handleStatusChange(request._id, e.target.value)
                              }
                              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 outline-none transition focus:border-primary"
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>

                            {/* Delete Request */}
                            <button
                              type="button"
                              onClick={() => handleDelete(request._id)}
                              className="inline-flex items-center justify-center rounded-lg border border-red-200 p-2 text-red-500 transition hover:bg-red-50"
                              title="Delete request"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        {!loading && (
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span>
              Showing {sortedRequests.length} of {requests.length} requests
            </span>
          </div>
        )}
      </div>

      {/* View Request Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Request Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  View customer request information
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            {viewLoading ? (
              <div className="px-6 py-10 text-center text-sm text-gray-500">
                Loading request...
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 px-6 py-6 md:grid-cols-2">
                {/* Customer */}
                <div>
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Customer
                  </p>

                  <p className="mt-1 text-sm text-gray-900">
                    {selectedRequest.name}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Email
                  </p>

                  <p className="mt-1 text-sm text-gray-900">
                    {selectedRequest.email}
                  </p>
                </div>

                {/* Company */}
                <div>
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Company
                  </p>

                  <p className="mt-1 text-sm text-gray-900">
                    {selectedRequest.companyName}
                  </p>
                </div>

                {/* Request Type */}
                <div>
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Request Type
                  </p>

                  <p className="mt-1 text-sm text-gray-900">
                    {selectedRequest.requestType}
                  </p>
                </div>

                {/* Subject */}
                <div>
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Subject
                  </p>

                  <p className="mt-1 text-sm text-gray-900">
                    {selectedRequest.subject}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Status
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {selectedRequest.status || "Pending"}
                  </p>
                </div>

                {/* Request Details */}
                <div className="md:col-span-2">
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Request Details
                  </p>

                  <div className="mt-2 rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                    {selectedRequest.message}
                  </div>
                </div>

                {/* Attached File */}
                <div className="md:col-span-2">
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Attached Document
                  </p>

                  {selectedRequest.file ? (
                    <div className="mt-2 flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                      {/* File Information */}
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50">
                          <FileText size={22} className="text-red-600" />
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {selectedRequest.file.fileName}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            PDF •{" "}
                            {(
                              selectedRequest.file.fileSize /
                              (1024 * 1024)
                            ).toFixed(2)}{" "}
                            MB
                          </p>
                        </div>
                      </div>

                      {/* File Actions */}
                      <div className="flex flex-wrap gap-2">
                        {/* View PDF */}
                        <a
                          href={getFileUrl(selectedRequest.file.filePath)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                        >
                          <Eye size={16} />
                          View PDF
                        </a>

                        {/* Download PDF */}
                        <a
                          href={getFileUrl(selectedRequest.file.filePath)}
                          download={selectedRequest.file.fileName}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                          <Download size={16} />
                          Download
                        </a>

                        {/* Delete File */}
                        <button
                          type="button"
                          onClick={() => handleDeleteFile(selectedRequest._id)}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-400">
                      No document was attached to this request.
                    </div>
                  )}
                </div>

                {/* Submitted */}
                <div className="md:col-span-2">
                  <p className="text-xs font-medium uppercase text-gray-400">
                    Submitted
                  </p>

                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(selectedRequest.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerService;
