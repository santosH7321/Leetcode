import redisClient from "../config/redis.js";
import User from "../models/user.model.js";
import validate from "../utils/validator.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Submission from "../models/submission.js"

export const register = async (req, res) => {
  try {
    validate(req.body);
    const { firstName, email, password } = req.body;
    req.body.password = await bcrypt.hash(password, 12);
    req.body.role = "user";
    const user = await User.create(req.body);
    const token = jwt.sign(
      { _id: user._id, email: email, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).json({ message: "User Registered Successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) throw new Error("Invalid Credentils");
    if (!password) throw new Error("Invalid Credentils");
    const user = await User.findOne({ email });
    const match = bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid Credentils");
    const token = jwt.sign(
      { _id: user._id, email: email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    );
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(200).json({ message: "User Logged In Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({ message: "Token not found" });
    }

    const payload = jwt.decode(token);

    if (!payload || !payload.exp) {
      return res.status(400).json({ message: "Invalid token" });
    }

    // Block token in Redis
    await redisClient.set(`token:${token}`, "Blocked", {
      EXAT: payload.exp,
    });

    // Clear cookie
    res.clearCookie("token", { expires: new Date(0), httpOnly: true });

    res.status(200).json({ message: "User Logged Out Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const adminRegister = async (req, res) => {
  try {
   //  if(req.user.role != "admin") throw new Error("Unauthorized Access");
    validate(req.body);
    const { firstName, email, password } = req.body;
    req.body.password = await bcrypt.hash(password, 12);
    // req.body.role = "admin";
    const user = await User.create(req.body);
    const token = jwt.sign(
      { _id: user._id, email: email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 }
    ); 
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(201).json({ message: "Admin Registered Successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const userId = req.result._id;
    // userSchema delete
    await User.findByIdAndDelete(userId);
    //submission se bhi delete karo...
    // await Submission.deleteMany({userId});
    res.status(200).send("Deleted Successfully");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}