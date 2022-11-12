const { Task, sequelize } = require("./../database/models")
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const createHttpError = require("http-errors");

const taskController = {
    taskList:catchAsync(async (req, res, next) => {
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
                attributes:["id","tittle","description","expirationDate",[sequelize.fn("CONCAT",link,"task/",sequelize.col("task.id")),"detail"],"userId"]
            })

            const count = await Task.count({where:{userId:userId}})

            endpointResponse({
                res,
                message:"tasks received sucefull",
                body:{
                    count,
                    tasks:task
                }
            })
        } catch(err){
            const httpError = createHttpError(
                err.statusCode,
                `[Error retrieving index] - [index - GET]: ${err.message}`
            );
            next(httpError);
        }
    }),
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