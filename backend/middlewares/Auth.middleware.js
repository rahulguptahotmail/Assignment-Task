const jwt = require("jsonwebtoken");
const UserModel = require("../models/User.model");

class authMiddleware {
  // user authorization
  static authorization = async (req, res, next) => {
    try {
      const token =
        req.cookies.token || req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Token is required" });

      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (!payload)
        return res.status(401).json({ message: "Token is required" });
      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(403).json({ message: "Invalid token" });
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // seller authorization
  static sellerAuthorization = async (req, res, next) => {
    try {
      const token =
        req.cookies.token || req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Token is required" });
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (!payload)
        return res.status(401).json({ message: "Token is required" });

      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(403).json({ message: "Invalid token" });
      if (!(user.role === "sellerAdmin" || user.role === "superAdmin"))
        return res.status(403).json({ message: "Invalid user" });
      next();
    } catch (err) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }
  };


  // super authorization
  static superAuthorization = async (req, res, next) => {
    try {
      const token =
        req.cookies.token || req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "Token is required" });
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      if (!payload)
        return res.status(401).json({ message: "Token is required" });

      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(403).json({ message: "Invalid token" });
      if (user.role !== "superAdmin")
        return res.status(403).json({ message: "Invalid user" });
      next();
    } catch (err) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action" });
    }
  };
}

module.exports = authMiddleware;
