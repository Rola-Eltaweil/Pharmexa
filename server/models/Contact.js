import mongoose from "mongoose";

const contactscheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
  },
});

const contact = mongoose.model("contact", contactscheme);
export default contact;
