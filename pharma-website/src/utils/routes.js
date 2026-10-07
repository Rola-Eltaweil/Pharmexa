const BaseURL = "http://localhost:5000";

export const Endpoint = {
  createContact: {
    method: "POST",
    url: `${BaseURL}/api/customerService/contact`,
  },

  allContacts: {
    method: "GET",
    url: `${BaseURL}/api/customerService/contacts`,
  },

  oneContact: {
    method: "GET",
    url: `${BaseURL}/api/customerService/contact`,
  },
  updateContactStatus: {
    method: "PUT",
    url: `${BaseURL}/api/customerService/contact`,
  },

  deleteContact: {
    method: "DELETE",
    url: `${BaseURL}/api/customerService/contact`,
  },
  deleteContactFile: {
    method: "DELETE",
    url: `${BaseURL}/api/customerService/deleteContactFile`,
  },
  searchContacts: {
    method: "GET",
    url: `${BaseURL}/api/customerService/search`,
  },

  addProduct: {
    method: "POST",
    url: `${BaseURL}/api/admin/dashboard/addProduct`,
  },
  AllProduct: {
    method: "GET",
    url: `${BaseURL}/api/admin/dashboard/products`,
  },
  oneProduct: {
    method: "GET",
    url: `${BaseURL}/api/admin/dashboard/oneProduct`,
  },
  editProduct: {
    method: "PUT",
    url: `${BaseURL}/api/admin/dashboard/editProduct`,
  },
  deleteProduct: {
    method: "DELETE",
    url: `${BaseURL}/api/admin/dashboard/deleteProduct`,
  },

  //user

  register: {
    method: "POST",
    url: `${BaseURL}/api/register`,
  },
  myRequests: {
    method: "GET",
    url: `${BaseURL}/api/myRequests`,
  },
  loginuser: {
    method: "POST",
    url: `${BaseURL}/api/login`,
  },
  userDetails: {
    method: "GET",
    url: `${BaseURL}/api/userDetails`,
  },
  updateProfile: {
    method: "PUT",
    url: `${BaseURL}/api/profile`,
  },
  changePassword: {
    method: "PUT",
    url: `${BaseURL}/api/change-password`,
  },
  logout: {
    method: "POST",
    url: `${BaseURL}/api/logout`,
  },
  AllProductuser: {
    method: "GET",
    url: `${BaseURL}/api/products`,
  },
  searchProduct: {
    method: "GET",
    url: `${BaseURL}/api/search`,
  },
  teamMembers: {
    method: "GET",
    url: `${BaseURL}/api/team-members`,
  },
  //service
  allServices: {
    method: "GET",
    url: `${BaseURL}/api/admin/dashboard/service`,
  },
  oneService: {
    method: "GET",
    url: `${BaseURL}/api/admin/dashboard/service`,
  },

  addService: {
    method: "POST",
    url: `${BaseURL}/api/admin/dashboard/service`,
  },
  editService: {
    method: "PUT",
    url: `${BaseURL}/api/admin/dashboard/service`,
  },
  deleteService: {
    method: "DELETE",
    url: `${BaseURL}/api/admin/dashboard/service`,
  },
  // Project Management
  projects: {
    method: "GET",
    url: `${BaseURL}/api/projects`,
  },

  projectStats: {
    method: "GET",
    url: `${BaseURL}/api/projects/stats`,
  },

  createProject: {
    method: "POST",
    url: `${BaseURL}/api/projects/create`,
  },

  updateProject: {
    method: "PUT",
    url: `${BaseURL}/api/projects`,
  },

  deleteProject: {
    method: "DELETE",
    url: `${BaseURL}/api/projects`,
  },

  // for project request
  createProjectRequest: {
    method: "POST",
    url: `${BaseURL}/api/project-requests/create`,
  },

  myProjectRequests: {
    method: "GET",
    url: `${BaseURL}/api/project-requests/my-requests`,
  },

  allProjectRequests: {
    method: "GET",
    url: `${BaseURL}/api/project-requests`,
  },

  updateProjectRequestStatus: {
    method: "PATCH",
    url: `${BaseURL}/api/project-requests`,
  },
  approvedProjectRequests: {
    method: "GET",
    url: `${BaseURL}/api/project-requests/approved`,
  },
};
