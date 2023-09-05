const express = require("express");
const {
  testMessage,
  getTeams,
  getEventTeams,
  getUserTeams,
  registerTeam,
  getTeamMembers,
  joinTeam,
  leaveTeam,
  deleteTeam
} = require("../controllers/teamsController");

const router = express.Router();

router.get("/", testMessage);
router.get("/all", getTeams);
router.post("/event", getEventTeams);
router.post("/user", getUserTeams);
router.post("/register", registerTeam);
router.post("/members", getTeamMembers);
router.post("/join", joinTeam);
router.post("/leave", leaveTeam);
router.post("/delete", deleteTeam);


module.exports = router;
