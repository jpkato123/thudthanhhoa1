import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content || !req.body.category) {
    return next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id, //tu cookies
  });
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    next(error);
  }
};
export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTeam && {
        $or: [
          { title: { $regex: req.query.searchTeam, $options: "i" } }, //ko phan biet chu hoa thuong
          { content: { $regex: req.query.searchTeam, $options: "i" } }, //ko phan biet chu hoa thuong
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth()-1,
      now.getDate()
    )
    const lastMonthPosts = await Post.countDocuments({createdAt: {$gte: oneMonthAgo}});
    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    })
  } catch (error) {
    next(error);
  }
};