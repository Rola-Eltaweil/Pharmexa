import Contact from "../models/Contact.js";
import fs from "fs";
import path from "path";

export const createContact = async (req, res) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const file = req.file;
    const userId = req._id;

    const { name, email, companyName, requestType, subject, message } =
      req.body;

    if (
      !name ||
      !email ||
      !companyName ||
      !requestType ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (name.length < 3) {
      return res.status(400).json({
        message: "Enter valid name please!",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format. Please enter a valid email address.",
      });
    }

    const createOne = new Contact({
      userId,
      name,
      email,
      companyName,
      requestType,
      subject,
      message,
      file: file
        ? {
            fileName: file.originalname,
            filePath: `/uploads/${file.filename}`,
            fileType: file.mimetype,
            fileSize: file.size,
          }
        : undefined,
    });

    await createOne.save();

    return res.status(201).json({
      success: true,
      message:
        "Your request has been submitted successfully. We will get back to you soon.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "In Progress", "Resolved"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Request status updated successfully",
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Request deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteContactFile = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    if (!contact.file || !contact.file.filePath) {
      return res.status(404).json({
        success: false,
        message: "No file attached to this request",
      });
    }

    // Get only the file name
    // Works with both:
    // /uploads/file.pdf
    // uploads\\file.pdf
    const fileName = path.basename(contact.file.filePath.replace(/\\/g, "/"));

    const fullFilePath = path.join(process.cwd(), "uploads", fileName);

    // Delete physical file if it exists
    if (fs.existsSync(fullFilePath)) {
      fs.unlinkSync(fullFilePath);
    }

    // Remove file metadata from MongoDB
    contact.file = undefined;

    await contact.save();

    return res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.log("Delete file error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete file",
      error: error.message,
    });
  }
};

export const searchContacts = async (req, res) => {
  try {
    const { search } = req.query;

    const filter = {};

    // Search by customer, email, company, request type, or subject
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
        {
          companyName: {
            $regex: search,
            $options: "i",
          },
        },
        {
          requestType: {
            $regex: search,
            $options: "i",
          },
        },
        {
          subject: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const contacts = await Contact.find(filter).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to search customer requests",
      error: error.message,
    });
  }
};
