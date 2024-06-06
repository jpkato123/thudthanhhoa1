import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import categoryRoutes from "./routes/category.route.js";
import courseRoutes from "./routes/course.route.js";
import lessionRoutes from "./routes/lession.route.js";
import paymentRoutes from "./routes/payment.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from 'path';
import cors from 'cors'

dotenv.config();
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });
const __dirname = path.resolve();
const app = express();

app.use(express.json()); // cho phep hien thi json tren backend terminal
app.use(cookieParser());

app.listen(3000, () => {
  console.log("server running at port 3000 !");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/course",courseRoutes);
app.use("/api/lession",lessionRoutes);
app.use("/api/payment",paymentRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://threes-itvn.onrender.com");
  next();
});

app.use(
  cors({
    origin: "https://threes-itvn.onrender.com", //アクセス許可するオリジン
    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
    optionsSuccessStatus: 200, //レスポンスstatusを200に設定
  })
);
app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
