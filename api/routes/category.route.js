import express from 'express'
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/category.controller.js'
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router()

router.get('/getCategories',getCategories)
router.post('/create',createCategory)
router.put('/update',updateCategory)
router.delete("/delete/:categoryId", verifyToken, deleteCategory);

export default router