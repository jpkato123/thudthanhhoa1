import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    youtubeLink: {
        type: String,
        default: "https://www.youtube.com/embed/aYjFliqVFzc?si=hGGhx3R30Z_iC64L"
    },
    cost: {
        type: Number,
        default: 0
    },
    userId :{
        type:String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    slug: {
        type:String,
        default: ''
    },
    lessionId: {
        type: Array,
        default: []
    },
    students: {
        type: Array,
        default: []
    },
    numberOfStudents: {
        type: Number,
        default:0
    }
},{timestamps:true})

const Course = mongoose.model("Course",courseSchema)
export default Course