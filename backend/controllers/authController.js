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
        const hashedPass = bcrypt.hashSync(req.body.password)
        const user={
            userName:req.body.username,
            email:req.body.email,
            userPassword:hashedPass,
            roleId:2
        }
        User.create(user)
        .then(user=>{
            user.password=undefined
            res.json({
                status:200,
                body:user
            })
        })
        .catch(err=>{
            res.json({err})
        })
    }
}

module.exports= authController