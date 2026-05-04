import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AddMenu from './pages/AddMenu';
import ViewMenu from './pages/ViewMenu';
import AdminProfile from './pages/AdminProfile';
import CustomerMenu from './pages/CustomerMenu';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  if (!token) return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/menu/add" element={
          <ProtectedRoute>
            <AddMenu />
          </ProtectedRoute>
        } />
        <Route path="/admin/menu" element={
          <ProtectedRoute>
            <ViewMenu />
          </ProtectedRoute>
        } />
        <Route path="/admin/profile" element={
          <ProtectedRoute>
            <AdminProfile />
          </ProtectedRoute>
        } />

        {/* Customer Route */}
        <Route path="/menu/:restaurantId" element={<CustomerMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
