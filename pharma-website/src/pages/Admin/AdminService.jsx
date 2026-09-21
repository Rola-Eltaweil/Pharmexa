import { useEffect, useState } from "react";
import {
  Factory,
  FlaskConical,
  TestTube2,
  Handshake,
  Plus,
  Pencil,
  Trash2,
  MoreVertical,
  Layers3,
  CheckCircle2,
  X,
} from "lucide-react";

import {
  getData,
  postData,
  editData,
  deleteData,
} from "../../utils/apiSummary";

import { Endpoint } from "../../utils/routes";

const AdminService = () => {
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    icon: "",
  });

  // Icon mapping
  const iconMap = {
    Factory: Factory,
    FlaskConical: FlaskConical,
    TestTube2: TestTube2,
    Handshake: Handshake,
  };

  // =========================
  // GET ALL SERVICES
  // =========================
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getData(Endpoint.allServices.url);

      setServiceList(response.data.data || []);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // OPEN ADD MODAL
  // =========================
  const handleAddClick = () => {
    setEditingService(null);

    setFormData({
      title: "",
      description: "",
      category: "",
      icon: "Factory",
    });

    setShowModal(true);
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================
  const handleEditClick = (service) => {
    setEditingService(service);

    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      icon: service.icon,
    });

    setShowModal(true);
  };

  // =========================
  // CLOSE MODAL
  // =========================
  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);

    setFormData({
      title: "",
      description: "",
      category: "",
      icon: "",
    });
  };

  // =========================
  // ADD SERVICE
  // =========================
  const handleAddService = async () => {
    try {
      setError("");

      const response = await postData(Endpoint.addService.url, formData);

      setServiceList((prev) => [...prev, response.data.data]);

      closeModal();
    } catch (error) {
      console.error(error);
      setError("Failed to create service");
    }
  };

  // =========================
  // EDIT SERVICE
  // =========================
  const handleEditService = async () => {
    try {
      setError("");

      const response = await editData(
        `${Endpoint.editService.url}/${editingService._id}`,
        formData,
      );

      setServiceList((prev) =>
        prev.map((service) =>
          service._id === editingService._id ? response.data.data : service,
        ),
      );

      closeModal();
    } catch (error) {
      console.error(error);
      setError("Failed to update service");
    }
  };

  // =========================
  // DELETE SERVICE
  // =========================
  const handleDeleteService = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?",
    );

    if (!confirmDelete) return;

    try {
      setError("");

      await deleteData(`${Endpoint.deleteService.url}/${id}`);

      setServiceList((prev) => prev.filter((service) => service._id !== id));
    } catch (error) {
      console.error(error);
      setError("Failed to delete service");
    }
  };

  // =========================
  // FORM SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingService) {
      await handleEditService();
    } else {
      await handleAddService();
    }
  };

  const getServiceIcon = (iconName) => {
    return iconMap[iconName] || Factory;
  };

  const totalServices = serviceList.length;

  const activeServices = serviceList.length;

  const lastUpdated =
    serviceList.length > 0
      ? new Date(
          serviceList
            .map((service) => new Date(service.updatedAt))
            .sort((a, b) => b - a)[0],
        ).toLocaleDateString()
      : "—";

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* =========================
          HEADER
      ========================= */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Services Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage the services displayed on the public website.
          </p>
        </div>

        <button
          onClick={handleAddClick}
          className="flex items-center cursor-pointer justify-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
        >
          <Plus size={18} />
          Add New Service
        </button>
      </div>

      {/* =========================
          ERROR
      ========================= */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* =========================
          STATS
      ========================= */}
      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Total Services */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Services
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {totalServices}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
              <Layers3 size={22} />
            </div>
          </div>
        </div>

        {/* Active Services */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Active Services
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {activeServices}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <CheckCircle2 size={22} />
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Last Updated</p>

              <h2 className="mt-2 text-lg font-bold text-slate-900">
                {lastUpdated}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <MoreVertical size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          SERVICES
      ========================= */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-sm text-slate-500">Loading services...</p>
        </div>
      ) : serviceList.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <Layers3 size={40} className="mx-auto text-slate-400" />

          <h3 className="mt-4 text-lg font-semibold text-slate-800">
            No services yet
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Add your first service to display it on the website.
          </p>

          <button
            onClick={handleAddClick}
            className="mt-5 inline-flex  cursor-pointer items-center gap-2 rounded-xl bg-blue-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <Plus size={18} />
            Add New Service
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {serviceList.map((service) => {
            const ServiceIcon = getServiceIcon(service.icon);

            return (
              <div
                key={service._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
                      <ServiceIcon size={24} />
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-blue-700">
                        {service.category}
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-900">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <button className="rounded-lg p-2  cursor-pointer text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                    <MoreVertical size={20} />
                  </button>
                </div>

                {/* Description */}
                <p className="mt-5 min-h-[72px] text-sm leading-6 text-slate-600">
                  {service.description}
                </p>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>

                    <span className="text-sm font-medium text-green-600">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditClick(service)}
                      className="flex items-center  cursor-pointer gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                      <Pencil size={15} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="flex items-center gap-2  cursor-pointer rounded-lg border border-red-100 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================
          ADD / EDIT MODAL
      ========================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingService ? "Edit Service" : "Add New Service"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingService
                    ? "Update the service information."
                    : "Add a new service to your website."}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-slate-400  cursor-pointer transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Service Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Pharmaceutical Manufacturing"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Category */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Category
                </label>

                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Manufacturing"
                  required
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the service..."
                  rows={4}
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Icon */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Icon
                </label>

                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Factory">Factory</option>

                  <option value="FlaskConical">Flask Conical</option>

                  <option value="TestTube2">Test Tube</option>

                  <option value="Handshake">Handshake</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border  cursor-pointer border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-900  cursor-pointer px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
                >
                  {editingService ? "Update Service" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminService;
