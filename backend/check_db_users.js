import mongoose from 'mongoose';
import { User } from './models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobportal');
        const users = await User.find({}, 'email role');
        console.log('---USERS---');
        users.forEach(u => console.log(`${u.email} | ${u.role}`));
        console.log('---END---');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUsers();
