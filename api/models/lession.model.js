import mongoose from "mongoose";

const lessionSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    lessionName: {
        type: String,
        required: true,
        uniquired: true,
    },
    description: {
        type: String,
        required: true,

    },
    content: {
        type: String,
        required: true
    },
    linkUrl: {
        type: String,
        required: true
    }
},{timestamps: true})

const Lession = mongoose.model("Lession",lessionSchema)

export default Lession