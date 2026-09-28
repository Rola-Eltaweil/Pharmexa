import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      name,
      email,
      companyName,
      requestType,
      subject,
      message,
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

// Get one request by ID
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

// Update request status
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

// Delete request
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
