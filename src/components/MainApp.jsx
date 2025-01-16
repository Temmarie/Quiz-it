// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
// import Dashboard from 'src/components/authentication/Dashboard';
// import Profile from 'src/components/authentication/Profile';
// import SignInPage from 'src/components/authentication/SignIn';
// import SignUpPage from 'src/components/authentication/SignUp';
// import HomePage from 'src/components/authentication/HomePage';
// import Layout from 'src/components/authentication/Layout';
// import Question from 'src/components/quiz/Question';
// import Instructions from 'src/components/quiz/Instructions'; // Import the Instructions component
// import 'src/index.css';


// const MainApp = () => {
//   return (
//     <Router>
//       <Layout>
//         <Routes>
//           {/* HomePage Route */}
//           <Route
//             path="/"
//             element={<HomePage />}
//           />
//           {/* Dashboard Route */}
//           <Route
//             path="/dashboard"
//             element={
//               <SignedIn>
//                 <Dashboard />
//               </SignedIn>
//             }
//           />
//           {/* Profile Route */}
//           <Route
//             path="/profile"
//             element={
//               <SignedIn>
//                 <Profile />
//               </SignedIn>
//             }
//           />
//           {/* Sign In Route */}
//           <Route
//             path="/sign-in"
//             element={
//               <SignedOut>
//                 <SignInPage />
//               </SignedOut>
//             }
//           />
//           {/* Sign Up Route */}
//           <Route
//             path="/sign-up"
//             element={
//               <SignedOut>
//                 <SignUpPage />
//               </SignedOut>
//             }
//           />
//           {/* Redirect unauthenticated to sign-in */}
//           <Route
//             path="*"
//             element={
//               <SignedOut>
//                 <RedirectToSignIn />
//               </SignedOut>
//             }
//           />
//         </Routes>
//       </Layout>
//     </Router>
//   );
// };

// export default MainApp;
