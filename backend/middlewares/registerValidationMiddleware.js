const { body, validationResult } = require("express-validator")
const {User} = require("./../database/models")

const registerValidationMiddleware = {
    formValidation: [
        body("username")
            .notEmpty().withMessage("the field username not be empty").bail()
            .isLength({min:5,max:15}).withMessage("min 5 characters and max 15 characters").bail(),
        body("email")
            .notEmpty().withMessage("the field email not be empty").bail()
            .isEmail().withMessage("is not a email").bail()
            .custom(async(value,{req})=>{
                const email=value
                await User.findOne({where:{email:email}})
                .then(user=>{
                    if(user!=null){
                        throw new Error("email already exist")
                    }else {
                        return true
                    }
                })
            }),
        body("password")
            .notEmpty().withMessage("the field password not be empty").bail()
            .isLength({min:8}).withMessage("min 8 characters"),
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

module.exports= registerValidationMiddleware