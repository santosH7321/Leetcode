import express from "express";
import { adminRegister, login, logout, register } from "../controllers/userAuthentication.js";
import userMiddleware from "../middleware/userMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", userMiddleware, logout);
authRouter.post("/admin/register",adminMiddleware, adminRegister);



export default authRouter;
 