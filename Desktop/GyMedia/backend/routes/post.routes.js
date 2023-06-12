import { Router } from "express";
import fileUploadMiddleware from "../middlewares/Uploads/FileUpload.js";
import * as PostController from "../controllers/post.controller.js";

const router = Router();

router.get("/", PostController.getAllPosts);
router.post("/create", PostController.createPost);
router.post("/image", fileUploadMiddleware, PostController.saveImage);
router.post("/byToken", PostController.getAllPostsByToken);
router.put("/", PostController.liked);

export default router;
