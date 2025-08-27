import User from "../models/user.model.js";
import validate from "../utils/validate.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const register =  async (req, res) => {
    try {
        validate(req.body);
        const { firstName, email, password} = req.body;
        req.body.password = await bcrypt.hash(password, 12);
        const user = await User.create(req.body);
        const token = jwt.sign({_id:user._id, email: email},process.env.JWT_SECRET, {expiresIn: 60*60});
        res.cookie('token', token, {maxAge: 60*60*1000});
        res.status(201).json({message: "User Registered Successfully"});

    }
    catch(error){
        res.status(400).json({message: error.message});
    }
}

 