import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  getData,
  postData,
  editData,
  deleteData,
} from "../../utils/apiSummary";

import { Endpoint } from "../../utils/routes";

import StatCards from "./Components/StatCards";
import ProjectCharts from "./Components/ProjectCharts";
import ProjectTable from "./Components/ProjectTable";
import ProjectModal from "./Components/ProjectModal";

const Dashboard = () => {
  const role = useSelector((state) =>
    state.user.userDetails?.role?.toLowerCase(),
  );

  const [projects, setProjects] = useState([]);
  const [projectRequests, setProjectRequests] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const [stats, setStats] = useState({
    totalProjects: 0,
    inProgress: 0,
    completed: 0,
    notStarted: 0,
    onHold: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // ---------------- GET PROJECTS ----------------

  const getProjects = async () => {
    try {
      const response = await getData(Endpoint.projects.url);

      setProjects(response.data.projects || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- GET STATS ----------------

  const getStats = async () => {
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

  // ---------------- GET APPROVED REQUESTS ----------------

  const getApprovedProjectRequests = async () => {
    try {
      const response = await getData(Endpoint.approvedProjectRequests.url);

      setProjectRequests(response.data.requests || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- GET TEAM MEMBERS ----------------

  const getTeamMembers = async () => {
    try {
      const response = await getData(Endpoint.teamMembers.url);

      setTeamMembers(response.data.teamMembers || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- LOAD DATA ----------------

  useEffect(() => {
    getProjects();
    getStats();

    if (role === "admin") {
      getApprovedProjectRequests();
      getTeamMembers();
    }
  }, [role]);

  // ---------------- CREATE PROJECT ----------------

  const openCreateModal = async () => {
    await getApprovedProjectRequests();
    await getTeamMembers();

    setEditingProject(null);
    setShowModal(true);
  };

  // ---------------- EDIT PROJECT ----------------

  const openEditModal = (project) => {
    setEditingProject(project);
    setShowModal(true);
  };

  // ---------------- CLOSE MODAL ----------------

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  // ---------------- CREATE / UPDATE ----------------

  const handleSubmit = async (data) => {
    try {
      if (editingProject) {
        await editData(`${Endpoint.projects.url}/${editingProject._id}`, data);
      } else {
        await postData(`${Endpoint.projects.url}/create`, data);
      }

      closeModal();

      await getProjects();
      await getStats();
      await getApprovedProjectRequests();
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- DELETE PROJECT ----------------

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) return;

    try {
      await deleteData(`${Endpoint.projects.url}/${id}`);

      await getProjects();
      await getStats();
      await getApprovedProjectRequests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-8">
      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-blue-600">Overview</p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Project Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor your projects and track their progress.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <span className="text-sm font-medium text-slate-700">
              {stats.totalProjects} Projects
            </span>
          </div>

          {role === "admin" && (
            <button
              onClick={openCreateModal}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              + Create Project
            </button>
          )}
        </div>
      </div>

      {/* STAT CARDS */}

      <StatCards stats={stats} />

      {/* CHARTS */}

      <ProjectCharts stats={stats} projects={projects} />

      {/* PROJECT TABLE */}

      <ProjectTable
        projects={projects}
        role={role}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {/* MODAL */}

      {showModal && (
        <ProjectModal
          project={editingProject}
          projectRequests={projectRequests}
          teamMembers={teamMembers}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Dashboard;
