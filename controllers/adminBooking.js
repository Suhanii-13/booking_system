// controllers/adminBooking.js
const Booking = require("../models/booking");
const wrapAsync = require("../utils/wrapAsync");

exports.viewAllBookings = wrapAsync(async (req, res) => {
  const bookings = await Booking.find({});
  res.render("pages/show.ejs", { bookings });
});

exports.approveBooking = wrapAsync(async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: "approved" });
  req.flash("success", "Booking approved successfully!");
  res.redirect("/show");
});

exports.rejectBooking = wrapAsync(async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: "rejected" });
  req.flash("success", "Booking rejected.");
  res.redirect("/show");
});
