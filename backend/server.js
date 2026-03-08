import app from "./src/app.js"
import dotenv from "dotenv"
import connectdb from "./src/db/db.js"

dotenv.config()

connectdb() 

app.listen(3000,()=>{
    console.log("server started")
})