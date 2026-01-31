# Skill Path AI

Skill Path AI is an AI-powered EdTech and Career Guidance platform that helps users discover their ideal career path through personalized skill assessments, course recommendations, and job matching.

## Features

- **Personalized Assessments**: AI-driven skill assessments to gauge your current level.
- **Career Path Discovery**: Tailored recommendations for career improvements.
- **Google Authentication**: Secure and easy sign-in using Google (powered by Firebase).
- **Interactive Dashboard**: Track your applications and progress.
- **Job Matching**: Find jobs that match your skill set.

## Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (Local instance or Atlas URI)
- **Firebase Project** (for Google Auth)

## Project Structure

- **frontend/**: React application (Vite + Tailwind CSS + Firebase)
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

**Firebase Configuration:**
Ensure your `src/firebase.js` is correctly set up with your project's API keys if you are setting this up from scratch.

**Run the Application:**
```bash
npm run dev
# App will usually start on http://localhost:5173
```

## How to Use

1.  **Landing Page**: Open the frontend URL.
2.  **Sign Up/Login**: use your Google account or email to sign in.
3.  **Assessment**: Complete the skill assessment wizard.
4.  **Dashboard**: Access your personalized dashboard.
5.  **Profile**: View and edit your profile details.
