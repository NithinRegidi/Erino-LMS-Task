import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LeadsList from "./pages/LeadsList";
import LeadForm from "./pages/LeadForm";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar is correctly placed to show on all pages */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/leads" element={<PrivateRoute><LeadsList /></PrivateRoute>} />
        <Route path="/leads/new" element={<PrivateRoute><LeadForm /></PrivateRoute>} />
        <Route path="/leads/:id/edit" element={<PrivateRoute><LeadForm /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;