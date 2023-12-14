import express from "express";
import { authMiddleware } from "../middlewares/authToken";
import {
  DeleteOneCustomer,
  createCustomer,
  getAllCustomer,
  getOneCustomer,
  updateOneCustomer,
} from "../controllers/CustomerController";

const router = express.Router();

router.post("", createCustomer);
router.get("", getAllCustomer);
router.get("/:id", getOneCustomer);
router.put("/:id", updateOneCustomer);
router.delete("/:id", DeleteOneCustomer);

export default router;
