import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewares";

const router = Router();

router.post(
  "/register",
  userMiddleware.isValidCreate,
  userMiddleware.getDynamicallyAndTrow("email", "body"),
  authController.register
);
router.post(
  "/login",
  userMiddleware.isValidLogin,
  userMiddleware.getDynamicallyOrTrow("email"),
  authController.login
);
router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

export const authRouter = router;
