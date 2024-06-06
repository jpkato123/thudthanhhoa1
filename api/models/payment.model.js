import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
    },
    userId: {
        type:String,
        required: true,

    },
    total: {
        type: Number,
        default: 0
    },
    memo: {
        type: String,
        default:"ghi chu",
    },
    paymentMethod: {
        type: Array,
        default: ["Cash","Bank Transfer"]
    },
    status: {
        type: Array,
        default: ["No Pay","Paid","Confirming"]
    },
})

const Payment = mongoose.model("Payment",paymentSchema)

export default Payment;