import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Eye,
  FileText,
  Filter,
  MessageSquare,
  Paperclip,
  Search,
  Clock3,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { setRequestsData } from "../redux/contactSlice";
import { getData } from "../utils/apiSummary";
import { Endpoint } from "../utils/routes";

const RequestUser = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const dispatch = useDispatch();

  // Get requests from Redux
  const requests = useSelector((state) => state.contact.Requests);
  // Get user's requests from backend
  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        const response = await getData(Endpoint.myRequests.url);

        if (response.data.success) {
          dispatch(setRequestsData(response.data.contacts));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMyRequests();
  }, [dispatch]);

  // Search + filter
  const filteredRequests = useMemo(() => {
    return requests.filter((request) => {
      const matchesSearch =
        request.subject?.toLowerCase().includes(search.toLowerCase()) ||
        request.requestType?.toLowerCase().includes(search.toLowerCase()) ||
        request._id?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || request.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  // Status style
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return {
          container: "bg-yellow-50 text-yellow-700 border-yellow-200",
          icon: <Clock3 size={15} />,
        };

      case "In Progress":
        return {
          container: "bg-blue-50 text-blue-700 border-blue-200",
          icon: <LoaderCircle size={15} />,
        };

      case "Resolved":
        return {
          container: "bg-green-50 text-green-700 border-green-200",
          icon: <CheckCircle2 size={15} />,
        };

      default:
        return {
          container: "bg-gray-50 text-gray-700 border-gray-200",
          icon: null,
        };
    }
  };

  // Statistics
  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status === "Pending",
  ).length;

  const inProgressRequests = requests.filter(
    (request) => request.status === "In Progress",
  ).length;

  const resolvedRequests = requests.filter(
    (request) => request.status === "Resolved",
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-primary">
            Customer Portal
          </p>

          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            My Requests
          </h1>

          <p className="mt-2 max-w-2xl text-gray-500">
            Track your submitted requests, check their status, and view
            documents attached to your requests.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Requests</p>

                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {totalRequests}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-primary">
                <MessageSquare size={21} />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>

                <p className="mt-2 text-2xl font-bold text-yellow-600">
                  {pendingRequests}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600">
                <Clock3 size={21} />
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Progress</p>

                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {inProgressRequests}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <LoaderCircle size={21} />
              </div>
            </div>
          </div>

          {/* Resolved */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Resolved</p>

                <p className="mt-2 text-2xl font-bold text-green-600">
                  {resolvedRequests}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <CheckCircle2 size={21} />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative w-full md:max-w-md">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your requests..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:bg-white"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-primary"
              >
                <option value="All">All Requests</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-5">
          {filteredRequests.map((request) => {
            const status = getStatusStyle(request.status);

            return (
              <div
                key={request._id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
              >
                {/* Request Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary">
                      <MessageSquare size={22} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg font-semibold text-gray-900">
                          {request.requestType}
                        </h2>

                        <span
                          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${status.container}`}
                        >
                          {status.icon}
                          {request.status}
                        </span>
                      </div>

                      <p className="mt-1 text-gray-700">{request.subject}</p>
                    </div>
                  </div>

                  <span className="text-sm font-medium text-gray-400">
                    #{request._id?.slice(-6)}
                  </span>
                </div>

                {/* Request Details */}
                <div className="mt-5 grid grid-cols-1 gap-4 border-t border-gray-100 pt-5 md:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CalendarDays size={17} />

                    <span>
                      {new Date(request.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">
                      Request Type:
                    </span>{" "}
                    {request.requestType}
                  </div>
                </div>

                {/* Message */}
                <div className="mt-4 rounded-xl bg-gray-50 p-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Message
                  </p>

                  <p className="text-sm leading-6 text-gray-600">
                    {request.message}
                  </p>
                </div>

                {/* File */}
                {request.file ? (
                  <div className="mt-5 flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-50">
                        <FileText size={21} className="text-red-600" />
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">
                          {request.file.fileName}
                        </p>

                        <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                          <Paperclip size={13} />

                          <span>PDF</span>

                          <span>•</span>

                          <span>
                            {(request.file.fileSize / (1024 * 1024)).toFixed(2)}{" "}
                            MB
                          </span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={`http://localhost:5000${request.file.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                    >
                      <Eye size={17} />
                      View PDF
                    </a>
                  </div>
                ) : (
                  <div className="mt-5 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-400">
                    No document was attached to this request.
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <FileText size={28} className="text-gray-400" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-800">
              No requests found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestUser;
