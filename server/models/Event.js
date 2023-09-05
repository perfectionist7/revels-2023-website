const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
    {
        eventId: {
            type: String,
            required: true,
            unique: true
        },
        eventTitle: {
            type: String,
            required: true,
            unique: true
        },
        eventMode: {
            type: String,
        },
        eventDescription: {
            type: String,
        },
        category: {
            type: String,
        },
        isSportsEvent: {
            type: Boolean, 
            default: false
        },
        isTeamEvent: {
            type: Boolean,
            required: true
        },
        minTeamSize:{
            type:Number,
            default: 2,
        },
        maxTeamSize:{
            type:Number,
            default: 4,
        },
        isFlagshipEvent: {
            type: Boolean,
            required: true
        },
        isActive: {
            type: Boolean,
            required: true
        },
        participants: [{
            type: Number,
        }],
        eventDateTime: {
            type: Date,
        },
        eventVenue: {
            type: String,
        },
        registrationDeadline: {
            type: Date,
        },
        // Judging 
        noOfCriteria:{
            type: Number
        },
        judgingCriteria:{
            type: [String]
        },
        //Optional Ones
        max_capacity: {
            type: Number
        },
        prizePool: {
            type: Number
        },
        //For searching with tags
        eventTags: [{
            type: String
        }],
        eventHeads: [
            {
                name: {
                    type: String,
                },
                phoneNo: {
                    type: Number,
                },
                email: {
                    type: String,
                },
            },
        ]
    },
    { timestamps: true }
);


module.exports = mongoose.model("Events", EventSchema);

// E101, BidWars, Online/Offline/Both, short Desc, event category, participants_list, cap*, pool*, tags*