import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./Components/Navbar";
 
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Deashboard from "./Components/Deashboard";
import Uploaddoc from "./Components/Uploaddoc";
import Footer from "./Components/Footer";
import  Sharedoc  from "./Components/Sharedoc"; 
import  Profile  from "./Components/Profile"; 

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />

        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Deashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/uploaddoc" element={<Uploaddoc />} />
            <Route path="/sharedoc" element={<Sharedoc />} />
            <Route path="/profile" element={<Profile />} />
            
          </Routes>
        </div>

        <Footer /> 
      </div>
    </Router>
  );
}



export default App;



