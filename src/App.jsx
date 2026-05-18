import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import Layout from './components/layout/Layout';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import CustomerDetail from './pages/customer/CustomerDetail';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />

              <Route
                path="customer/:id"
                element={<CustomerDetail />}
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;