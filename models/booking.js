const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  organizerName: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  chiefGuestsExpected: {
    type: Number,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  eventDetails: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  tools: {
    type: String,
  },
  status: { type: String, default: "pending" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking; 
