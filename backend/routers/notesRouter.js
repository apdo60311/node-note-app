import { Router } from "express";
import AuthController from "../adapters/controllers/authController.js";
import NoteController from "../adapters/controllers/noteController.js";

const router = Router();

router.post("/create", AuthController.verifyToken, NoteController.createNote);
router.get("/list", AuthController.verifyToken, NoteController.listNotes);
router.get("/get/:id", AuthController.verifyToken, NoteController.getNote);
router.put(
  "/update/:id",
  AuthController.verifyToken,
  NoteController.updateNote
);
router.delete(
  "/delete/:id",
  AuthController.verifyToken,
  NoteController.deleteNote
);

export default router;
