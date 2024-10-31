const express = require("express");
const router = express.Router();
const Booking = require("../models/booking"); 
const { isLoggedIn } = require("../middleware");
const wrapAsync = require("../utils/wrapAsync") ;
const cron = require("node-cron");

// This will delete bookings once approved or rejected by admin, 7 days after creation, 
//from both admin and user side
cron.schedule("0 0 * * *", async () => {
  try {
    const now = new Date();
    const time7DaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); 

    const deletedBookings = await Booking.deleteMany({
      createdAt: { $lt: time7DaysAgo }, 
      status: { $in: ["approved", "rejected"] },
    });

    console.log(
      `Auto-deleted ${deletedBookings.deletedCount} bookings older than 7 days`
    );
  } catch (error) {
    console.error("Error during auto-delete of bookings:", error);
  }
});


// Home Route
router.get("/home", (req, res) => {
  res.render("pages/index.ejs");
});

// New Booking Form (GET)
router.get("/new", isLoggedIn, (req, res) => {
  res.render("pages/new.ejs");
});

// Create New Booking (POST)
router.post(
  "/new",
  wrapAsync(async (req, res) => {
    try {
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
    } catch (error) {
      req.flash("error", "Error booking the seminar hall.");
      res.status(500).redirect("/new");
    }
  })
);

// Show Bookings (GET)
router.get(
  "/show",
  wrapAsync(async (req, res) => {
    try {
      const bookings = await Booking.find({});
      res.render("pages/show.ejs", { bookings });
    } catch (error) {
      req.flash("error", "Error retrieving bookings.");
      res.status(500).redirect("/home");
    }
  })
);

// Approve Booking (POST)
router.post(
  "/approve/:id",
  wrapAsync(async (req, res) => {
    try {
      await Booking.findByIdAndUpdate(req.params.id, { status: "approved" });
      req.flash("success", "Booking approved successfully!");
      res.redirect("/show");
    } catch (error) {
      req.flash("error", "Error approving booking.");
      res.status(500).redirect("/show");
    }
  })
);

// Reject Booking (POST)
router.post(
  "/reject/:id",
  wrapAsync(async (req, res) => {
    try {
      await Booking.findByIdAndUpdate(req.params.id, { status: "rejected" });
      req.flash("success", "Booking rejected.");
      res.redirect("/show");
    } catch (error) {
      req.flash("error", "Error rejecting booking.");
      res.status(500).redirect("/show");
    }
  })
);

// Booking Status Message (GET)
router.get(
  "/msg",
  wrapAsync(async (req, res) => {
    try {
      const bookings = await Booking.find({ studentId: req.user._id });
      res.render("pages/msg.ejs", { bookings });
    } catch (error) {
      req.flash("error", "Error retrieving your booking status.");
      res.status(500).redirect("/home");
    }
  })
);

// Edit Booking (GET)
router.get(
  "/msg/edit/:id",
  wrapAsync(async (req, res) => {
    const editBooking = await Booking.findById(req.params.id);

    if (!editBooking) {
      req.flash("error", "Booking not found.");
      return res.redirect("/msg");
    }
    res.render("pages/edit.ejs", { booking: editBooking });
  })
);

// Update Booking (PATCH)
router.patch(
  "/msg/edit/:id",
  wrapAsync(async (req, res) => {
    try {
      const updatedData = req.body.book;
      const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.id,
        {
          organizerName: updatedData.organizerName,
          department: updatedData.department,
          eventDetails: updatedData.eventDetails,
          chiefGuestsExpected: parseInt(updatedData.chiefGuestsExpected, 10),
          startTime: updatedData.startTime,
          endTime: updatedData.endTime,
          contactNumber: updatedData.contactNumber,
          tools: updatedData.tools,
        },
        { new: true }
      );

      if (!updatedBooking) {
        req.flash("error", "Booking not found.");
        return res.redirect("/msg");
      }
      req.flash("success", "Booking updated successfully!");
      res.redirect("/msg");
    } catch (error) {
      req.flash("error", "Error updating booking.");
      res.status(500).redirect("/msg");
    }
  })
);

// Delete Booking (DELETE)
router.delete(
  "/msg/delete/:id",
  wrapAsync(async (req, res) => {
    try {
      const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
      if (!deletedBooking) {
        req.flash("error", "Booking not found.");
        return res.redirect("/show");
      }
      req.flash("success", "Booking canceled successfully!");
      res.redirect("/show");
    } catch (error) {
      req.flash("error", "Error canceling booking.");
      res.status(500).redirect("/show");
    }
  })
);

module.exports = router;
