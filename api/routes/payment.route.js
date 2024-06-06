import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createBill } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create", verifyToken, createBill);

export default router;