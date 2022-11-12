const { User } = require("./../database/models")
const bcrypt = require("bcryptjs")
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const createHttpError = require("http-errors");

const authController = {
    login: catchAsync(async (req, res, next) => {
        try{

            endpointResponse({
                res,
                status:200,
                message:"login user sucefull",
                token:req.token
            })
        } catch(err){
            const httpError = createHttpError(
                err.statusCode,
                `[Error retrieving index] - [index - GET]: ${err.message}`
            );
            next(httpError);
        }
    }),
    register:catchAsync(async (req, res, next) => {
        try{

            const hashedPass = bcrypt.hashSync(req.body.password)
            const user={
                userName:req.body.username,
                email:req.body.email,
                userPassword:hashedPass,
                roleId:2
            }
        const response = User.create(user)
            endpointResponse({
                res,
                status:200,
                message:"login register sucefull",
                token:response
            })
        } catch(err){
            const httpError = createHttpError(
                err.statusCode,
                `[Error retrieving index] - [index - GET]: ${err.message}`
            );
            next(httpError);
        }
    })
}

module.exports= authController