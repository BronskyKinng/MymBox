import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-red-600 text-2xl font-bold">Cineverse</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                Home
              </Link>
              <Link to="/movies" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                Movies
              </Link>
              <Link to="/tv" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                TV Shows
              </Link>
              <Link to="/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                Profile
              </Link>
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center text-gray-300 hover:text-white"
                  >
                    <span className="mr-2">{user.email}</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {showMenu ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMenu && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
            <Link
              to="/"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
            >
              Movies
            </Link>
            <Link
              to="/tv"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
            >
              TV Shows
            </Link>
            <Link
              to="/profile"
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
            >
              Profile
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white block w-full text-left px-3 py-2 rounded-md"
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/login"
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar; 