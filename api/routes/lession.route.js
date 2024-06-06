import express from "express"
import { createLession, deleteLession, getLessions, updateLession } from "../controllers/lession.controller.js"


const router = express.Router()

router.get("/getLessions",getLessions)
router.post("/create",createLession)
router.put("/update",updateLession)
router.delete("/delete",deleteLession)

export default router