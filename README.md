# NearbyDoc - Doctor Appointment Platform

A full-stack doctor appointment booking platform with React frontend and Node.js/Express backend.


<img width="2511" height="1303" alt="Screenshot 2025-12-25 220101" src="https://github.com/user-attachments/assets/6899368c-f7ba-4948-b1d4-634b4a7886b7" />

<img width="2507" height="1305" alt="Screenshot 2025-12-25 220120" src="https://github.com/user-attachments/assets/2c4b479e-1606-44b1-a1d6-b9c481a79b81" />

<img width="2506" height="1296" alt="Screenshot 2025-12-25 220142" src="https://github.com/user-attachments/assets/5eb60619-ff0b-476c-90ce-443cda140e55" />


🚀 Features

User Authentication: Sign up and login functionality

Doctor Directory: Browse and search doctors by specialty

Appointment Booking: Schedule appointments with doctors

Appointment Management: View and track your appointments

User Profile: Manage your personal information

Responsive Design: Modern, medical-professional UI

Real-time Notifications: Get feedback on your actions

Offline Mode: Works even without backend connection

📋 Prerequisites
Before you begin, ensure you have installed:

Node.js (v14 or higher)

npm (v6 or higher)

🛠️ Installation & Setup
Backend Setup

Navigate to the backend directory (where server.js is located)

Install dependencies:

bashnpm install

Start the backend server:

bashnpm start
Or for development with auto-reload:
bashnpm run dev
The server will start on http://localhost:3001
Frontend Setup

Create a new React project (if you haven't already):

bashnpx create-react-app nearbydoc-frontend
cd nearbydoc-frontend

Install required dependencies:

bashnpm install lucide-react

Replace the contents of src/App.js with the code from nearbydoc-app-fixed.jsx
Start the React development server:

bashnpm start
The app will open at http://localhost:3000
📡 API Endpoints
Authentication

POST /api/auth/signup - Create new user account
POST /api/auth/login - Login user

Doctors

GET /api/doctors - Get all doctors
GET /api/doctors/:id - Get specific doctor

Appointments

POST /api/appointments - Book new appointment
GET /api/appointments/:userId - Get user's appointments
GET /api/appointments/detail/:appointmentId - Get appointment details
DELETE /api/appointments/:appointmentId - Cancel appointment

User

GET /api/users/:userId - Get user profile

Health Check

GET /api/health - Check API status

🎯 Usage Guide
1. Sign Up / Login

Open the app at http://localhost:3000
Click "Sign Up" tab
Fill in your details (Name, Email, Password, Phone)
Click "Create Account"
You'll be logged in automatically

2. Find Doctors

Browse the list of available doctors
Use the search bar to find specific doctors or specialties
Filter by specialty using the category buttons
View doctor ratings, experience, and availability

3. Book Appointment

Click "Book Appointment" on any doctor card
Select your preferred date
Choose an available time slot
Enter the reason for your visit
Click "Confirm Appointment"

4. View Appointments

Click "Appointments" in the sidebar
See all your scheduled appointments
View appointment details including date, time, and location

5. Profile Management

Click "Profile" in the sidebar
View your account information
See your membership details and total appointments

🔧 Configuration
Backend Configuration
Edit server.js to configure:

Port number (default: 3001)
CORS settings
Add database connection (MongoDB, PostgreSQL, etc.)

Frontend Configuration
Edit nearbydoc-app-fixed.jsx to configure:

API base URL (default: http://localhost:3001/api)
Styling and theme colors
Available time slots

🗄️ Database Setup (Optional)
Currently uses in-memory storage. To add persistent database:
Using MongoDB
bashnpm install mongoose
Using PostgreSQL
bashnpm install pg
Then update server.js to connect to your database.


