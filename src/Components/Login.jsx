// src/Components/Login.jsx
import React, { useState, useEffect } from 'react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('Recaptcha verified');
        },
      });
      window.recaptchaVerifier.render();
    }
  }, []);

  // Step 1: Email/Password Login and Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !phone) {
      setError('All fields are required');
      return;
    }

    try {
      // ✅ First login with Email & Password
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ Then send OTP to phone
      const formattedPhone = phone.startsWith('+') ? phone : '+91' + phone;
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(result);
      alert('OTP sent to your phone');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to login or send OTP');
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp || !confirmationResult) {
      setError('Please enter OTP');
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      alert('Login successful');
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setError('Invalid OTP');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={confirmationResult ? handleVerifyOtp : handleSendOtp}>
        <h2>Login with Email & Phone OTP</h2>
        {error && <p className="error-msg">{error}</p>}

        {!confirmationResult ? (
          <>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div id="recaptcha-container"></div>
            <button type="submit">Send OTP</button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="submit">Verify OTP & Login</button>
          </>
        )}

        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
