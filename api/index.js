import express from 'express'
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import dotenv from "dotenv";


dotenv.config();
mongoose.connect(
  process.env.MONGODB
).then(()=>{
    console.log('mongodb is connected')
}).catch(err => {
    console.log(err)
});
const app = express();
app.use(express.json()) // cho phep hien thi json tren backend terminal

app.listen(3000,()=>{
    console.log("server running at port 3000 !")
})

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)