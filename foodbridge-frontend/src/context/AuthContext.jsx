import { createContext, use, useContext, useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const decoded = jwtDecode(jwt);
      setUser({
        token: jwt,
        role: decoded.role,
        email: decoded.sub
      })
    }
  }, [])
  console.log(user);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}