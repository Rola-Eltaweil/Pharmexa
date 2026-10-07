import bcrypt from "bcrypt";
import user from "../models/user.js";
import Contact from "../models/Contact.js";

import Product from "../models/Product.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const finduser = await user.findOne({ email });
    if (finduser) {
      return res.status(400).json({
        message: "Email is already used.",
      });
    }
    if (
      password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password)
    ) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain both uppercase and lowercase letters.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createOne = new user({
      name,
      email,
      password: hashedPassword,
    });

    await createOne.save();
    return res
      .status(201)
      .json({ message: "Welcome! Your account is ready.", success: true });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const findUser = await user.findOne({ email });
    if (!findUser) {
      return res
        .status(404)
        .json({ message: "Invalid credentials. Please try again." });
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
      return res
        .status(404)
        .json({ message: "Invalid credentials. Please try again." });
    }

    const userdata = {
      email,
      _id: findUser._id,
      name: findUser.name,
    };

    const token = jwt.sign(
      { _id: userdata._id, role: findUser.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      success: true,
      message: "Welcome! Your account is ready.",
      data: userdata,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const userDetails = async (req, res) => {
  try {
    const _id = req._id;
    const getuser = await user.findOne({ _id });

    return res.status(200).json({
      message: "user details",
      success: true,
      userdetails: getuser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "user details",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req._id;
    const { name, email } = req.body;

    if (!name || name.trim().length < 3) {
      return res.status(400).json({
        success: false,
        message: "Name must be at least 3 characters",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const existingUser = await user.findOne({
      email,
      _id: { $ne: userId },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email is already in use",
      });
    }

    const updatedUser = await user
      .findByIdAndUpdate(
        userId,
        {
          name: name.trim(),
          email: email.trim(),
        },
        {
          new: true,
          runValidators: true,
        },
      )
      .select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req?._id;
    const { currentPassword, newPassword } = req.body;

    // Check required fields
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    // Validate new password
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters",
      });
    }

    if (!/[a-z]/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: "New password must contain at least one lowercase letter",
      });
    }

    if (!/[A-Z]/.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message: "New password must contain at least one uppercase letter",
      });
    }

    // Find logged-in user
    const existingUser = await user.findById(userId);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check current password
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      existingUser.password,
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    existingUser.password = hashedPassword;

    await existingUser.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};

export const getProductsuser = async (req, res) => {
  try {
    const AllProducts = await Product.find();
    if (AllProducts) {
      return res.status(200).json({
        success: true,
        message: "All Product get successfully. ",
        data: AllProducts,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const searchProducts = async (req, res) => {
  try {
    const { search, type, form, activeSubstance } = req.query;

    const filter = {};

    // Search by name or description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by type
    if (type && type !== "All Types") {
      filter.type = type;
    }

    // Filter by form
    if (form && form !== "All Forms") {
      filter.form = form;
    }

    // Filter by active substance
    if (activeSubstance && activeSubstance !== "All Substances") {
      filter.activeSubstance = activeSubstance;
    }

    const products = await Product.find(filter);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to search products",
      error: error.message,
    });
  }
};
export const getMyContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({
      userId: req._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      contacts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await user
      .find({ role: "teamMember" })
      .select("_id name email role")
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      teamMembers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
