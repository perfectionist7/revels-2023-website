const Events = require("../models/Event");
const Users = require("../models/User");
const Teams = require("../models/Team");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

const { getCSVfromJSON } = require("../utils/jsonTocsv");

const testMessage = async (req, res) => {
    try {
        res.json({ message: "Revels Event API" });
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

// Get All Active Events
const getEvents = async (req, res) => {
    try {
        const events = await Events.find({ isActive: true });
        res.json({ status: "success", error: "", data: events });
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

const getSpecificEvents = async (req, res) => {
    try {
        let result = await Events.find({
            isActive: true,
            $or: [
                { eventTitle: { $regex: req.params.key, $options: "i" } },
                { category: { $regex: req.params.key, $options: "i" } },
                // {eventTags:{$regex:req.params.key,$options: "i",}}
            ],
        });
        res.send(result);
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

const getSportsEvents = async (req, res) => {
    try {
        const result = await Events.find({
            isActive: true,
            isSportsEvent: true,
        });
        res.send(result);
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

// Get participants for an event
const getParticipants = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Events.findOne({ eventId: eventId });
    // Will give a list of Team IDs if team event
    const delegateIds = event.participants;
    console.log(delegateIds);
    const users = await Users.find({ delegateId: { $in: delegateIds } });
    res.json({ status: "success", error: "", data: users });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
}

// Gets participants info in CSV format
const getParticipantInfoCSV = async (req, res) => {
    try {
        const { eventId } = req.body;
        const event = await Events.findOne({ eventId: eventId });
        const participant_ids = event.participants;

        const participants_data = [];
        let fields = [];
        if (event.isTeamEvent) {
            for (var i in participant_ids) {
                let team = await Teams.findOne({ teamId: participant_ids[i] });
                if (!team) {
                    res.json({ success: false, message: "team not found" });
                }
                let delegateIds = team.members;
                let teamSize = delegateIds.length;

                //Will try making this cleaner later, might add a team leader and share his details instead
                names = [];
                emails = [];
                phone_nos = [];
                for (var j in delegateIds) {
                    let member = await Users.findOne({ delegateId: delegateIds[i] });
                    names.push(member.name);
                    emails.push(member.email);
                    phone_nos.push(member.phone_no);
                }
                participants_data.push({
                    teamID: team.teamId,
                    teamSize,
                    delegateIds,
                    names,
                    emails,
                    phone_nos,
                });
            }
            fields = [
                "teamID",
                "teamSize",
                "delegateIds",
                "names",
                "emails",
                "phones",
            ];
        } else {
            for (var i in participant_ids) {
                let participant = await Users.findOne({
                    delegateId: participant_ids[i],
                });
                // console.log(participant);
                let participant_detail = {
                    delegateId: participant.delegateId,
                    name: participant.name,
                    email: participant.email,
                    phone_no: participant.phone_no,
                    //participant college
                };
                participants_data.push(participant_detail);
            }
            fields = ["delegateId", "name", "email", "phone"];
        }
        const csv = getCSVfromJSON(fields, participants_data);
        //add college if required

        res.json({
            status: "success",
            message: "Got CSV file",
            data: csv,
        });
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

// Creates a single Event
const createEvent = async (req, res) => {
    try {
        console.log(req.body);
        const {
            eventTitle,
            eventMode,
            eventDescription,
            category,
            isTeamEvent,
            isSportsEvent,
            isFlagshipEvent,
            isActive,
            participants,
            eventDateTime,
            eventVenue,
            registrationDeadline,
            max_capacity,
            prizePool,
            eventTags,
            eventHeads,
        } = req.body;

        const cat_events = await Events.find({ category: category });
        let cat_size = 100 + cat_events.length + 1;
        let eventInitials = `${category[0] || "R"}${category[1] || "E"}${category[2] || "V"
            }${category[category.length - 1] || "V"}`;
        eventInitials += cat_size;
        let eventId = eventInitials.toUpperCase();

        const response = await Events.create({
            eventId,
            eventTitle,
            eventMode,
            eventDescription,
            category,
            isSportsEvent,
            isTeamEvent,
            isFlagshipEvent,
            isActive,
            participants,
            eventDateTime,
            eventVenue,
            registrationDeadline,
            max_capacity,
            prizePool,
            eventTags,
            eventHeads,
        });
        console.log(`${eventId} ${eventTitle} added to the DB`);
        return res.json({ status: "success", error: "", data: response });
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

const updateEvent = async (req, res) => {
    try {
        // updatedData should be JSON object with all fields and cooresponding values to be updated
        const { eventId, updatedData } = req.body;
        const result = await Events.updateOne(
            { eventId: eventId },
            { $set: updatedData }
        );
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        const result = Events.deleteOne({ eventId: eventId });
        if (result.deletedCount === 1) {
            res.json({ status: "success", error: "", data: result });
        } else {
            res.json({ status: "failure", error: "No matching event id", data: "" });
        }
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

const participateInEvent = async (req, res) => {
    try {
        const { eventId, token } = req.body;
        var data = jwt_decode(token);
        console.log(data);
        const user = await Users.findOne({ _id: data.id });
        const event = await Events.findOne({ eventId });

        var participants = event.participants;
        participants.push(user.delegateId);

        var participating_in = user.participating_in;
        if (participating_in.includes(eventId)) {
            res.json({
                status: "failure",
                error: "user has already registered for the event",
                data: {
                    participating_in: user.participating_in,
                },
            });
        } else {
            participating_in.push(eventId);
            const updated_event = await Events.findOneAndUpdate(
                { eventId },
                { participants }
            );
            const updated_user = await Users.findOneAndUpdate(
                { delegateId: user.delegateId },
                { participating_in }
            );
            console.log(participants);
            console.log(`${user.name} registered for ${event.eventId}`);
            res.json({
                status: "success",
                error: "",
                data: {
                    participating_in: updated_user.participating_in,
                },
            });
        }
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};
//get single event
const getSingleEvent = async (req, res) => {
    try {
        const id = req.params.id;
        const event = await Events.findOne({ _id: id });
        res.json({ status: "success", error: "", data: event });
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

// register in event
const registerInEvent = async (req, res) => {
    try {
        const { eventId, delegateId } = req.body;
        const event = await Events.findOne({ eventId });
        let participants = event.participants;
        participants = [...participants, delegateId];
        const result = await Events.updateOne(
            { eventId: eventId },
            { $set: { participants: participants } }
        );
        const user = await Users.findOne({ delegateId });
        console.log("USER", user);
        const eventList = user.participating_in;
        participating_in = [...eventList, eventId];
        console.log("Events:", participating_in);
        const userResult = await Users.updateOne(
            { delegateId: delegateId },
            { $set: { participating_in: participating_in } }
        );

        res.json({ status: "success", error: "", data: userResult });
    } catch (err) {
        console.log(err);
        res.json({ message: err });
    }
};

const deactivateEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        let event = await Events.findOneAndUpdate({ eventId }, { isActive: false });
        return res.json({ status: "success", error: "", data: eventId + " deactivated" });
    } catch (err) {
        return res.json({
            status: "error",
            error: "Event Not Found",
            data: "",
        });
    }
}

const activateEvent = async (req, res) => {
    try {
        const { eventId } = req.body;
        let event = await Events.findOneAndUpdate({ eventId }, { isActive: true });
        return res.json({ status: "success", error: "", data: eventId + " activated" });
    } catch (err) {
        return res.json({
            status: "error",
            error: "Event Not Found",
            data: "",
        });
    }
}
// TODO
// Add a controller to create multiple events from a csv

const scoreEvent = async (req, res) => {
  const { eventId, scores, teamId } = req.body;
  // Format of score in request body
  /*
    scores= {
      c1: 100,
      c2: 80,
      c3: 75,
  };
*/
  // Format in which scores is stored in schema
  /*
  let scoreInSchema={
      teamId1 : [
        {
          "c1": 96,
          "c2":78,
          "c3":85
        },
        {
          "c1": 96,
          "c2":78,
          "c3":85
        },
        {
          "c1": 96,
          "c2":78,
          "c3":85
        },
      ],
      teamId2 : [
        {
          "c1": 96,
          "c2":78,
          "c3":85
        },
        {
          "c1": 96,
          "c2":78,
          "c3":85
        }.
        {
          "c1": 96,
          "c2":78,
          "c3":85
        },
      ]
    }
  */
// no. of criteria integer , [String] Name of critera, 
  const event = Events.findOne({ eventId: eventId });

  let currentScores = event.scores;
  
    if (currentScores[teamId]) {
      currentScores[teamId].push(scores[teamId]);
    } else {
      let tempArr = [scores[teamId]];
      currentScores[teamId] = tempArr;
    }


  const result = await Events.updateOne(
    { eventId: eventId },
    { $set: { scores: currentScores } }
  );
  res.json({ status: "success", error: "", data: result });
};

module.exports = {
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
    activateEvent,
    deactivateEvent,
    scoreEvent
};
