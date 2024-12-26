import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    plan: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        default: 5
    },
    payment: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
)

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);

export default Transaction;