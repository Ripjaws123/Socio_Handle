import jwt from "jsonwebtoken";


export const isAuthorized = async (req, res, next) => {
  try {

    // Get token from cookies
    const { token } = req.cookies;
    console.log(token);

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized User",
        success: false,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;

    // forward to next route
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Invalid Token",
      success: false,
    });
  }
};
