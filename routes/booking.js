const express = require("express");
const router = express.Router();
const userBooking = require("../controllers/userBooking");
const adminBooking = require("../controllers/adminBooking");
const bookingController = require("../controllers/booking");
const { isLoggedIn } = require("../middleware");

//booking will auto delete after 7 days ones it will aprove or rejected by admin
bookingController.scheduleAutoDelete();

//home route
router.get("/", bookingController.renderHome);

// User-specific routes
router
  .route("/new")
  .get(isLoggedIn, userBooking.renderNewBookingForm)
  .post(isLoggedIn, userBooking.createBooking);

router.get("/msg", isLoggedIn, userBooking.viewUserBookings);

router
  .route("/msg/edit/:id")
  .get(isLoggedIn, userBooking.renderEditBookingForm)
  .patch(isLoggedIn, userBooking.updateBooking);

router.delete("/msg/delete/:id", isLoggedIn, userBooking.deleteBooking);

// Admin-specific routes
router.get("/show", isLoggedIn, adminBooking.viewAllBookings);
router.post("/approve/:id", isLoggedIn, adminBooking.approveBooking);
router.post("/reject/:id", isLoggedIn, adminBooking.rejectBooking);

module.exports = router;
