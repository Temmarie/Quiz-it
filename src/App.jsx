import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Dashboard from './components/authentication/Dashboard';
import Profile from './components/authentication/Profile';
import SignInPage from './components/authentication/SignIn';
import SignUpPage from './components/authentication/SignUp';
import HomePage from './components/authentication/HomePage';
import Layout from './components/authentication/Layout';
import Quiz from './components/quiz/Quiz';
import QuestionsPage from "./components/quiz/QuestionsPage";
import Instructions from './components/quiz/Instructions';
import './index.css';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home Page - Accessible to everyone */}
          <Route path="/" element={<HomePage />} />

          {/* Quiz Routes - Accessible to everyone */}
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/questions" element={<QuestionsPage />} />

          {/* Protected Routes - Only for Signed-In Users */}
          <Route
            path="/dashboard"
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            }
          />
          <Route
            path="/profile"
            element={
              <SignedIn>
                <Profile />
              </SignedIn>
            }
          />

          {/* Authentication Pages */}
          <Route
            path="/sign-in"
            element={
              <SignedOut>
                <SignInPage />
              </SignedOut>
            }
          />
          <Route
            path="/sign-up"
            element={
              <SignedOut>
                <SignUpPage />
              </SignedOut>
            }
          />

          {/* Redirect all other routes to sign-in if not authenticated */}
          <Route
            path="*"
            element={
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
