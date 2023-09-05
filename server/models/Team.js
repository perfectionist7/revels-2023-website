const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    teamId: {
      type: Number,
      required: true,
      unique: true
    },
    teamLeader: {
      type: Number,
      required: true,
    },
    eventId: {
        type: String,
        required: false,
    },
    members:{
        type: [Number],
        required: true
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Teams", TeamSchema);
