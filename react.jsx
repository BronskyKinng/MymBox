import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Movies from "./pages/Movies";
import Sports from "./pages/Sports";
import Games from "./pages/Games";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Search from "./components/Search";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Search />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/movies" element={<PrivateRoute component={Movies} />} />
          <Route path="/sports" element={<PrivateRoute component={Sports} />} />
          <Route path="/games" element={<PrivateRoute component={Games} />} />
          <Route path="/profile" element={<PrivateRoute component={Profile} />} />
          <Route path="/favorites" element={<PrivateRoute component={Favorites} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
