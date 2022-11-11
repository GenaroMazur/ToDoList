const express = require("express")
const router = express.Router()

const taskController = require("./../controllers/taskController")

router.get("/",taskController.taskList)
router.post("/",taskController.taskCreate)
router.get("/:id",taskController.taskDetail)
router.put("/:id",taskController.taskUpdate)
router.delete("/:id",taskController.taskDelete)

module.exports=router