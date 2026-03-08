import mongoose from "mongoose";

function connectdb() {
 mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("db connect")
 })   
}
export default connectdb