import express from "express";
import { getProfile, login, logout, register } from "../controllers/userAuthentication.js";
import userMiddleware from "../middleware/userMiddleware.js";


const authRouter = express.Router();

// register
authRouter.post("/register", register);
//login
authRouter.post("/login", login);
// logout
authRouter.post("/logout",userMiddleware, logout);
// getProfile
authRouter.get("/profile", getProfile);


export default authRouter;