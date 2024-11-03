const Booking = require("../models/booking");
const cron = require("node-cron");

// Cron job to auto-delete bookings
module.exports.scheduleAutoDelete = () => {
  const cron = require("node-cron");
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
};

// Home Page
module.exports.renderHome = (req, res) => {
  res.render("pages/index.ejs");
};
