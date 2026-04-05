import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { addExperience, getAllExperiences } from "../controllers/experience.controller.js";

const router = express.Router();

router.route("/add").post(isAuthenticated, addExperience);
router.route("/getall").get(getAllExperiences);

export default router;
