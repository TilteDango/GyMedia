import { Router } from "express";
import * as RecipeController from "../controllers/recipes.controller.js";
const router = Router();
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "src/public/assets/RecipeHeaders";
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });
const fileUploaded = upload.single("img");

router.post("/posts", RecipeController.getRecipePosts);
router.post("/", RecipeController.createRecipePost);
router.post("/addReview", RecipeController.addReview);
router.get("/:recipeId", RecipeController.getRecipePostById);
router.put("/", RecipeController.updateRecipePostsById);
router.delete("/", RecipeController.deleteRecipePostById);
router.put("/img", fileUploaded, RecipeController.putImage);

export default router;
