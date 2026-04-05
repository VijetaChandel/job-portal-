import mongoose from 'mongoose';
import fs from 'fs';

const MONGO_URI = 'mongodb+srv://vijeta:viju1709@cluster0.fo82yfu.mongodb.net/JobPortal?appName=Cluster0';

const userSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ['student', 'recruiter'], required: true },
});
const User = mongoose.model("User", userSchema);

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
const Job = mongoose.model("Job", jobSchema);

const checkDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        const users = await User.find({});
        
        let report = [];
        for (const user of users) {
             const count = await Job.countDocuments({ created_by: user._id });
             report.push({ fullname: user.fullname, email: user.email, role: user.role, jobs_count: count });
        }
        
        fs.writeFileSync('db_report.json', JSON.stringify(report, null, 2));
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
};

checkDB();
