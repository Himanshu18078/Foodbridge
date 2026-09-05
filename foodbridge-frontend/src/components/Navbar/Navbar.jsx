import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
            🍱 FoodBridge
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600 transition font-medium">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 transition font-medium">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition font-medium">
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  to={`/${user.role.toLowerCase()}/dashboard`}
                  className="text-gray-600 hover:text-blue-600 transition font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-blue-600 transition font-medium"
                >
                  Profile
                </Link>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-600">
                  Welcome, <span className="font-semibold">{user.email}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-blue-600 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;