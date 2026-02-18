import mongoose from 'mongoose';
import { User } from './models/user.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const registerUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jobportal');

        const email = 'riya@gmail.com';
        const hashedPassword = await bcrypt.hash('password123', 10);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User already exists');
            process.exit(0);
        }

        await User.create({
            fullname: 'Riya Kumari',
            email: email,
            phoneNumber: '1234567890',
            password: hashedPassword,
            role: 'student'
        });

        console.log('User riya@gmail.com registered successfully as student');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

registerUser();
