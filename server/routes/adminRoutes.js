const express = require("express");
const {
    testMessage,
    createAdmin,
    adminLogin,
    getAdmins,
    deactivateAdmin,
    activateAdmin,
    getDetails,
    blacklistParticipant,
    unBlacklistParticipant,
    getBlacklistedParticipants
} = require("../controllers/adminControllers");
const { checkAdminRoles } = require("../middlewares/checkRole");

const router = express.Router();

router.get("/", testMessage);
router.get("/all", checkAdminRoles(["SC", "SYS"]), getAdmins);
router.get("/details/:token", getDetails);

//Admin Auth
router.post("/create-admin-sys", createAdmin);
router.post("/admin-login", adminLogin);

//Activate/Deactivate Admin Access Temporarily
router.put("/deactivate", checkAdminRoles(["SC", "SYS"]), deactivateAdmin);
router.put("/activate", checkAdminRoles(["SC", "SYS"]), activateAdmin);

//Blacklist Users
router.put("/blacklist",  blacklistParticipant);
router.put("/unblacklist", unBlacklistParticipant);
router.get("/get-blacklisted-all", checkAdminRoles(["SC", "SYS"]), getBlacklistedParticipants);

module.exports = router;

/*
{
    "category" : "SYS",
    "password" : "password",
    "superPass": "//get pass from env"
}
*/
