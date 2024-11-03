const express = require("express");
const router = express.Router();
const userBooking = require("../controllers/userBooking");
const adminBooking = require("../controllers/adminBooking");
const bookingController = require("../controllers/booking");

const { isLoggedIn } = require("../middleware");

bookingController.scheduleAutoDelete();
router.get("/home", bookingController.renderHome);

// User-specific routes
router.get("/new", isLoggedIn, userBooking.renderNewBookingForm);
router.post("/new", isLoggedIn, userBooking.createBooking);
router.get("/msg", isLoggedIn, userBooking.viewUserBookings);
router.get("/msg/edit/:id", isLoggedIn, userBooking.renderEditBookingForm);
router.patch("/msg/edit/:id", isLoggedIn, userBooking.updateBooking);
router.delete("/msg/delete/:id", isLoggedIn, userBooking.deleteBooking);

// Admin-specific routes
router.get("/show", isLoggedIn, adminBooking.viewAllBookings);
router.post("/approve/:id", isLoggedIn, adminBooking.approveBooking);
router.post("/reject/:id", isLoggedIn, adminBooking.rejectBooking);

module.exports = router;
