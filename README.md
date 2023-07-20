# Habit Tracker - README

![Habit Tracker Logo](./public/images/favicon-32x32.png)

## Description

The Habit Tracker is an application designed to help users build and track their habits, daily tasks, and to-dos. Users can sign up, log in, and access their personalized dashboard to manage their habits and tasks efficiently.

## User Stories

- **Signup**: As a user, I want to sign up on the webpage so that I can start tracking my habits and tasks.
- **Login**: As a user, I want to log in to my account so that I can access my dashboard and manage my habits and tasks.
- **Dashboard**: As a user, I want to view my personalized dashboard, which includes my habits, daily tasks, and to-dos.
- **Account**: As a user, I want to view my account details and update my profile information.
- **Update Account**: As a user, I want to update my account information, such as username, email, and profile image.
- **Habit Creator**: As a user, I want to create new habits and track my progress over time.
- **Daily Creator**: As a user, I want to create daily tasks and check them off when completed.
- **To-Do Creator**: As a user, I want to create to-do tasks and mark them as completed.

## Backlog Functionalities

- **Points System**: Users can earn points when completing habits, daily tasks, or to-dos, motivating them to stay consistent.
- **Habit Reset**: Habit completion status resets daily, allowing users to continue tracking their habits regularly.

## Technologies Used

The Habit Tracker is built using the following technologies:

- **EJS**: Templating engine to generate dynamic HTML content.
- **CSS**: Styling the user interface and improving the overall user experience.
- **JavaScript**: Enhancing the interactivity and functionality of the application.
- **Node.js**: Backend JavaScript runtime for running the server.
- **Express**: Node.js framework for building the server and defining routes.
- **Middleware**: Additional modules to handle various tasks such as authentication and logging.
- **Sessions & Cookies**: Managing user sessions and authentication state.
- **MongoDB**: A NoSQL database for storing user information and tasks.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB in Node.js.

## Routes

### Auth Routes

- `GET /login`: Renders the login page.
- `POST /login`: Handles the login form submission.
- (Add more auth routes as needed.)

### Habits Routes

- `POST /habits/create`: Creates a new habit for the user.
- `GET /habits/:id/edit`: Renders the edit page for a specific habit.
- `POST /habits/:id/edit`: Handles the submission of edited habit details.
- `POST /habits/:id/delete`: Deletes a habit.
- (Add more habits routes as needed.)

### Daily Routes

- `POST /daily/create`: Creates a new daily task for the user.
- `GET /daily/:id/edit`: Renders the edit page for a specific daily task.
- `POST /daily/:id/edit`: Handles the submission of edited daily task details.
- `POST /daily/:id/delete`: Deletes a daily task.
- (Add more daily routes as needed.)

### To-Do Routes

- `POST /todo/create`: Creates a new to-do task for the user.
- `GET /todo/:id/edit`: Renders the edit page for a specific to-do task.
- `POST /todo/:id/edit`: Handles the submission of edited to-do task details.
- `POST /todo/:id/delete`: Deletes a to-do task.
- (Add more to-do routes as needed.)

### Index Routes

- `GET /`: Renders the homepage.
- `POST /`: Handles the form submission on the homepage.
- `GET /dashboard`: Renders the user's dashboard.
- `GET /account`: Renders the user's account details.
- `GET /account/:id/edit`: Renders the edit page for the user's account details.
- `POST /account/:id/edit`: Handles the submission of edited account details.
- `POST /account/:id/delete`: Deletes the user's account.
- `POST /logout`: Logs the user out.

## Models

### Daily Model

- `name`: String
- `user`: References the User model (Schema.Types.ObjectId)

### Habits Model

- `name`: String
- `user`: References the User model (Schema.Types.ObjectId)

### Todo Model

- `name`: String
- `user`: References the User model (Schema.Types.ObjectId)

User Model

- `username`: String (required, unique)
- `email`: String (required, unique)
- `passwordHash`: String (required)
- `habits`: Array of References to Habits model (Schema.Types.ObjectId)
- `image`: String (optional)
- `timestamps`: CreatedAt and UpdatedAt timestamps

## Links

- **Project**:

  - [Repository Link](https://github.com/Jswears/habit-tracker)
  - [Deploy Link](https://habit-tracker.adaptable.app/)

- [Trello](https://trello.com/b/L11pJpO0/trackify)

- **Slides**: COMING SOON

## Collaborators

- [Brian](https://github.com/brianadams68)

---
