import jwt from "jsonwebtoken";
// import redisClient from "../config/redis";
 

const userMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if(!token) throw new Error("Unauthorized Access");

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const {_id} = payload;
        if(!_id) throw new Error("Unauthorized Access");
        const result = await User.findById(_id);
        if(!result) throw new Error("Unauthorized Access");
        // Redis ke blockList me to nahi hai
           
        const IsBlocked = await redisClient.exists(`token:${token}`);
        if(IsBlocked) throw new Error("Unauthorized Access");
        req.user = result;
        next();

    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export default userMiddleware;