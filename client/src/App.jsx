import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Auth/Login";
import RegisterPage from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Routes/ProtectedRoute";
import PublicRoute from "./Routes/PublicRoute";
import "./App.css";
import TaskDashboard from "./pages/Dashboard";
import { registerUser } from "./utils/socket";

function App() {
  const user = localStorage.getItem("user");
  const userObj = user ? JSON.parse(user) : null;

  
  if (userObj) {
    registerUser(userObj._id);
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoute Element={TaskDashboard} />} />
        <Route path="/login" element={<PublicRoute Element={LoginPage} />} />
        <Route
          path="/register"
          element={<PublicRoute Element={RegisterPage} />}
        />
      </Routes>
    </>
  );
}

export default App;
