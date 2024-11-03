# Seminar Hall Booking System

## Overview
A web application designed to streamline seminar hall bookings with **secure user authentication** and **real-time admin approvals**. This system provides a seamless experience for users to book seminar halls and for admins to manage booking requests efficiently.

## Features

- **User Authentication**: Secure login and registration using Passport.js to manage user sessions.
- **Responsive Design**: The application is built with Bootstrap to ensure optimal viewing on different devices.
- **Separate Dashboards**:
  - **User Dashboard**: Allows users to view their bookings, event names, and booking statuses.
  - **Admin Dashboard**: Enables the admin to approve or reject booking requests.

## Technologies Used

- **EJS**,**Express**,**Express Session**,**Passport.js**, **Bootstrap**, **MongoDB**

## Usage Guide

### Users
1. **Sign Up**: Fill out the signup form, select the option as **Student**, and complete the registration.
2. **Book a Seminar Hall**: After logging in, navigate to the booking section to reserve a seminar hall.
3. **Check Approval Status**: Click on the **Messages** option in the navbar to view the status of your booking approval.

### Admins
1. **Sign Up**: In the signup form, fill in the username and password, and choose the role as **Admin** to gain access.
2. **Manage Bookings**: Log in and go to the **Bookings** section in the navbar. Here, you can approve or reject booking requests made by students.


## Setup Instructions

Follow these steps to run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/seminar-hall-booking-system.git
   cd seminar-hall-booking-system
   ```

2.**Install Dependencies**
```bash
npm install
```
3.Configure Environment Variables:
Set up your environment variables, such as MongoDB URI and session secrets, in a .env file.

4Start the Application:

```bash
node app.js
```

## 🧩 Project Structure

```plaintext

WEBATHON/
├── .vscode/
├── controllers/
│   ├── bookings.js
│   └── user.js
├── models/
│   ├── booking.js
│   └── user.js
├── node_modules/
├── public/
│   ├── css/
│   │   ├── book.css
│   │   ├── home.css
│   │   ├── show.css
│   │   └── theme.css
│   └── js/
│       ├── theme.js
│       └── validation.js
├── routes/
│   ├── booking.js
│   └── user.js
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
├── views/
│   ├── includes/
│   │   ├── flash.ejs
│   │   └── navbar.ejs
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── pages/
│   │   ├── edit.ejs
│   │   ├── index.ejs
│   │   ├── msg.ejs
│   │   ├── new.ejs
│   │   └── show.ejs
│   └── users/
│       ├── login.ejs
│       ├── signup.ejs
│       └── error.ejs
├── .env
├── .gitignore
├── app.js
├── middleware.js
├── package-lock.json
├── package.json
└── README.md
```
