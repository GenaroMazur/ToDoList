const { User } = require("./../database/models")
const bcrypt = require("bcryptjs")

const authController = {
    login: async (req, res)=>{
        res.json({
            status:200,
            token:req.token
        })
    },

    register: (req, res)=>{

    }
}

module.exports= authController