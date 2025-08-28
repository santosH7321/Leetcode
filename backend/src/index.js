import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/userAuth.js";
import redisClient from "./config/redis.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/user", authRouter);

const InitalizeConnection = async () => {
  try {
    await Promise.all([connectDB(), redisClient.connect()]);
    console.log("DB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

InitalizeConnection();
