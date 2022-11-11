const express = require("express")
const router = express.Router()

const testController = require("./../controllers/testController")
router.get("/",testController)

const authRoutes = require("./authRouter")
router.use("/auth",authRoutes)

const taskRoutes = require("./taskRouter")
router.use("/task",taskRoutes)

module.exports = router