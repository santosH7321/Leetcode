import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLenth: 3,
        maxLenth: 20,
    },
    lastName: {
        type: String,
        minLenth: 3,
        maxLenth: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true,
    },
    age: {
        type: Number,
        min: 10,
        max: 80,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    problemSolved: {
        type: [String],

    },
},{timestamps: true});

const User = mongoose.model('userModel', userSchema);
export default User;