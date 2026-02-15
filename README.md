Bellcorp Event Management Application

A full-stack MERN application where users can explore events, register for them, and manage their registrations through a personal dashboard.

🚀 Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Context API
- Axios
- React Router

Backend:

- Node.js
- Express.js
- MongoDB (Atlas)
- JWT Authentication
- bcrypt

📁 Project Structure:
root/
├── server/    → Backend (Node + Express + MongoDB)
├── client/    → Frontend (React + Tailwind)
└── README.md

⚙️ How to Run the Project Locally
1️⃣ Clone the Repository
- git clone <your-repo-link>
- cd <project-folder>

🔹 Backend Setup
Step 1: Navigate to server folder
Step 2: Install dependencies
Step 3: Create a .env file inside server/
       Add:
           PORT=5000
           MONGO_URI=your_mongodb_atlas_connection_string
           JWT_SECRET=your_secret_key
Step 4: Start the backend 
      run: npm run dev
Finally:
       Backend will run on: http://localhost:5000
    

🔹 Frontend Setup

Step 1: Navigate to client folder
Step 2: Install dependencies
Step 3: Start frontend
       run: npm run dev 
Finally:
       Frontend will run on: http://localhost:5173
    

🔐 Features Implemented:

User Registration
User Login (JWT Authentication)
Protected Routes
Browse Events
Search Events
Filter by Category & Location
Pagination
Event Registration
Cancel Registration
Seat Availability Management
User Dashboard (Upcoming & Past Events)
Loading Spinners for better UX

🗃 Database Design:

User:
- name
- email (unique)
- password (hashed)

Event:

- name
- organizer
- location
- date
- description
- capacity
- availableSeats
- category

Registration:

- user (ObjectId)
- event (ObjectId)

Duplicate registrations are prevented using a compound unique index.

📌 Notes
         - Make sure MongoDB Atlas is properly connected.
         - Insert some dummy events into the database before testing.
         - JWT token is stored in localStorage on frontend.