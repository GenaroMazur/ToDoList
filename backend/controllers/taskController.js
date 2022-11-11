const { Task, sequelize } = require("./../database/models")

const taskController = {
    taskList:async(req, res)=>{
        try{

            req.userId = 1
            const userId = req.params.userId || req.userId
            const link = "http://localhost:3000/"
            
            const task = await Task.findAll({
                where:{
                    userId:userId
                },
                include:[
                    {
                        association:"TaskStatus",
                        attributes:["id","status","description"]
                    }
                ],
                attributes:["id","tittle","description","expirationDate",[sequelize.fn("CONCAT",link,"task/",sequelize.col("task.id")),"detail"]]
            })

            const count = await Task.count({where:{userId:userId}})

            return res.json({
                status:200,
                count,
                body:task
            })
        } catch (err) {
            return res.json({
                status:500,
                body:err
            })
        }
    },

    taskDetail:(req, res)=>{

    },

    taskCreate:(req, res)=>{

    },

    taskDelete:(req, res)=>{

    },

    taskUpdate:(req, res)=>{

    }
}

module.exports=taskController