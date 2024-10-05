const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user");
const Booking = require("./models/booking");

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOption = {
  secret: "thisshouldbeabettersecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  if (req.user) {
    res.locals.userRole = req.user.role;
  }
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

const MONGO_URL = "mongodb://127.0.0.1:27017/bookingSystem";
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

app.get("/home", (req, res) => {
  res.render("pages/index.ejs");
});

app.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

app.post("/signup", async (req, res) => {
  try {
    const { username, role, password } = req.body;
  res.send(`SignUp successful for ${username}`);
    const newUser = new User({ role, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome");
      res.redirect("/home");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
});

// Login routes
app.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

app.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash(
        "error",
        "Incorrect username or password. Please try again or sign up!"
      );
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome back !");
      const redirectUrl = req.session.returnTo || "/home";
      delete req.session.returnTo;
      return res.redirect(redirectUrl);
    });
  })(req, res, next);
});

// Logout route
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.flash("success", "You’re logged out");
    res.redirect("/home");
  });
});

app.get("/new", (req, res) => {
  res.render("pages/new.ejs");
});

app.post("/new", async (req, res) => {
  try {
    if (!req.user) {
      req.flash("error", "You need to be logged in to book a seminar hall.");
      return res.redirect("/login");
    }

    const bookingData = req.body.book;
    console.log("Booking Data:", bookingData);

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
    console.error("Booking Error:", error);
    req.flash("error", "Error booking the seminar hall.");
    res.status(500).redirect("/new");
  }
});

app.get("/show", async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.render("pages/show.ejs", { bookings });
  } catch (error) {
    req.flash("error", "Error retrieving bookings.");
    res.status(500).redirect("/home");
  }
});

// Approve
app.post("/approve/:id", async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, { status: "approved" });
    req.flash("success", "Booking approved successfully!");
    res.redirect("/show");
  } catch (error) {
    req.flash("error", "Error approving booking.");
    res.status(500).redirect("/show");
  }
});

// Reject
app.post("/reject/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    await Booking.findByIdAndUpdate(req.params.id, { status: "rejected" });
    req.flash("success", "Booking rejected.");

    res.redirect("/show");
  } catch (error) {
    req.flash("error", "Error rejecting booking.");
    res.status(500).redirect("/show");
  }
});

// Message
app.get("/msg", async (req, res) => {
  try {
    const bookings = await Booking.find({ studentId: req.user._id });
    res.render("pages/msg.ejs", { bookings });
  } catch (error) {
    req.flash("error", "Error retrieving your booking status.");
    res.status(500).redirect("/home");
  }
});