import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    pickupline: {
        type: Number,
        default: 7,
    },
    ispremium: {
        type: Boolean,
        default: false,
    },
    nextMove: {
        type: Number,
        default: 3,
    },
    likedLines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lines',
        default: [],
    }],
    dislikedLines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lines',
        default: [],
    }],
}, {timestamps: true});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next(); 
    }

    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt); 
    next();
});

const Users = mongoose.model("Users", userSchema);

export default Users;
