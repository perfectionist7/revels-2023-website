const express = require("express");
const {
  testMessage,
  getEvents,
  getSpecificEvents,
  getParticipants,
  getParticipantInfoCSV,
  createEvent,
  updateEvent,
  deleteEvent,
  participateInEvent,
  getSingleEvent,
  registerInEvent,
  getSportsEvents,
  scoreEvent,
  activateEvent,
  deactivateEvent
} = require("../controllers/eventControllers");

const router = express.Router();


router.get("/", testMessage);

//Get Event Info
router.get("/all", getEvents);
router.get("/all/:key", getSpecificEvents);
router.get("/sports", getSportsEvents);
router.get("/:id", getSingleEvent);

// Get Participant Info
router.get("/participants", getParticipants);
router.get("/participants-csv", getParticipantInfoCSV);

// CRUD Events (Singular)
router.post("/create", createEvent);
router.post("/update", updateEvent);
router.post("/delete", deleteEvent);

// Event Participation
router.post("/register", registerInEvent);
router.post("/participate", participateInEvent);

//Judging
router.post("/score", scoreEvent);

//Event Control
router.put("/activate", activateEvent);
router.put("/deactivate", deactivateEvent);

//Route to upload multiple events from a csv

module.exports = router;

/*
{
    "eventTitle":"ChessMasters",
    "eventMode":"Offline",
    "eventDescription":"Better than Magnus Carlsen?????",
    "category":"CHESS",
    "isSportsEvent": true,
    "isTeamEvent": false,
    "isFlagshipEvent":false,
    "isActive":true,
    "eventDateTime": "2022-12-28T06:08:46.768+00:00",
    "eventVenue":"Quadrangle",
    "registrationDeadline":"2022-12-29T06:08:46.768+00:00",
    "max_capacity":20,
    "prizePool":8000,
    "eventTags":["poem", "magnus", "think", "sports", "chess"],
    "eventHeads":[{
        "name": "Joe Mama", 
        "phone_no":"9999900000",
        "email":"joe@gmail.com"
    }]
}
*/
