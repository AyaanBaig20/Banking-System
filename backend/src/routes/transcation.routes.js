import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import transcationController from "../controller/transcation.controller.js"
let router = express.Router()

router.post("/create",authMiddleware.islogin,transcationController.createTranscation)

router.post("/system/funds",authMiddleware.isSystemUser,transcationController.SystemFunds)

export default router