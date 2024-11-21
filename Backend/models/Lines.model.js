import mongoose from "mongoose";

const lineSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        unique: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }],
    dislikedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    }],
}, {timestamps: true});

const Lines = mongoose.model("Lines", lineSchema);

export default Lines;
