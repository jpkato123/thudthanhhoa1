import Course from "../models/course.model.js";
import { errorHandler } from "../utils/error.js";

export const getCourses = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const courses = await Course.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.courseId && { _id: req.query.courseId }),
      ...(req.query.searchTerm && {
        $or: [
          { courseName: { $regex: req.query.searchTerm, $options: "i" } }, //ko phan biet chu hoa thuong
          { description: { $regex: req.query.searchTerm, $options: "i" } }, //ko phan biet chu hoa thuong
        ],
      }),
    })
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    // const totalLessons = await Course.lessionId.length;
    // const totalStudents = await Course.students.length;
    res.status(200).json({
      courses,
    });
  } catch (error) {
    next(error);
  }
};
export const registerCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return next(errorHandler(403, "khong co khoa hoc can dang ky"));
    }
    const studentIndex = course.students.indexOf(req.user.id);
    if (studentIndex === -1) {
      course.numberOfStudents += 1;
      course.students.push(req.user.id);
    } else {
      next(errorHandler(405, "ban da dang ky khoa hoc nay roi"));
    }
    await course.save();
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};
export const createCourse = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "ban khong co quyen tao khoa hoc"));
    }
    if (!req.body.courseName || !req.body.description || !req.body.category) {
      return next(errorHandler(404, "hay dien tat ca cac truong yeu cau"));
    }
    const slug = req.body.courseName
      .split(" ")
      .join("-")
      .replace(/[^a-zA-Z0-9]/g, "-");
    const newCourse = await Course({
      ...req.body,
      slug,
      userId: req.user.id,
    });
    try {
      const saveCourse = await newCourse.save();
      res.status(200).json(saveCourse);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
export const updateCourse = async (req, res, next) => {
  const editCourse = await Course.findById(req.params.courseId);
  if (!editCourse) {
    return next(errorHandler(403, "khong tim thay khoa hoc muon sua"));
  }
  if (!req.user.isAdmin && req.user.id !== editCourse.userId) {
    return next(errorHandler(404, "ban khong co quyen sua khoa hoc"));
  }
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.courseId,
      {
        $set: {
          courseName: req.body.courseName,
          description: req.body.description,
          youtubeLink: req.body.youtubeLink,
          cost: req.body.cost,
          category: req.body.category,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};
export const deleteCourse = async (req, res, next) => {
if(!req.user.isAdmin){
  return next(errorHandler(404,"ban khong co quyen xoa khoa hoc nay"))
}
try {
  await Course.findByIdAndDelete(req.params.courseId)
  res.status(200).json("deleted course")
} catch (error) {
  next(error)
}
};
