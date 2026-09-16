const BaseURL = "http://localhost:5000";

export const Endpoint = {
  createContact: {
    method: "POST",
    url: `${BaseURL}/api/user/contact`,
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
  logout: {
    method: "GET",
    url: `${BaseURL}/api/logout`,
  },
};
