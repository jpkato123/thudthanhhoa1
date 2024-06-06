import { errorHandler } from "../utils/error.js";

export const createBill = async (req, res, next) => {
    if(req.user.id !== req.userId) {
        return next(errorHandler(404,"ban can dang nhap de thanh toan"))
    }
    try {
        
    } catch (error) {
        next(error)
    }
};
