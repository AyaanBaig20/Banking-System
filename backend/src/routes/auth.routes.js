import express from "express"
import authController from "../controller/auth.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"
let router = express.Router()

// register
router.post("/register",authController.userRegister)

// login
router.post("/login",authController.userLogin)

// logout
router.get("/logout",authMiddleware.islogin,authController.logout)
export default router