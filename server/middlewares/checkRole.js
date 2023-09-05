// verify admin categor
const Admins = require("../models/Admin");
const jwt = require("jsonwebtoken");


//takes array of roles as param
function checkAdminRoles(roles) {
    return async function (req, res, next) {
        try {
            console.log("Head",req.headers)
            const token = req.headers.authorization.split(' ')[1];
            let payload = jwt.verify(token, process.env.JWT_SECRET);
            let admin = await Admins.findOne({ userID: payload.userID });
            if (!roles.includes(admin.category)) {
                return res.send({
                    success: false,
                    msg: "Access Denied",
                });
            } else {
                next();
            }
        } catch (err) {
            console.log(err);
            if (err.name == "TokenExpiredError") {
                console.log("Token Expired");
                return res.send({
                    success: false,
                    msg: "Token Expired,Please Login Again",
                });
            }
            return res
                .status(500)
                .send({ success: false, msg: "Internal Server Error" });
        }

    }
}

module.exports = { checkAdminRoles };