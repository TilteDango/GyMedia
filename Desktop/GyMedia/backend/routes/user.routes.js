import { Router } from "express";
import * as UserCtrl from "../controllers/user.controllers.js";
const router = Router();
import fileUploaded from "../middlewares/Uploads/AvatarUpload.js";
import fileUploadMiddleware from "../middlewares/Uploads/FileUpload.js";
import backgroundUploadImage from "../middlewares/Uploads/BackgroundUpload.js";

router.post("/avatar", fileUploaded, UserCtrl.updateAvatarImage);
router.post(
  "/background",
  backgroundUploadImage,
  UserCtrl.updateBackgroundImage
);
router.post("/edit", UserCtrl.updateUserInfo);
router.get("/getInfo/:userId", UserCtrl.getUserInfo);
router.get("/getInfoByUsername/:username", UserCtrl.getUserInfoByUserName);
router.get("/changeInfo", UserCtrl.updateUserInfo);
router.post("/addShopping", UserCtrl.addToShoppingList);
router.get("/ShoppingList", UserCtrl.getShoppingList);

export default router;
