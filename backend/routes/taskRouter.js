const express = require("express")
const router = express.Router()

const taskController = require("./../controllers/taskController")
const tokenAuthMiddleware = require("./../middlewares/tokenAuthMiddleware")
router.get("/",tokenAuthMiddleware.tokenVerification, taskController.taskList)
router.post("/",tokenAuthMiddleware.tokenVerification, taskController.taskCreate)
router.get("/:id",tokenAuthMiddleware.tokenVerification, taskController.taskDetail)
router.put("/:id",tokenAuthMiddleware.tokenVerification, taskController.taskUpdate)
router.delete("/:id",tokenAuthMiddleware.tokenVerification, taskController.taskDelete)

module.exports=router