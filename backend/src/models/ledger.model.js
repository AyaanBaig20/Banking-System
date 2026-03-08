import mongoose from "mongoose";

let ledgerSchema = new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:true,
        index:true,
        immutable:true
    },
    amount:{
        type:Number,
          required:true,    
        immutable:true
    },
    transcation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"transcation",
        required:true,
        index:true,
        immutable:true
    },
    type:{
        type:String,
        required:true,
        enum:["Credit","Debit"],
        immutable:true,
    }
})

let ledgerModel = mongoose.model("ledger",ledgerSchema)
export default ledgerModel