import userMiddleware from "../middleware/userMiddleware";
import express from express;
import submitCode from "../controllers/userSubmission.js";

const submitRouter = express.Router();

submitRouter.post("/submit/:id", userMiddleware, submitCode);

