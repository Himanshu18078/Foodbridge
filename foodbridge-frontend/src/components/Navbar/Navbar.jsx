import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="flex gap-6 p-4 bg-white shadow">
      <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
      <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
      <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
    </nav>
  )
}

export default Navbar