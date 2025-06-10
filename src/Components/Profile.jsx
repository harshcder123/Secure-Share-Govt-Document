// src/Components/Profile.jsx

import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Spinner, Button } from 'react-bootstrap';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login'); 
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  // Handle Logout
  const handleLogout = async () => {
    await signOut(auth);
    alert('Logged out successfully');
    navigate('/login');
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!user) return null;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 shadow-lg border-0 rounded-4">
            <h3 className="mb-4 text-center fw-bold text-primary">My Profile</h3>

            <div className="mb-3">
              <strong>Full Name:</strong>
              <p className="form-control bg-light">{user.displayName || 'Not provided'}</p>
            </div>

            <div className="mb-3">
              <strong>Email:</strong>
              <p className="form-control bg-light">{user.email}</p>
            </div>

            <div className="mb-3">
              <strong>Phone:</strong>
              <p className="form-control bg-light">{user.phoneNumber || 'Not linked'}</p>
            </div>

            <div className="mb-3">
              <strong>User ID (UID):</strong>
              <p className="form-control bg-light">{user.uid}</p>
            </div>

            <div className="d-grid mt-4">
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
