const express = require("express");
const {
  testMessage,
  signup,
  login,
  forgotPassword,
  resetPassword,
  verify,
  getDetails,
  getUsers
} = require("../controllers/authControllers");

const router = express.Router();

router.get("/", testMessage);

//Auth
router.post("/login", login);
router.post("/signup", signup);
router.get("/verify/:id", verify);

//Password Reset
router.post("/forgot", forgotPassword);
router.post("/reset", resetPassword);

//Get User Details
router.get("/details/:token", getDetails);
router.get("/getAll", getUsers);

module.exports = router;

/*
{
    "name": "",
    "email": "",
    "password": "",
    "isMAHE": true,
    "college": "MIT",
    "reg_no": "",
    "phone_no": 
}
*/
