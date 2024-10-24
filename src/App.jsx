import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import SignInPage from './components/SignIn';
import SignUpPage from './components/SignUp';
import HomePage from './components/HomePage';
import Layout from './components/Layout';
import './index.css'

const App = () => (
    <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} /> 
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
            </Routes>
       </Layout>
    </Router>
);

export default App;