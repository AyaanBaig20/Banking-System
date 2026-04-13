import express from "express"
import authrouter from "./routes/auth.routes.js"
import accountrouter from "./routes/account.routes.js"
import transcationrouter from "./routes/transcation.routes.js"
import cookieParser from "cookie-parser"

let app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authrouter)
app.use("/api/account",accountrouter)
app.use("/api/transcation",transcationrouter)



export default app