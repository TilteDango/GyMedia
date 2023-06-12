import { Router } from "express";
import * as StripeCtrl from "../controllers/stripe.controllers.js";
const router = Router();

router.post("/payment", StripeCtrl.payments);

export default router;
