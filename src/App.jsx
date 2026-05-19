import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';
import CustomerDetail from './pages/customer/CustomerDetail';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Protected Dashboard */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Customer Detail */}
        <Route
          path="/customer/:id"
          element={
            <ProtectedRoute>
              <CustomerDetail />
            </ProtectedRoute>
          }
        />

        {/* Redirect */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;