const { User } = require("./../database/models")
const bcrypt = require("bcryptjs")

const authController = {
    login: (req, res)=>{
        const loginForm = {
            email:req.body.username,
            password:req.body.password
        }
    },

    register: (req, res)=>{

    }
}

module.exports= authController