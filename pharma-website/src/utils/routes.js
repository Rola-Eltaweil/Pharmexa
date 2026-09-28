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
};
