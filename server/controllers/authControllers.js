const Users = require("../models/User");
//const { sendEmailNotif_HTML, sendEmailNotif_Text } = require("../utils/mailer");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const nodemailer = require("nodemailer");

const testMessage = async (req, res) => {
  try {
    res.json({ message: "Revels Authentication API" });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

const signup = async (req, res) => {
  const {
    name,
    email,
    password: plainTextPassword,
    reg_no,
    isMAHE,
    phone_no,
    college,
  } = req.body;
  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    if (!name || typeof name !== "string") {
      return res.json({ status: "name error", error: "Enter a valid name" });
    }
    if (!email || typeof email !== "string" || email.indexOf("@") == -1) {
      return res.json({ status: "email error", error: "Enter a valid email" });
    }

    if (!plainTextPassword || typeof plainTextPassword !== "string") {
      return res.json({ status: "pass error", error: "Enter Password" });
    }
    if (plainTextPassword.length < 6) {
      return res.json({
        status: "pass error",
        error: "Password should be atleast 6 characters long.",
      });
    }
    const userIds = await Users.find({}, { delegateId: 1 })
      .sort({ delegateId: -1 })
      .limit(1);
    let userId = 100001;
    if (userIds[0]) {
      userId = userIds[0].delegateId + 1;
    }
    const response = await Users.create({
      name,
      email,
      password,
      isMAHE,
      reg_no,
      phone_no,
      college,
      delegateId: userId,
    });
    const user = {
      name,
      email,
      isMAHE,
      reg_no,
      userId,
      college,
    };
  
    // const url = process.env.BASE_URL||"http://localhost:3000/";
    const url = "http://localhost:3000/";
    const link = url + "api/auth/verify/" + response._id;
    const subject = "Revels 2023 Email Verifications";
    const message = "Please click on this link to verify your account: " + link;
    const sent = await sendEmailNotif_Text(email, subject, message);
    if (sent.success == true) {
      res.json({ status: "success", error: "", data: sent });
    } else {
      res.json({ status: "Error", error: sent.error, data: sent });
    }
  } catch (error) {
    console.log(error);
    if ((error.code = 11000)) {
      return res.json({
        status: "error",
        error: "Incorrect information",
      });
    }
    throw error;
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || typeof email !== "string" || email.indexOf("@") == -1) {
    return res.json({ status: "email error", error: "Enter a valid email id" });
  }
  if (!password || typeof password !== "string") {
    return res.json({ status: "pass error", error: "Enter a valid password" });
  }

  const user = await Users.findOne({ email }).lean();
  if (!user) {
    return res.json({
      status: "email error",
      error: "User does not exist!",
      data: "",
    });
  } else {
    if (await bcrypt.compare(password, user.password)) {
      if (!user.verified) {
        return res.json({
          status: "error",
          error: "Not Verified",
          data: "",
        });
      }
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          delegateId: user.delegateId,
          isAdmin: user.isAdmin
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
};

const verify = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findOne({ id }).lean();
    if (!user) {
      return res.json({
        status: "userId Error",
        error: "User does not exist!",
        data: "",
      });
    }
    const updatedUser = await Users.updateOne(
      { _id: id },
      {
        $set: {
          verified: true,
        },
      }
    );
    res.send("Account Verified Successfully!");
  } catch (err) {
    console.log(err);
    return res.json({ status: "Error", error: "Invalid User" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email }).lean();
  if (!user) {
    return res.json({
      status: "error",
      error: "User does not exist!",
      data: "",
    });
  } else {
    const secret = process.env.JWT_SECRET + user.password;
    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(payload, secret, { expiresIn: "15m" });

    // let link = process.env.BASE_URL||"http://localhost:3000/";
    let link = 'http://localhost:3000/';
    link += `/reset/${user._id}/${token}`;
    const subject = "Revels 2023 : Reset Password";
    const message = "Here's your Password Reset Link: " + link;

    const mailResponse = await sendEmailNotif_Text(email, subject, message);
    if (mailResponse.success == true) {
      res.json({ status: "success", error: "", data: mailResponse });
    } else {
      res.json({ status: "Error", error: mailResponse.error, data: mailResponse });
    }
  }
};

const resetPassword = async (req, res) => {
  const { id, pass } = req.body;
  const user = await Users.findOne({ id }).lean();
  if (!user) {
    return res.json({
      status: "error",
      error: "User does not exist!",
      data: "",
    });
  } else {
    try {
      const hash_password = await bcrypt.hash(pass, 10);
      const updatedUser = await Users.updateOne(
        { _id: id },
        {
          $set: {
            password: hash_password,
          },
        }
      );
      res.json({ status: "success", error: "", data: "" });
    } catch (error) {
      res.json({ status: "error", error: error.message, data: "" });
    }
  }
};

const getDetails = async (req, res) => {
  try {
    const token = req.params.token;
    var data = jwt_decode(token);
    const user = await Users.findOne({ _id: data.id });
    user.transactions = undefined;
    return res.json(user);
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err.message, data: "" });
  }
};

const getUsers = async (req, res) => {
  const users = await Users.find();
  res.json({ 'status': 'success', data: users });
}

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  testMessage,
  verify,
  getDetails,
  getUsers
};
