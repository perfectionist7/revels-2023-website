const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            enum: ["SYS", "SC", "VIG", "CC", "OPS", "CNP"],
        },
        userID: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Admins", AdminSchema);
