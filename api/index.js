import express from 'express'
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js'
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

app.listen(3000,()=>{
    console.log("server running at port 3000 !")
})

app.use('/api/user',userRoutes)