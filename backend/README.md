# Skill Force Backend: Function Holders List

This directory contains the backend for the Skill Force platform. Below is a comprehensive list and plan for the function holders (controllers) required to support the frontend application.

## 1. Authentication Functions (`controllers/auth.js`)
*   **`registerUser`**: Creates a new student/user account in the database.
*   **`loginUser`**: Authenticates a user and returns a standard JWT (JSON Web Token) for keeping them logged in.
*   **`verifyToken`**: Checks if a user's current session token is valid and unexpired.
*   **`getUserProfile`**: Fetches the currently logged-in user's data (e.g., for a dashboard).

## 2. Events Functions (`controllers/events.js`)
*   **`getAllEvents`**: Retrieves a list of upcoming and past club events to display on the Events page.
*   **`getEventById`**: Retrieves specific details for a single event.
*   **`createEvent`**: (Admin only) Adds a new event to the calendar.
*   **`rsvpEvent`**: Allows a logged-in user to register their attendance for an upcoming event.

## 3. Projects Functions (`controllers/projects.js`)
*   **`getAllProjects`**: Retrieves all the club's open-source or internal projects for the Projects page.
*   **`addProject`**: (Admin only) Adds a new project portfolio item.

## 4. Team Members Functions (`controllers/team.js`)
*   **`getTeamMembers`**: Retrieves the list of club leads, mentors, and core team members to populate the Team page.

## 5. Forms & Feedback Functions (`controllers/forms.js`)
*   **`submitContactForm`**: Handles submissions from your "Contact Us" page and could trigger an email notification to the club admins.
*   **`submitFeedback`**: Stores user feedback from the Feedback page securely in your database.

## 6. Domains Functions (`controllers/domains.js`)
*   **`getDomains`**: Fetches the list of technical domains (like Web Dev, AI/ML, Design) that the club focuses on.

---

### Folder Structure
*   `config/`: Database config (MongoDB, MySQL, etc.) and environment setups.
*   `controllers/`: Holds all the logic for the backend functions mentioned above.
*   `models/`: Defines the data schema for the database.
*   `routes/`: Directs incoming HTTP requests to their specific controller function.
*   `middleware/`: Special functions that check security (e.g., Auth Verification) before allowing access to a controller.
