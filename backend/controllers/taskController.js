const { Task, sequelize } = require("./../database/models")
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const createHttpError = require("http-errors");
const link = "http://localhost:3000/"

const taskController = {
    taskList:catchAsync(async (req, res, next) => {
        try{
            const user = req.user
            const userId = req.query.userId || req.user.id
            let condition={userId:userId}

            if(user.role=="admin" && req.query.userId==undefined){
                condition=1
            } 
            
            const response = await Task.findAll({
                where:condition,
                include:[
                    {
                        association:"TaskStatus",
                        attributes:["id","status","description"]
                    }
                ],
                attributes:["id","tittle","description","expirationDate",[sequelize.fn("CONCAT",link,"task/",sequelize.col("task.id")),"detail"],"userId"]
            })

            const count = await Task.count({where:condition})

            if(response.User.id==user.id || user.role == "admin"){
                endpointResponse({
                    res,
                    message:"task received sucefull",
                    body:{count,response}
                })
            }else {
                endpointResponse({
                    res,
                    code:401,
                    message:"you don't have permissions"
                })
            }
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

    taskDetail:catchAsync(async (req, res, next)=>{
            try {
                const user = req.user
                const taskId = 1
                const linkUser = [sequelize.fn("CONCAT",link,"user/",sequelize.col("user.id")),"detail"]

                const response = await Task.findOne({
                    where:{id:taskId},
                    attributes:{exclude:["taskStatusId", "userId","UserId"]},
                    include:[
                        {"association":"User", attributes:["id","userName","email",linkUser]},
                        {"association":"TaskStatus",attributes:{exclude:["createdAt","updatedAt"]}}
                    ]
                })

                if(response.User.id==user.id || user.role == "admin"){
                    endpointResponse({
                        res,
                        message:"task received sucefull",
                        body:response
                    })
                }else {
                    endpointResponse({
                        res,
                        code:401,
                        message:"you don't have permissions"
                    })
                    
                }
            } catch (error) {
                const httpError = createHttpError(
                    error.statusCode,
                    `[Error retrieving index] - [index - GET]: ${error.message}`
                );
                next(httpError);
            }
        })
    ,

    taskCreate:(req, res)=>{

    },

    taskDelete:(req, res)=>{

    },

    taskUpdate:(req, res)=>{

    }
}

module.exports=taskController