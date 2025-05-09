import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Signup from "./pages/Signup/signup";
import Login from "./pages/Login/login";
import Dashboard from "./pages/Dashboard/dashboard";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoutes";

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />{" "}
    </Routes>
  </Router>
);
const App = () => {
  return <div>{routes}</div>;
};

export default App;
