const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking");
const { isLoggedIn } = require("../middleware");

bookingController.scheduleAutoDelete();

router.get("/home", bookingController.renderHome);
router
  .route("/new")
  .get(isLoggedIn, bookingController.renderNewBookingForm)
  .post("/new", bookingController.createBooking);

router.get("/show", bookingController.showBookings);

router.post("/approve/:id", bookingController.approveBooking);

router.post("/reject/:id", bookingController.rejectBooking);

router.get("/msg", bookingController.viewUserBookings);

router
  .route("/msg/edit/:id")
  .get(bookingController.renderEditBookingForm)
  .patch(bookingController.updateBooking);

router.delete("/msg/delete/:id", bookingController.deleteBooking);

module.exports = router;
