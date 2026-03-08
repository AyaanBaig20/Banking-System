import mongoose from "mongoose"

let transcationSchema = new mongoose.Schema({
    fromAcc:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:true,
        index:true
    },
    toAcc:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:true,
        index:true
    },
    amount:{
        type:Number,
        default:0,
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Complete","Failed","Reversed"],
        default:"Pending"
    },
    idempotencyKey:{
        type:String,
        required:true,
        index:true,
        unique:true
    }
},{
    timestamps:true
})

let transcationModel = mongoose.model("transcation",transcationSchema)
export default transcationModel