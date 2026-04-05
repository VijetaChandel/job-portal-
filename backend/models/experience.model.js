import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    initials: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: true // Immediate live for now
    }
}, { timestamps: true });

export const Experience = mongoose.model('Experience', experienceSchema);
