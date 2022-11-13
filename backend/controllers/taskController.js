const { TaskStatus ,Task, sequelize } = require("./../database/models")
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const createHttpError = require("http-errors");
const link = "http://localhost:3000/"

const taskController = {
    taskList: catchAsync(async (req, res, next) => {
        try {
            const user = req.user
            const userId = req.query.userId || user.id
            let condition = { userId: userId }

            if (user.role == "admin" && req.query.userId == undefined) {
                condition = 1
            }

            const response = await Task.findAll({
                where: condition,
                include: [
                    {
                        association: "TaskStatus",
                        attributes: ["id", "status", "description"]
                    }
                ],
                attributes: ["id", "tittle", "description", "expirationDate", [sequelize.fn("CONCAT", link, "task/", sequelize.col("task.id")), "detail"], "userId"]
            })

            const count = await Task.count({ where: condition })

            if (req.query.userId && response[0]) {
                if ((response[0].dataValues.userId != user.id) && user.role != "admin") {
                    return endpointResponse({
                        res,
                        code: 401,
                        message: "you don't have permissions",
                    })
                }
            }
            
            const categories = await TaskStatus.findAll({attributes:["id","status","description"]})

            return endpointResponse({
                res,
                message: "tasks received sucefull",
                body: {
                    count,
                    categories,
                    tasks: response
                }
            })
        } catch (err) {
            console.log(err);
            const httpError = createHttpError(
                err.statusCode,
                `[Error retrieving index] - [index - GET]: ${err.message}`
            );
            next(httpError);
        }
    }),

    taskDetail: catchAsync(async (req, res, next) => {
        try {
            const user = req.user
            const taskId = req.params.id
            const linkUser = [sequelize.fn("CONCAT", link, "user/", sequelize.col("user.id")), "detail"]

            const response = await Task.findOne({
                where: { id: taskId },
                attributes: { exclude: ["taskStatusId", "userId", "UserId"] },
                include: [
                    { "association": "User", attributes: ["id", "userName", "email", linkUser] },
                    { "association": "TaskStatus", attributes: { exclude: ["createdAt", "updatedAt"] } }
                ]
            })
            if (response == null) {
                return endpointResponse({
                    res,
                    message: "task dont exist",
                    body: null
                })
            }
            if (response.User.id == user.id || user.role == "admin") {
                endpointResponse({
                    res,
                    message: "task received sucefull",
                    body: response
                })
            } else {
                endpointResponse({
                    res,
                    code: 401,
                    message: "you don't have permissions"
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

    taskCreate: catchAsync(async (req, res, next) => {
        try {
            if (!req.body.tittle) {
                return endpointResponse({
                    res,
                    message: "the tittle field not be empty",
                    code: 400
                })
            }

            const user = req.user
            const task = {
                tittle: req.body.tittle,
                description: req.body.description,
                taskStatusId: 1,
                expirationDate: req.body.expirationDate,
                userId: user.id
            }
            const response = await Task.create(task)
            endpointResponse({
                res,
                message: "task created sucefull",
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving index] - [index - GET]: ${error.message}`
            );
            next(httpError);
        }
    }),

    taskDelete: catchAsync(async (req, res, next) => {
        try {

            const user = req.user
            const taskId = req.params.id
            const response = await Task.findOne({ where: { id: taskId } })
            if (response.dataValues.userId != user.id && user.role != "admin") {
                return endpointResponse({
                    res,
                    message: "you don't have permissions",
                    code: 401
                })
            }
            const taskDeleted = await Task.destroy({
                where: {
                    id: taskId
                }
            })
            endpointResponse({
                res,
                message: "task created sucefull",
                body: taskDeleted
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving index] - [index - GET]: ${error.message}`
            );
            next(httpError);
        }
    }),

    taskUpdate: catchAsync(async (req, res, next) => {
        try {
            if (!req.body.tittle) {
                return endpointResponse({
                    res,
                    message: "the tittle field not be empty",
                    code: 400
                })
            }
            const task = {
                tittle: req.body.tittle,
                description: req.body.description,
                taskStatusId: req.body.taskStatusId,
                expirationDate: req.body.expirationDate
            }
            const taskId = req.params.id
            const user = req.user
            const response = await Task.findOne({ where: { id: taskId } })
            if (response.dataValues.userId != user.id && user.role != "admin") {
                return endpointResponse({
                    res,
                    message: "you don't have permissions",
                    code: 401
                })
            } else {

                const updatedTask = await Task.update(task, { where: { id: taskId } })
                endpointResponse({
                    res,
                    message: "task updated sucefull",
                    body: updatedTask
                })
            }
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving index] - [index - GET]: ${error.message}`
            );
            next(httpError);
        }
    }),
    taskRestore:catchAsync(async (req, res, next) => {
        try {
            //require an array
            const taskIds = JSON.parse(req.body.ids)
            const response = await Task.restore({where:{id:taskIds}})
            endpointResponse({
                res,
                message: "task restored sucefull",
                body: response
            })
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error retrieving index] - [index - GET]: ${error.message}`
            );
            next(httpError);
        }
        })
}

module.exports = taskController