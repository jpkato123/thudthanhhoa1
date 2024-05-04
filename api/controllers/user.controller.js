import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
export const test = (req, res) => {
  res.status(200).json({ message: "test api working " });
};
export const updateUser = async (req, res, next) => {
  // console.log(req.user) lay duoc userid tu verifyToken
  if (req.user.id !== req.params.userId) {
    //khi ham jwt.signin() luu la id chu ko phai _id
    return next(errorHandler(403, "ban khong co quyen update user khac"));
  }
  if (req.body.password) {
    if (req.body.password < 6) {
      return next(errorHandler(400, "Password phai dai it nhat 6 ky tu"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(errorHandler(400, "Username phai co do dai 7 den 20 ky tu"));
    }
    if (req.body.username.includes(" ")) {
      return next(
        errorHandler(400, "Username khong duoc chua khoang trang o giua")
      );
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(
        errorHandler(400, "Username chi gom chu thuong khong viet hoa")
      );
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, "username cho phép gồm chữ cái và số"));
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true } //send back new info
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
