import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import experienceRoute from "./routes/experience.route.js";

dotenv.config({});

const app = express();
app.get("/api/v1/health", (req, res) => res.json({ status: "ok" }));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'https://job-portal-xi-gules-13.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/experience", experienceRoute);

// Static file serving for uploads
app.use('/uploads', express.static('uploads'));

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT} [Experience route loaded]`);
})
