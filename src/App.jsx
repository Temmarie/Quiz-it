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
          {/* Home Page */}
          <Route
            path="/"
            element={
              <SignedIn>
                <HomePage />
              </SignedIn>
            }
          />
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            }
          />
          {/* Instructions Page */}
          <Route
            path="/instructions"
            element={
              <SignedIn>
                <Instructions />
              </SignedIn>
            }
          />
          {/* Quiz Page */}
          <Route
            path="/quiz"
            element={
              <SignedIn>
                <Quiz />
              </SignedIn>
            }
          />

<Route
            path="/questions"
            element={
              <SignedIn>
                <QuestionsPage />
              </SignedIn>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <SignedIn>
                <Profile />
              </SignedIn>
            }
          />
          {/* Sign-In */}
          <Route
            path="/sign-in"
            element={
              <SignedOut>
                <SignInPage />
              </SignedOut>
            }
          />
          {/* Sign-Up */}
          <Route
            path="/sign-up"
            element={
              <SignedOut>
                <SignUpPage />
              </SignedOut>
            }
          />
          {/* Redirect Unauthenticated Users */}
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
