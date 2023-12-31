import express from "express";
import { loginUser, createUser } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authToken";

const router = express.Router();

router.post("/registeruser", createUser);
router.post("/login", loginUser);

export default router;
