import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        min: 4,
        max: 16
    },
    username:{
        type: String,
        required: true,
        unique: true,
        min: 8,
        max: 26
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 4,
    },
    bookmarks:{
        type: Array,
        default: [],
    },
    followers:{
        type: Array,
        default: [],
    },
    following:{
        type: Array,
        default: [],
    },
},
{timestamps: true})

export const User = mongoose.model("User", UserSchema);