import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  username: "default",
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: 10360,
  },
});

export default redisClient;
