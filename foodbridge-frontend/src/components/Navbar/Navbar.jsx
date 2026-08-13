import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const handleLogout = () =>{
    localStorage.removeItem("token");
    setUser(null);
  }
  return (
    <nav className="flex gap-6 p-4 bg-white shadow">
      <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
      <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
      <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
      {!user && (
        <>
          <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
          <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
        </>
      )}
      {user && (
        <>
          <Link to={`/${user.role.toLowerCase()}/dashboard`} className="text-gray-700 hover:text-blue-600">
            Dashboard
          </Link>
          <span className="text-gray-700">Welcome, {user.email}</span>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-600"
          >
            Logout
          </button>
        </>
      )}
    </nav>
  )
}

export default Navbar