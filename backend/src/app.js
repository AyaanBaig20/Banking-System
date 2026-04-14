import express from "express"
import authrouter from "./routes/auth.routes.js"
import accountrouter from "./routes/account.routes.js"
import transcationrouter from "./routes/transcation.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"

let app = express()
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,            
  })
);
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authrouter)
app.use("/api/account",accountrouter)
app.use("/api/transcation",transcationrouter)



export default app