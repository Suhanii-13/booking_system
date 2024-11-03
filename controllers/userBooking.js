// controllers/userBooking.js
const Booking = require("../models/booking");
const wrapAsync = require("../utils/wrapAsync");

exports.renderNewBookingForm = (req, res) => {
  res.render("pages/new.ejs");
};

exports.createBooking = wrapAsync(async (req, res) => {
  if (!req.user) {
    req.flash("error", "You need to be logged in to book a seminar hall.");
    return res.redirect("/login");
  }

  const bookingData = req.body.book;
  const newBooking = new Booking({
    organizerName: bookingData.organizerName,
    department: bookingData.department,
    eventDetails: bookingData.eventDetails,
    chiefGuestsExpected: parseInt(bookingData.chiefGuestsExpected, 10),
    startTime: bookingData.startTime,
    endTime: bookingData.endTime,
    contactNumber: bookingData.contactNumber,
    tools: bookingData.tools,
    studentId: req.user._id,
  });

  await newBooking.save();
  req.flash("success", "Booking made successfully!");
  res.redirect("/home");
});

exports.viewUserBookings = wrapAsync(async (req, res) => {
  const bookings = await Booking.find({ studentId: req.user._id });
  res.render("pages/msg.ejs", { bookings });
});

exports.renderEditBookingForm = wrapAsync(async (req, res) => {
  const editBooking = await Booking.findById(req.params.id);
  if (!editBooking) {
    req.flash("error", "Booking not found.");
    return res.redirect("/msg");
  }
  res.render("pages/edit.ejs", { booking: editBooking });
});

exports.updateBooking = wrapAsync(async (req, res) => {
  const updatedData = req.body.book;
  await Booking.findByIdAndUpdate(
    req.params.id,
    { ...updatedData },
    { new: true }
  );
  req.flash("success", "Booking updated successfully!");
  res.redirect("/msg");
});

exports.deleteBooking = wrapAsync(async (req, res) => {
  await Booking.findByIdAndDelete(req.params.id);
  req.flash("success", "Booking canceled successfully!");
  res.redirect("/msg");
});