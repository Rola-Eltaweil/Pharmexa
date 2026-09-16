import bcrypt from "bcrypt";
import user from "../models/user.js";
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
