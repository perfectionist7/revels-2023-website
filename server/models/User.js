const mongoose = require("mongoose");
const { isEmail } = require("validator");
const Transaction = require("./Transaction");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid Email ID"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password length must be atleast 6 characters"]
    },
    isMAHE:{
      type: Boolean,
      default: false,
      required: true
    },
    college:{
      type: String,
      required: false
    },
    reg_no: {
      type: Number,
      unique: true,
      required: false,
    },
    phone_no: {
      type: Number,
      unique: true,
      required: true,
    },
    delegateId: {
      type: Number,
      required: false,
      unique: true
    },
    hasDelegateCard: {
      type: Boolean,
      default: false
    }, 
    hasProshowCard: {
      type: Boolean,
      default: false
    },
    hasFlagshipCard: {
      type: Boolean,
      default: false
    },
    sportDelegateCardsBought: [{
        type: String
    }],
    optedForAccomodation: {
      type: Boolean,
      default: false
    },
    hasBookedTshirt: {
      type: Boolean,
      default: false
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
    }],
    participating_in: [{
      type: String
    }],
    verified:{
      type: Boolean,
      default: false
    },
    isBlacklisted: {
      type: Boolean,
      default: false
    },
    isAdmin:{
      type: Boolean,
      default: false
    }

  },
  { timestamps: true }
);

// fill college from Reg Number
// Validate registration number

// export model user with UserSchema
module.exports = mongoose.model("Users", UserSchema);
