const Admins = require("../models/Admin");
const Users = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const testMessage = async (req, res) => {
    try {
        res.json({ message: "Revels Admin API" });
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

function generateRandomString(length) {
    return Array(length).fill(null).map(() => Math.random().toString(36)[2]).join('');
}

const createAdmin = async (req, res) => {
    const { category, password: plainTextPassword, superPass } = req.body;
    try {
        let userID = generateRandomString(7);
        userID += `@${category}`;
        const password = await bcrypt.hash(plainTextPassword, 10);

        if (process.env.SYSADPASS == superPass) {
            const admin = await Admins.create({
                category, userID, password
            });
            return res.json({ status: "success", error: "", data: admin });
        } else {
            return res.json({ status: "error", error: "Access Denied", data: "" });
        }
    } catch (err) {
        console.log(err);
        res.json({ status: "error", error: err.message, data: "" });
    }
}

const adminLogin = async (req, res) => {
    const { userID, password } = req.body;
    const admin = await Admins.findOne({ userID });
    if (!admin) {
        return res.json({
            status: "error",
            error: "Admin does not exist!",
            data: "",
        });
    } else {
        if (await bcrypt.compare(password, admin.password)) {
            if (!admin.isActive) {
                return res.json({
                    status: "error",
                    error: "Admin Access Denied",
                    data: "",
                });
            }
            const token = jwt.sign(
                {
                    id: admin._id,
                    category: admin.category,
                    userID: admin.userID,
                },
                process.env.JWT_SECRET
            );
            var payload = jwt_decode(token);

            return res.json({ status: "success", error: "", data: payload, token });
        } else {
            return res.json({
                status: "error",
                error: "Incorrect Password",
                data: "",
            });
        }
    }
}

const deactivateAdmin = async (req, res) => {
    try {
        const { userID, superPass } = req.body;
        if (process.env.SYSADPASS == superPass) {
            let admin = await Admins.findOneAndUpdate({ userID }, { isActive: false });
            return res.json({ status: "success", error: "", data: admin });
        } else {
            return res.json({ status: "error", error: "Access Denied", data: "" });
        }
    } catch (err) {
        return res.json({
            status: "error",
            error: "Access Denied",
            data: "",
        });
    }
}

const activateAdmin = async (req, res) => {
    try {
        const { userID, superPass } = req.body;
        if (process.env.SYSADPASS == superPass) {
            let admin = await Admins.findOneAndUpdate({ userID }, { isActive: true });
            return res.json({ status: "success", error: "", data: admin });
        } else {
            return res.json({ status: "error", error: "Access Denied", data: "" });
        }
    } catch (err) {
        return res.json({
            status: "error",
            error: "Access Denied",
            data: "",
        });
    }
}

const blacklistParticipant = async (req, res) => {
    try {
        const { reg_no, delegateId } = req.body;
        let user = await Users.findOneAndUpdate({ reg_no, delegateId }, { isBlacklisted: true });
        return res.json({ status: "success", error: "", data: { email: user.email }, message: `${reg_no} ${delegateId} blacklisted!` });
    } catch (err) {
        return res.json({
            status: "error",
            error: "Access Denied",
            data: "",
        });
    }
};

const unBlacklistParticipant = async (req, res) => {
    try {
        const { reg_no, delegateId } = req.body;
        let user = await Users.findOneAndUpdate({ reg_no, delegateId }, { isBlacklisted: false });
        
        return res.json({ status: "success", error: "", data: { email: user.email }, message: `${reg_no} ${delegateId} unblacklisted!` });
    } catch (err) {
        return res.json({
            status: "error",
            error: "Access Denied",
            data: "",
        });
    }
};

const getBlacklistedParticipants = async (req, res) => {
    try {
        let users = await Users.find({isBlacklisted: true});
        return res.json({ status: "success", error: "", data: users});
    } catch (err) {
        return res.json({
            status: "error",
            error: "Access Denied",
            data: "",
        });
    }
};


const getDetails = async (req, res) => {
    try {
        const token = req.params.token;
        var data = jwt_decode(token);
        console.log(data)
        const user = await Admins.findOne({ _id: data.id });
        user.transactions = undefined;
        return res.json(user);
    } catch (err) {
        console.log(err);
        res.json({ status: "error", error: err.message, data: "" });
    }
};

const getAdmins = async (req, res) => {
    const admins = await Admins.find();
    res.json({ 'status': 'success', data: admins });
}

module.exports = {
    createAdmin,
    adminLogin,
    testMessage,
    getDetails,
    getAdmins,
    deactivateAdmin,
    activateAdmin, 
    blacklistParticipant,
    unBlacklistParticipant, 
    getBlacklistedParticipants
};
