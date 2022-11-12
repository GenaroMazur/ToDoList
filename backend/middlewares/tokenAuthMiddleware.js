const { endpointResponse } = require("../helpers/success");
const JWT = require("jsonwebtoken")
const tokenAuthMiddleware = {

    tokenVerification: async (req, res, next) => {
        try {
            let token = req.header("Authorization")

            if (!token) {
                return endpointResponse({
                    res,
                    code: 403,
                    message: "No token"
                })
            } else {
                token = token.slice(7, token.length)
            }
            const decoded = await JWT.decode(token, process.env.SECRET_WORD)
            if (decoded == null) {
                return endpointResponse({
                    res,
                    code: 403,
                    message: "Invalid token"
                })
            } else {
                req.user = decoded
                next()
            }
        } catch (err) {
            console.log(err);
        }
    },
    adminUserVerification: (req, res, next) => {
        const user = req.user
        if (user.role == "admin") {
            next()
        } else {
            return endpointResponse({
                res,
                code: 401,
                message: "Unauthorized"
            })
        }
    }
}
module.exports = tokenAuthMiddleware
