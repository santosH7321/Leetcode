import express from "express";
import { adminRegister, login, logout, register, deleteProfile} from "../controllers/userAuthentication.js";
import userMiddleware from "../middleware/userMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", userMiddleware, logout);
authRouter.post("/admin/register",adminMiddleware, adminRegister);
authRouter.delete("/deleteProfile", userMiddleware, deleteProfile);
authRouter.get("/check", userMiddleware, (req, res) => {
    const reply = {
        firstName: req.user.firstName,
        email: req.user.email,
        _id: req.user._id
    }
    res.status(200).json({
        user: reply,
        message: "Valid User"
    });
})

export default authRouter;
 