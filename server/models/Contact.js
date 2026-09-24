import mongoose from "mongoose";

const contactscheme = new mongoose.Schema(
  {
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
    requestType: {
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
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

const contact = mongoose.model("contact", contactscheme);
export default contact;
