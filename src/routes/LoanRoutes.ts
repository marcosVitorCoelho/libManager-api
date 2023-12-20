import express from "express";
import { authMiddleware } from "../middlewares/authToken";
import {
  createLoan,
  getAllLoans,
  getOneLoan,
  updateOneLoan,
  deleteOneLoan
} from "../controllers/LoanController";

const router = express.Router();

router.post("", createLoan);
router.get("", getAllLoans);
router.get("/:id", getOneLoan);
router.put("/:id", updateOneLoan);
router.delete("/:id", deleteOneLoan);

export default router;
