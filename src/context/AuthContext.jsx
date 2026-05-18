import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedAuth = localStorage.getItem('isLoggedIn');

    if (savedUser && savedAuth === 'true') {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    // Mock authentication
    if (email && password) {
      const userData = {
        id: 1,
        email: email,
        name: email.split('@')[0],
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      
      return true;
    }
    return false;
  };

  const signup = (email, password) => {
    // Mock signup
    if (email && password.length >= 4) {
      const userData = {
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isLoggedIn', 'true');
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};