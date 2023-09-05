const Teams = require("../models/Team");
const Events = require("../models/Event");
const Users = require("../models/User");

const testMessage = async (req, res) => {
  try {
    res.json({ message: "Revels Teams API" });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

// Get All Registered Teams
const getTeams = async (req, res) => {
  try {
    const teams = await Teams.find();
    res.json({ status: "success", error: "", data: teams });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

// Get teams registered for a particular event
const getEventTeams = async (req, res) => {
  try {
    const { eventId } = req.body;
    const teams = await Teams.find({ eventId: eventId });
    res.json({ status: "success", error: "", data: teams });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

// Get all teams that a user is part of
const getUserTeams = async (req, res) => {
  try {
    const { delegateId } = req.body;
    const teams = await Teams.find({
      members: { $elemMatch: { $eq: delegateId } },
    });
    res.json({ status: "success", error: "", data: teams });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

// Register a new team
const registerTeam = async (req, res) => {
  try {
    const { eventId, delegateId } = req.body;
    const teamIds = await Teams.find({}, { teamId: 1 })
      .sort({ teamId: -1 })
      .limit(1);
    let teamId = 1001;
    if (teamIds[0]) {
      teamId = teamIds[0].teamId + 1;
    }
    const members = [delegateId];
    const newTeam = await Teams.create({
      teamId,
      eventId,
      members,
      teamLeader: delegateId,
    });

    const teamDetails = {
      teamId,
      eventId,
      members,
      teamLeader: delegateId,
    };

    const event = await Events.findOne({ eventId });
    let participants = event.participants;
    participants = [...participants, teamId];
    const result = await Events.updateOne(
      { eventId: eventId },
      { $set: { participants: participants } }
    );
    const user = await Users.findOne({ delegateId });
    const eventList = user.participating_in;
    participating_in = [...eventList, eventId];
    const userResult = await Users.updateOne(
      { delegateId: delegateId },
      { $set: { participating_in: participating_in } }
    );

    res.json({ status: "success", error: "", data: teamDetails });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

// new Member joins team
const joinTeam = async (req, res) => {
  try {
    const { teamId, delegateId, eventId } = req.body;
    const team = await Teams.findOne({ teamId });
    if (!team) {
      return res.json({
        status: "error",
        error: "Team ID does not exist!",
        data: "",
      });
    }
    if (team.eventId != eventId) {
      return res.json({
        status: "error",
        error: "This team is not for this event!",
        data: "",
      });
    }
    const newMembers = team.members;
    if (newMembers.includes(delegateId)) {
      return res.json({ status: "error", error: "Already in the team", data: ""});
    } else {
      newMembers.push(delegateId);
    }
    const response = await Teams.updateOne(
      { teamId: teamId },
      { $set: { members: newMembers } }
    );

    const user = await Users.findOne({ delegateId });

    const eventList = user.participating_in;
    participating_in = [...eventList, eventId];

    const userResult = await Users.updateOne(
      { delegateId: delegateId },
      { $set: { participating_in: participating_in } }
    );

    const updatedTeam = {
      teamId,
      newMembers,
    };

    return res.json({ status: "success", error: "", data: updatedTeam });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

const leaveTeam = async (req, res) => {
  try {
    const { teamId, delegateId, eventId } = req.body;
    const team = await Teams.findOne({ teamId });

    let newMembers = team.members.filter((member) => {
      return member != delegateId;
    });
    const response = await Teams.updateOne(
      { teamId: teamId },
      { $set: { members: newMembers } }
    );

    const updatedTeam = {
      teamId,
      newMembers,
    };
    const user = await Users.findOne({ delegateId });

    const eventList = user.participating_in;
    participating_in = eventList.filter((e) => {
      return e != eventId;
    });

    const userResult = await Users.updateOne(
      { delegateId: delegateId },
      { $set: { participating_in: participating_in } }
    );

    res.json({ status: "success", error: "", data: updatedTeam });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.body;
    const team = await Teams.findOne({ teamId });
    const memberList = team.members;
    const eventId = team.eventId;

    const event = await Events.findOne({ eventId });
    let participants = event.participants;
    let newParticipants = participants.filter((team) => {
      return team != teamId;
    });
    const resultEvents = await Events.updateOne(
      { eventId: eventId },
      { $set: { participants: newParticipants } }
    );

    const result = await Teams.deleteOne({ teamId });
    memberList.map(async (delId) => {
      const user = await Users.findOne({ delegateId: delId });
      const eventList = user.participating_in;
      participating_in = eventList.filter((e) => {
        return e != eventId;
      });

      const userResult = await Users.updateOne(
        { delegateId: delId },
        { $set: { participating_in: participating_in } }
      );
    });
    if (result.deletedCount) {
      res.json({ status: "success", error: "", data: result });
    } else {
      res.json({ status: "error", error: "Team Id not found", data: result });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

//Get members of a team
const getTeamMembers = async (req, res) => {
  try {
    const { teamId } = req.body;
    const team = await Teams.findOne({ teamId });
    const delegateIds = team.members;
    const users = await Users.find({ delegateId: { $in: delegateIds } });
    res.json({ status: "success", error: "", data: users });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

module.exports = {
  testMessage,
  getTeams,
  getEventTeams,
  getUserTeams,
  registerTeam,
  getTeamMembers,
  joinTeam,
  leaveTeam,
  deleteTeam,
};
