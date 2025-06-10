import React, { useState } from 'react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log('Recaptcha Verified');
      },
    });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (!name || !phone || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = '+91' + phone;

    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      alert('OTP sent to your phone number');
    } catch (err) {
      console.error(err);
      setError('Failed to send OTP. Try again.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp || !confirmationResult) {
      setError('Please enter OTP');
      return;
    }

    try {
      // Step 1: OTP verify
      await confirmationResult.confirm(otp);

      // Step 2: Register with Email/Password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Step 3: Update display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('OTP verification failed or Email already in use');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={confirmationResult ? handleVerifyOtp : handleSendOtp}>
        <h2>Register</h2>
        {error && <p className="error-msg">{error}</p>}

        {!confirmationResult ? (
          <>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <button type="submit">Verify OTP & Register</button>
          </>
        )}

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
