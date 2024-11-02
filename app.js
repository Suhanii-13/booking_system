if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { isLoggedIn } = require("./middleware");
const ExpressError = require("./utils/ExpressError");
const wrapAsync = require("./utils/wrapAsync.js");
const User = require("./models/user");
const Booking = require("./models/booking");

const userRouter = require("./routes/user.js");
const bookingRouter = require("./routes/booking.js");

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

//mongo connection

const dbUrl = process.env.mongo_url;
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbUrl);
}

//session for production
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.secret,
  },
  touchAfter: 24 * 3600,
});

store.on("error",()=>{
  console.log("error to connect sessio store")
})

//session configuration
const sessionOption = {
  store,
  secret: process.env.secret,
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

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

app.use("/", userRouter);
app.use(bookingRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not Found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { err });
});
