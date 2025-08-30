import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import createProblem from "../controllers/userProblem.js";



const problemRouter = express.Router();

problemRouter.post("/create",adminMiddleware, createProblem);
// problemRouter.patch("/:id", updateProblem);
// problemRouter.delete("/:id", deleteProblem);

// problemRouter.get("/:id", getProblemById);
// problemRouter.get("/", getAllProblem);
// problemRouter.get("/user", solvedAllProblemByUser);


export default problemRouter;