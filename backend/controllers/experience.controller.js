import { Experience } from "../models/experience.model.js";

export const addExperience = async (req, res) => {
    try {
        const { fullname, role, company, feedback, stars } = req.body;
        const userId = req.id;

        if (!fullname || !role || !company || !feedback || !stars) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        const initials = fullname.split(" ").map(n => n[0]).join("").toUpperCase();

        const experience = await Experience.create({
            user: userId,
            fullname,
            role,
            company,
            feedback,
            stars,
            initials
        });

        return res.status(201).json({
            message: "Experience shared successfully.",
            experience,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}

export const getAllExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find({ isApproved: true }).sort({ createdAt: -1 }).limit(10);
        return res.status(200).json({
            experiences,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error", success: false });
    }
}
