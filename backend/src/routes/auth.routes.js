import express from "express"
import authController from "../controller/auth.controller.js"
let router = express.Router()

// register
router.post("/register",authController.userRegister)

router.post("/login",authController.userLogin)

export default router