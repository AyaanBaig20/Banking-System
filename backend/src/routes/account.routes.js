import express from "express"
import authmiddleware from "../middleware/auth.middleware.js"
import accountController from "../controller/account.controller.js"

let router = express.Router()

// create account 
router.post("/create",authmiddleware.islogin,accountController.createAccount)

// check balance
router.get("/balance/:accountid",authmiddleware.islogin,accountController.CheckBalance)

// check accounts 
router.get("/check",authmiddleware.islogin,accountController.CheckAccount)

export default router