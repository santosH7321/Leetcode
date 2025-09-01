import express from "express";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {createProblem, updateProblem} from "../controllers/userProblem.js";
import userMiddleware from "../middleware/userMiddleware.js";



const problemRouter = express.Router();

problemRouter.post("/create",adminMiddleware, createProblem);
problemRouter.put("/upadte/:id",adminMiddleware, updateProblem);
problemRouter.delete("/delete/:id",adminMiddleware, deleteProblem);

problemRouter.get("/problemById/:id",userMiddleware, getProblemById);
problemRouter.get("/getAllProblem",userMiddleware, getAllProblem);
problemRouter.get("/problemSolvedByUser",userMiddleware, solvedAllProblemByUser);


export default problemRouter;