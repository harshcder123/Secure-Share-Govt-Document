import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../App.css'; // Make sure you create this CSS file

const Dashboard = () => {
  const highlights = [
    { img: '/assets/images/gallery 2.jpg', title: 'Digital Safety', text: 'Secure all documents digitally.' },
    { img: '/assets/images/Aadhaarcard.png', title: 'Aadhaar Link', text: 'Linked with Aadhaar for easy access.' },
    { img: '/assets/images/gallery 4.jpg', title: 'Government Reach', text: 'Works across all public services.' },
    { img: '/assets/images/gallery 3.jpg', title: 'No More Paper', text: 'Say goodbye to physical copies.' },
  ];

  const steps = [
    {
      title: '1. Register & Login',
      description: 'Create your account using email and Aadhaar-linked OTP verification.',
      icon: '👤',
    },
    {
      title: '2. Upload Documents',
      description: 'Upload PAN, passport, marksheet, etc. securely.',
      icon: '📤',
    },
    {
      title: '3. Manage Documents',
      description: 'Update or delete files anytime from your dashboard.',
      icon: '🗂️',
    },
    {
      title: '4. Share with Family',
      description: 'Share documents via Aadhaar-link with family.',
      icon: '🔗',
    },
  ];

  return (
    <div>

     {/* 1. Hero Section */}
<section className="hero">
  {/* Image ko direct yaha add kar rahe hain */}
  <img 
    src="/assets/images/slider 4.jpg" 
    alt="Hero Background" 
    style={{ 
      width: '100%', 
      height: 'auto', 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      zIndex: -1, 
      objectFit: 'cover' 
    }} 
  />

  <div className="carousel-overlay" style={{ position: 'relative', zIndex: 1, padding: '2rem', color: 'white' }}>
    <h1>Secure & Share Govt Documents</h1>
    <p>Digitally store and safely share your essential documents like PAN, Passport, and Marksheet.</p>
  </div>
</section>

      {/* 2. Highlights Section */}
      <section className="highlights">
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Smart Document Solutions</h2>
        <div className="card-container">
          {highlights.map((item, i) => (
            <div key={i} className="card">
              <img src={item.img} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Split Section */}
     <section className="split">
        
  <div className="split-text">
    <h2 style={{  fontSize: '2.5rem', marginBottom: '1rem' }}>
      One-Click Sharing
    </h2>
    <p style={{ textAlign:'center'  ,fontSize: '1.25rem', lineHeight: 1.6 }}>
      Easily share your documents with family using a secure, Aadhaar-based system.
      Reduce risk and save time with instant digital access.
      This system ensures your data privacy with end-to-end encryption,
      allowing you to control who can view or download your documents anytime, anywhere.
      Seamlessly manage sharing permissions with just a few clicks.
    </p>
  </div>
  <div className="split-image">
    <img src="/assets/images/about.jpg" alt="Document Sharing" />
  </div>
</section>


      {/* 4. Problem Statement Section */}
      <section className="problem-statement">
        <h2>Problem Statement</h2>
        <p>
          Citizens can now securely store and access important documents like mark sheets,
          PAN cards, and passports in digital format. This reduces government overhead,
          eliminates risks of document loss, and encourages Aadhaar integration for digital access.
          Services will be available across sectors like education, health, and railways.
        </p>
      </section>

      {/* 5. How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          {steps.map((step, i) => (
            <div key={i} className="step">
              <div className="icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;
