import express from "express"
import authmiddleware from "../middleware/auth.middleware.js"
import accountController from "../controller/account.controller.js"
import { rateLimit } from 'express-rate-limit'

// limiter 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    // store: ... , // Redis, Memcached, etc. See below.
})

let router = express.Router()

// create account 
router.post("/create",authmiddleware.islogin,accountController.createAccount)

// check balance
router.get("/balance/:accountid",authmiddleware.islogin,accountController.CheckBalance)

// check accounts 
router.get("/check",authmiddleware.islogin,limiter,accountController.CheckAccount)

export default router