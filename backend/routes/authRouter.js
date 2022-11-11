const express = require("express")
const router = express.Router()

const authController = require("./../controllers/authController")
const loginValidation = require("./../middlewares/loginValidationMiddleware")

router.post("/login",loginValidation.formValidation,loginValidation.errorHandler , authController.login)
router.post("/register", authController.register)

module.exports=router