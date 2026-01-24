# Skill Path AI

Skill Path AI is an AI-powered EdTech and Career Guidance platform that helps users discover their ideal career path through personalized skill assessments, course recommendations, and job matching.

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (Local instance or Atlas URI)

## Project Structure

- **frontend/**: React application (Vite + Tailwind CSS)
- **backend/**: Node.js + Express + MongoDB API

## Setup Instructions

### 1. Database Setup
Make sure you have MongoDB running locally.
The backend is configured to connect to: `mongodb://localhost:27017/skillpath` (or your specific URI in `.env`).

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder if it doesn't exist:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/skillpath
JWT_SECRET=your_secret_key_here
```

**Run the Server:**
```bash
npm run dev
# Server will start on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
```

**Run the Application:**
```bash
npm run dev
# App will usually start on http://localhost:5173 (or next available port)
```

## How to Use

1.  **Landing Page**: Open the frontend URL.
2.  **Sign Up**: Create a new account.
3.  **Assessment**: Complete the skill assessment wizard.
4.  **Dashboard**: access your personalized dashboard.
5.  **Profile**: View and edit your profile details (saved to DB).
