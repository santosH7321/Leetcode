import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import redisClient from "../config/redis.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Unauthorized Access");

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = payload;
    if (!_id) throw new Error("Unauthorized Access");
    const result = await User.findById(_id);
    if (payload.role != "admin") throw new Error("Unauthorized Access");
    if (!result) throw new Error("Unauthorized Access");
    // Redis ke blockList me to nahi hai

    const IsBlocked = await redisClient.exists(`token:${token}`);
    if (IsBlocked) throw new Error("Unauthorized Access");
    req.user = result;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export default adminMiddleware;
