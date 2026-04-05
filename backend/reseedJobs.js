import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://vijeta:viju1709@cluster0.fo82yfu.mongodb.net/JobPortal?appName=Cluster0';

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    salary: { type: Number, required: true },
    experienceLevel: { type: String, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    position: { type: Number, required: true },
    company: { type: mongoose.Schema.Types.Mixed },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }]
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['student', 'recruiter'], required: true },
});
const User = mongoose.model("User", userSchema);

const generateJobs = (userId) => {
    const titles = [
        "Senior Frontend Engineer", "Backend Node.js Developer", "Full Stack MERN Developer",
        "UI/UX Designer", "DevOps Engineer", "Data Scientist", "Data Analyst",
        "Software Engineer II", "Principal Software Engineer", "Mobile App Developer (React Native)",
        "System Administrator", "Cloud Architect (AWS)", "Machine Learning Engineer",
        "Cybersecurity Specialist", "IT Support Specialist", "Database Administrator",
        "QA Automation Engineer", "Product Manager (Tech)", "Scrum Master", "Business Analyst",
        "Frontend Developer (Vue.js)", "Backend Developer (Python/Django)",
        "Full Stack Developer (Java/Spring)", "Hardware Engineer", "Network Engineer",
        "Site Reliability Engineer (SRE)", "Blockchain Developer", "Game Developer (Unity)",
        "Embedded Systems Engineer", "AI Researcher", "Data Engineer", "BI Developer",
        "Technical Writer", "IT Project Manager", "Cloud Security Engineer",
        "ERP Consultant", "CRM Developer", "Solutions Architect", "iOS Developer (Swift)",
        "Android Developer (Kotlin)", "Web Developer", "Ruby on Rails Developer",
        "Golang Developer", "Frontend React Developer", "Software Development Engineer in Test (SDET)",
        "Full Stack Engineer", "Head of Engineering", "Engineering Manager", "Technical Lead",
        "IT Director"
    ];

    const locations = ["Bengaluru, Karnataka", "Pune, Maharashtra", "Hyderabad, Telangana", "Mumbai, Maharashtra", "Chennai, Tamil Nadu", "Gurugram, Haryana", "Noida, UP", "Remote"];
    const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
    const companies = ["Tech Innovations", "Global Systems", "DataFlow Corp", "Pinnacle Solutions", "CloudNet", "NextGen IT", "Alpha Software", "Beta Technologies"];

    const jobs = [];
    for (let i = 0; i < 50; i++) {
        jobs.push({
            title: titles[i],
            description: "We are looking for a highly skilled " + titles[i] + " to join our dynamic team and contribute to exciting projects. You will be responsible for creating, designing, and maintaining high-quality software solutions.",
            requirements: ["JavaScript", "React", "Node.js", "Python", "Java", "SQL", "AWS", "Git", "Agile", "Communication"].sort(() => 0.5 - Math.random()).slice(0, 4),
            salary: Math.floor(Math.random() * 2000000) + 500000, // 5L to 25L
            experienceLevel: (Math.floor(Math.random() * 8) + 1).toString() + " years",
            location: locations[Math.floor(Math.random() * locations.length)],
            jobType: jobTypes[Math.floor(Math.random() * jobTypes.length)],
            position: Math.floor(Math.random() * 5) + 1,
            company: { name: companies[Math.floor(Math.random() * companies.length)] },
            created_by: userId
        });
    }
    return jobs;
};

const reseedDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB.");

        // Clean up Deepak's 50 jobs
        const deepak = await User.findOne({ email: 'Deepak@gmail.com' });
        if (deepak) {
            const result = await Job.deleteMany({ created_by: deepak._id });
            console.log(`Deleted ${result.deletedCount} jobs from Deepak.`);
        }

        // Insert to Vijeta's account
        const targetUser = await User.findOne({ email: 'vijetachandel1709@gmail.com' });
        if (!targetUser) {
            console.error("Target user not found!");
            process.exit(1);
        }

        console.log("Using target user:", targetUser.fullname, `(${targetUser._id})`);

        const newJobs = generateJobs(targetUser._id);
        await Job.insertMany(newJobs);
        console.log(`Successfully inserted ${newJobs.length} jobs to Vijeta.`);

    } catch (err) {
        console.error("Error reseeding DB:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
};

reseedDB();
