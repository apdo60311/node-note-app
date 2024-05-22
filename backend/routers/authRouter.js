import { Router } from "express";
import AuthController from "../adapters/controllers/authController.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/login", (req, res) =>
  res.sendFile(
    "C://Users/Lenovo/Desktop/notes-node-app/backend/static/login.html"
  )
);
router.post("/logout", AuthController.verifyToken, AuthController.logout);

export default router;
