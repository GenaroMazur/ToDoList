const { body, validationResult } = require("express-validator")
const { User } = require("./../database/models")
const bcrypt = require("bcryptjs")
const loginValidation = {
    formValidation :[
        body("email")
            .notEmpty().withMessage("the email field not be empty").bail()
            .isEmail().withMessage("the email field is not email").bail()
            .custom(async(value, {req})=>{
                await User.findOne({where:{email:value}}).then(user=>{

                    if(user == null){
                        throw new Error("email not found")
                    }
                    req.foundUser = user
                    return true
                })
            }),
        body("password")
            .notEmpty().withMessage("the password field not be empty").bail()
            .custom((value, {req})=>{
                if(!req.foundUser){
                    return true
                }
                if(!bcrypt.compareSync(value, req.foundUser.dataValues.userPassword)){
                    throw new Error("Incorrect password")
                } else {
                    req.token=req.foundUser.generateAuthToken()
                    req.foundUser = undefined
                    return true
                }
            })
    ],

    errorHandler: (req, res, next)=>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.json({
                status:400,
                errors: errors.mapped()
            })
        } else {
            return next()
        }
    }
}

module.exports=loginValidation