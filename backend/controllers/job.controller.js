import { Job } from "../models/job.model.js";

// Post a new job
export const postJob = async (req, res) => {
    try {
        console.log('POST /api/v1/job/post - Request body:', req.body);
        console.log('User ID from token:', req.id);

        const { title, description, requirements, salary, location, jobType, experienceLevel, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experienceLevel || !position) {
            console.log('Validation failed - missing fields');
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };

        console.log('Creating job with data:', {
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel,
            position,
            company: companyId ? { name: companyId } : null,  // Store as object with name
            created_by: userId
        });

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel,
            position,
            company: companyId ? { name: companyId } : null,  // Store as object with name
            created_by: userId
        });

        console.log('Job created successfully:', job._id);

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.error('Error in postJob controller:', error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

// Get all jobs (for students)
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const location = req.query.location || "";
        const jobType = req.query.jobType || "";
        const experience = req.query.experience || "";
        const salaryRange = req.query.salary || "";

        let query = {};

        // Use $and to combine keyword/location search with specific filters
        const andFilters = [];

        if (keyword) {
            andFilters.push({
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                    { "company.name": { $regex: keyword, $options: "i" } }
                ]
            });
        }

        if (location) {
            andFilters.push({ location: { $regex: location, $options: "i" } });
        }

        if (jobType) {
            andFilters.push({ jobType: { $regex: jobType, $options: "i" } });
        }

        if (experience) {
            // Check if experience is specified as a range or single number
            // For simplicity, we'll do a partial match or greater than check depending on input
            andFilters.push({ experienceLevel: { $regex: experience, $options: "i" } });
        }

        if (salaryRange) {
            // Expecting salary in format like "0-300000" or just one number
            const [min, max] = salaryRange.split("-").map(Number);
            if (max) {
                andFilters.push({ salary: { $gte: min, $lte: max } });
            } else {
                andFilters.push({ salary: { $gte: min } });
            }
        }

        if (andFilters.length > 0) {
            query.$and = andFilters;
        }

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

// Get job by ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "company"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

// Get admin jobs (jobs created by the recruiter)
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

// Update job
export const updateJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experienceLevel, position, company } = req.body;
        const jobId = req.params.id;
        const userId = req.id;

        // Find the job and verify ownership
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Check if the user is the creator of the job
        if (job.created_by.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to update this job.",
                success: false
            });
        }

        // Update the job
        const updateData = {
            title,
            description,
            requirements: typeof requirements === 'string' ? requirements.split(",") : requirements,
            salary: Number(salary),
            location,
            jobType,
            experienceLevel,
            position,
            company: company ? { name: company } : job.company
        };

        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });

        return res.status(200).json({
            message: "Job updated successfully.",
            job: updatedJob,
            success: true
        });
    } catch (error) {
        console.error('Error in updateJob controller:', error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

// Delete job
export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;

        // Find the job and verify ownership
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Check if the user is the creator of the job
        if (job.created_by.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this job.",
                success: false
            });
        }

        // Delete the job
        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            message: "Job deleted successfully.",
            success: true
        });
    } catch (error) {
        console.error('Error in deleteJob controller:', error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
}

