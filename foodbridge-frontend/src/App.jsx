import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import DonorDashboard from './pages/Donor/Dashboard'
import NgoDashboard from './pages/Ngo/Dashboard'
import VolunteerDashboard from './pages/Volunteer/Dashboard'
import AdminDashboard from './pages/Admin/Dashboard'
function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/donor/dashboard' element={<DonorDashboard/>}/>
        <Route path='/ngo/dashboard' element={<NgoDashboard/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/volunteer/dashboard' element={<VolunteerDashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App