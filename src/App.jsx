import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./Pages/HomePage/Home";
import Dashboard from "./Pages/UserDashboard/User";
import Browse from "./Pages/Browse/Browse";
import Portfolio from "./Pages/Browse/Portfolio";
import Photographer from "./Pages/PhotographerDashboard/Photographer";
import Admin from "./Pages/AdminDashboard/Admin";
import Login from "./Pages/LoginRegister/Login";
import Register from "./Pages/LoginRegister/Register";
import ForgotPassword from "./Pages/LoginRegister/VerificationForm";
import ErrorPage from "./components/ErrorPage";
import {AuthProvider } from "./contexts/AuthContext";
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile/:id" element={<Portfolio />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/photographer" element={<Photographer />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
