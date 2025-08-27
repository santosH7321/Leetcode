import express from "express";
import { login, register } from "../controllers/userAuthentication.js";


const authRouter = express.Router();

// register
authRouter.post("/register", register);
//login
authRouter.post("/login", login);
// logout
authRouter.post("/logout", logout);
// getProfile
authRouter.get("/profile", getProfile);
