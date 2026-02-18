import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    resume: {
        type: String, // Path to resume file
        required: false
    },
    resumeOriginalName: {
        type: String,
        required: false
    },
    coverLetter: {
        type: String,
        required: false
    }
}, { timestamps: true });

export const Application = mongoose.model("Application", applicationSchema);
