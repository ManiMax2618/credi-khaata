import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({
  children,
}) => {
  // Always start logged out
  const [user, setUser] = useState(null);

  // Check localStorage only after app loads
  useEffect(() => {
    const savedUser =
      localStorage.getItem('user');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Login
  const login = (email, password) => {
    const savedUser =
      localStorage.getItem('registeredUser');

    if (!savedUser) {
      return {
        success: false,
        message:
          'No account found. Please sign up first.',
      };
    }

    const parsedUser =
      JSON.parse(savedUser);

    if (
      parsedUser.email === email &&
      parsedUser.password === password
    ) {
      localStorage.setItem(
        'user',
        JSON.stringify(parsedUser)
      );

      setUser(parsedUser);

      return {
        success: true,
      };
    }

    return {
      success: false,
      message: 'Invalid credentials',
    };
  };

  // Signup
  const signup = (email, password) => {
    const newUser = {
      email,
      password,
    };

    localStorage.setItem(
      'registeredUser',
      JSON.stringify(newUser)
    );

    return {
      success: true,
    };
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('user');

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);