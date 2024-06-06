import Category from '../models/category.model.js'
import { errorHandler } from '../utils/error.js';

export const getCategories = async (req, res, next) => {
    const categories = await Category.find()
    if(!categories) {
        return next(errorHandler(404,"category not found"))
    }
    res.status(200).json(categories)

};
export const createCategory = async (req, res, next) => {
    const {category} = req.body
try {
    const newCategory = new Category({category})
    await newCategory.save()
    res.status(200).json('create category successfully')
} catch (error) {
    next(error)
}
};
export const updateCategory = async (req, res, next) => {};
export const deleteCategory = async (req, res, next) => {
    try {
        const categoryToDelete = await Category.findById(req.params.categoryId);
        if(!categoryToDelete) {
            return next(errorHandler(403, 'cannot find category to delete'))
        }
        if(!req.user.isAdmin) {
            return next(errorHandler(404,'You are not oauth'))
        }
        await Category.findByIdAndDelete(req.params.categoryId)
        res.status(200).json('Delete successfully')
    } catch (error) {
        next(error)
    }
};
