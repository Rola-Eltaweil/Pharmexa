import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login first.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req._id = decoded._id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default userAuth;
