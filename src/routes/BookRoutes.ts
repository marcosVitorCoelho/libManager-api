import express from "express";
import { authMiddleware } from "../middlewares/authToken";
import {
  deleteOneBook,
  createBook,
  getAllBooks,
  getOneBook,
  updateOneBook,
} from "../controllers/BookController";

const router = express.Router();

router.post("", createBook);
router.get("", getAllBooks);
router.get("/:id", getOneBook);
router.put("/:id", updateOneBook);
router.delete("/:id", deleteOneBook);

export default router;
