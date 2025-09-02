import express from "express";
import userMiddleware from "../middleware/userMiddleware.js";
import submitCode from "../controllers/userSubmission.js";


const submitRouter = express.Router();

submitRouter.post("/submit/:id", userMiddleware, submitCode);

export default submitRouter;