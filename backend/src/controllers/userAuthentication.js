import User from "../models/user.model.js";
import validate from "../utils/validator.js";
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
        res.status(201).json({message: "User Registered Successfully", user} );

    }
    catch(error){
        res.status(400).json({message: error.message});
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email) 
            throw new Error("Invalid Credentils");
        if(!password) 
            throw new Error("Invalid Credentils");
        const user = await User.findOne({email});
        const match = bcrypt.compare(password, user.password);
        if(!match) 
            throw new Error("Invalid Credentils");
        const token = jwt.sign({_id:user._id, email: email},process.env.JWT_SECRET, {expiresIn: 60*60});
        res.cookie('token', token, {maxAge: 60*60*1000});
        res.status(200).json({message: "User Logged In Successfully"});
    } 
    catch(error){
        res.status(400).json({message: error.message});
    }
}

export const logout = async (req, res) => {
    try {
        // validate the token 
        // Token add kar dunga Radis ke blockList
        // Cookies ko clear kar dennge..
        res.clearCookie('token');
        res.status(200).json({message: "User Logged Out Successfully"});
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
}

export const getProfile = async (req, res) => {
    try {
        res.send("Hello jee")
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


 