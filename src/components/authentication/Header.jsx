import React from 'react';
import { Link } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react'

const Header = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <nav className="flex items-center justify-between px-6 py-4 mb-5 bg-indigo-950">
      <div className="flex items-center">
        <Link to="/">
          <div className="text-lg font-bold text-indigo-400 uppercase">
            QUIZ IT
          </div>
        </Link>
      </div>
      <div className="flex items-center text-indigo-300">
        {!user && (
          <>
            <Link
              to="/sign-in"
              className=" hover:text-indigo-400 mr-4 uppercase"
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className=" hover:text-indigo-400 mr-4 uppercase"
            >
              Sign Up
            </Link>
          </>
        )}
        {user && (
          <>
            <Link
              to="/dashboard"
              className=" hover:text-indigo-400 mr-4"
            >
              Stats
            </Link>
            <Link
              to="/profile"
              className=" hover:text-indigo-400 mr-4"
            >
              Profile
            </Link>
            <button
              onClick={() => signOut()}
              className=" hover:text-indigo-400"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
