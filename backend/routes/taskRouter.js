const express = require("express")
const router = express.Router()

const taskController = require("./../controllers/taskController")
const tokenAuthMiddleware = require("./../middlewares/tokenAuthMiddleware")
router.get("/",tokenAuthMiddleware,taskController.taskList)
router.post("/",taskController.taskCreate)
router.get("/:id",taskController.taskDetail)
router.put("/:id",taskController.taskUpdate)
router.delete("/:id",taskController.taskDelete)

module.exports=router