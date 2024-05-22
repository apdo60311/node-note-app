import { Router } from "express";
import AuthController from "../adapters/controllers/authController.js";
import UserController from "../adapters/controllers/userController.js";
const router = Router();

router.get("/profile", AuthController.verifyToken, UserController.profile);
router.put("/update", AuthController.verifyToken, UserController.update);
router.put(
  "/changePassword",
  AuthController.verifyToken,
  UserController.changePassword
);
router.post("/resetPassword", UserController.requestResetPassword);
router.put("/resetPassword/:token", UserController.resetPassword);
router.delete("/delete", AuthController.verifyToken, UserController.delete);

export default router;
