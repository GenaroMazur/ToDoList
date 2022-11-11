const express = require("express")
const router = express.Router()

const authController = require("./../controllers/authController")
const loginValidation = require("./../middlewares/loginValidationMiddleware")
const registerValidationMiddleware = require("./../middlewares/registerValidationMiddleware")

router.post("/login", loginValidation.formValidation, loginValidation.errorHandler, authController.login)
router.post("/register", registerValidationMiddleware.formValidation, registerValidationMiddleware.errorHandler, authController.register)

module.exports = router