import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Signup from "./pages/Signup/signup";
import Login from "./pages/Login/login";

const routes = (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
    </Routes>
  </Router>
);
const App = () => {
  return <div>{routes}</div>;
};

export default App;
