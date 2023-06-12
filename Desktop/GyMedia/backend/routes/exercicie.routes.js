import { Router } from "express";
import * as ExreciceCtrl from "../controllers/exercices.controllers.js";

const router = Router();

router.post("/create", ExreciceCtrl.createExercicie);
router.get("/", ExreciceCtrl.getExercices);

export default router;
