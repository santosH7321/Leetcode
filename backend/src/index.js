import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser"; 


dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

connectDB()
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed", err);
  });
``