import { Router } from "express";

import * as AuthCtrl from "../controllers/auth.controllers.js";
import { checkDuplicateUsernameOrEmail } from "../middlewares/index.js";

const router = Router();

router.post("/singUp", checkDuplicateUsernameOrEmail, AuthCtrl.signUp);
router.post("/signIn", AuthCtrl.signIn);
router.post("/token", AuthCtrl.getUserByToken);
router.post("/changePassword", AuthCtrl.changePassword);

export default router;
