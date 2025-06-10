// Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../App.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>SecureDoc Vault</h2>
          <p>
            A secure and Aadhaar-linked digital document storage and sharing platform for citizens.
          </p>
        </div>

        <div className="footer-links">
          <h5>Quick Links</h5>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Upload</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h5>Contact</h5>
          <ul>
            <li><FaEnvelope /> support@securedoc.in</li>
            <li><FaPhoneAlt /> +91 98765 43210</li>
            <li><FaMapMarkerAlt /> Ujjain, MP, India</li>
          </ul>
        </div>

        <div className="footer-social">
          <h5>Follow Us</h5>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} SecureDoc Vault. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
