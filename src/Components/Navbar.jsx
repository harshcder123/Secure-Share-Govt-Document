import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);  // toggle state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth);
    setIsOpen(false); 
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  
  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
  <Link className="navbar-brand d-flex align-items-center" to="/">
    <img 
      src="/assets/images/logo.png" 
      alt="Logo" 
      style={{ height: '40px', marginRight: '10px' }} 
    />
  
  </Link>

  <button 
    className="navbar-toggler" 
    type="button" 
    onClick={toggleNavbar} 
    aria-controls="navbarNav" 
    aria-expanded={isOpen} 
    aria-label="Toggle navigation"
  >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNav">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <NavLink className="nav-link" to="/" onClick={closeNavbar}>Home</NavLink>
          </li>

          {!user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register" onClick={closeNavbar}>Register</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" onClick={closeNavbar}>Login</NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard" onClick={closeNavbar}>Dashboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Uploaddoc" onClick={closeNavbar}>Upload</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Sharedoc" onClick={closeNavbar}>Shared Docs</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile" onClick={closeNavbar}>Profile</NavLink>
              </li>
              <li className="nav-item">
                <button 
                  className="btn btn-outline-light btn-sm ms-2" 
                  onClick={() => {
                    handleLogout();
                    closeNavbar();
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
