import { Router } from "express";
import * as PostExreciceCtrl from "../controllers/postExercices.controllers.js";
import ExercicieUploadMiddleware from "../middlewares/Uploads/exerciciePost.js";

const router = Router();

router.post("/create", PostExreciceCtrl.createExercicie);
router.post("/byId", PostExreciceCtrl.getExercicesById);
router.post("/byToken", PostExreciceCtrl.getExercicesByToken);
router.get("/", PostExreciceCtrl.getExercices);
router.post(
  "/sendImage",
  ExercicieUploadMiddleware,
  PostExreciceCtrl.savePostExercicePost
);

export default router;
