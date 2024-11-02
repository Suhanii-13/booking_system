# Seminar Hall Booking System

## Overview

The **Seminar Hall Booking System** is a web application developed as part of a **Weathon event** (a web development hackathon of 7 hours). This application aims to provide a user-friendly platform for booking seminar halls efficiently. it allows users to easily reserve seminar spaces for various events.

This project has been an exciting opportunity for me to apply my technical skills and creativity in developing a functional web application. I enjoyed implementing features such as user authentication, session management, and responsive design, ensuring a seamless user experience.

## Features

- **User Authentication**: Secure login and registration using Passport.js to manage user sessions.
- **Responsive Design**: The application is built with Bootstrap to ensure optimal viewing on different devices.
- **Separate Dashboards**:
  - **User Dashboard**: Allows users to view their bookings, event names, and booking statuses.
  - **Admin Dashboard**: Enables the admin to approve or reject booking requests.

## Technologies Used

- **EJS**: Embedded JavaScript templates for rendering dynamic HTML.
- **Express**: A web application framework for Node.js for building the backend.
- **Express Session**: To handle session management and user authentication.
- **Passport.js**: For implementing user authentication strategies.
- **Bootstrap**: For creating a responsive and visually appealing layout.
- **MongoDB**:for backend.

## Frontend View

Here is a preview of the Seminar Hall Booking System:
## Frontend View

![Screenshot from 2024-10-02 15-54-37](https://github.com/user-attachments/assets/591a5568-1a9d-43a5-b636-42fbdd3332fb) 
<div align="center">
  <img src="https://github.com/user-attachments/assets/0a67df27-73ee-439c-887b-6243a83ffbfd" alt="1st half" width="49%">
  <img src="https://github.com/user-attachments/assets/11c83085-d6c5-49d0-81e5-f6f93472713e" alt="2nd half" width="49%">
</div>

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
