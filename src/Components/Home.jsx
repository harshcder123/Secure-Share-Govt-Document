import React, { useEffect, useState } from "react";
// import { uselocation, useNavigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import {  useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css";
import "bootstrap";

function App() {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");
  const [docType, setDocType] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    setTimeout(() => {
      const carouselEl = document.querySelector("#carouselExampleCaptions");
      if (carouselEl) {
        try {
          new window.bootstrap.Carousel(carouselEl, {
            interval: 3000,
            ride: "carousel",
            pause: false,
            wrap: true,
          });
        } catch (e) {
          console.error("Bootstrap Carousel init error:", e);
        }
      }
    }, 100);
  }, []);

     const navigate = useNavigate();

    const handleUpload = () => {
  if (!docType || !title || !file) {
    alert("Please fill all fields");
    return;
  }

  const newDoc = {
    id: Date.now(),
    type: docType,
    title: title,
    name: file.name,
    url: URL.createObjectURL(file),
  };
    const existingDocs = JSON.parse(localStorage.getItem("docs")) || [];

  const updatedDocs = [...existingDocs, newDoc];
  setDocuments(updatedDocs);
  localStorage.setItem("docs", JSON.stringify(updatedDocs));

  // Clear inputs
  setDocType("");
  setTitle("");
  setFile(null);
  document.getElementById("fileInput").value = "";

  // ✅ Navigate to success page
  navigate("/uploaddoc", { state: newDoc });
};

  const handleDelete = (id) => {
    const updated = documents.filter((doc) => doc.id !== id);
    setDocuments(updated);
    localStorage.setItem("docs", JSON.stringify(updated));
  };

  const handleDownload = (doc) => {
    const link = document.createElement("a");
    link.href = doc.url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  

   
  // };
  return (
    <div className="App">
      {/* Carousel Section (Top) */}
      <section className="carousel" data-aos="zoom-in">
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/assets/images/slider 1.jpg"
                className="d-block w-100"
                alt="slide1"
              />
              <div className="carousel-overlay">
                <h5>Secure Documents</h5>
                <p>
                  Upload and access your important records in a secure digital
                  vault.
                </p>
               <button class="btn btn-primary" href="#upload-section">Get Start</button>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="/assets/images/slider 2.jpg"
                className="d-block w-100"
                alt="slide2"
              />
              <div className="carousel-overlay">
                <h5>Share with Family</h5>
                <p>
                  Use Aadhaar-based access to share key documents instantly.
                </p>
                <button className="carousel-btn">Learn More</button>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="/assets/images/slider 3.jpg"
                className="d-block w-100"
                alt="slide3"
              />
              <div className="carousel-overlay">
                <h5>Access Anywhere</h5>
                <p>
                  Your documents are available 24/7 from any device via the
                  cloud.
                </p>
                <button className="carousel-btn">Explore</button>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="about" data-aos="fade-right">
        <div className="about-img">
          <img
            src="https://img.freepik.com/free-vector/cloud-data-storage-concept-illustration_114360-4465.jpg"
            alt="About"
          />
        </div>
        <div className="about-content">
          <h2>About the Project</h2>
          <p>
            This platform allows citizens to keep documents such as mark sheets,
            PAN cards, passports, and others in digital format. It links each
            member’s Aadhaar number and reduces the risks of losing important
            documents.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="cards" data-aos="fade-up">
        <h2>Core Features</h2>
        <div className="card-container">
          <div className="card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828919.png"
              alt="upload"
              style={{ width: "40px", height: "40px" }}
            />
            <h3>Upload Documents</h3>
            <p>Securely upload and store your documents online.</p>
          </div>
          <div className="card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4436/4436481.png"
              alt="share"
              style={{ width: "40px", height: "40px" }}
            />
            <h3>Share Securely</h3>
            <p>Share documents with your family using Aadhaar-linked access.</p>
          </div>
          <div className="card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
              alt="profile"
              style={{ width: "40px", height: "40px" }}
            />
            <h3>User Profiles</h3>
            <p>Manage your profile and document history easily.</p>
          </div>
          <div className="card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png"
              alt="update-delete"
              style={{ width: "40px", height: "40px" }}
            />
            <h3>Update / Delete</h3>
            <p>Easily update or remove documents anytime.</p>
          </div>
        </div>
      </section>

      {/* Upload Document Section (Replacing Aadhaar section) */}
     <section className="upload-doc" id="upload-section" data-aos="fade-up">
      <h2>Upload Document</h2>
      <div className="container" style={{ maxWidth: "600px" }}>
        <div className="mb-3">
          <select
            className="form-select"
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
          >
            <option value="">Select Document Type</option>
            <option value="aadhaar">Aadhaar Card</option>
            <option value="pan">PAN Card</option>
            <option value="voter">Voter ID</option>
            <option value="passport">Passport</option>
            <option value="marksheet">Marksheet</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Document Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            id="fileInput"
            accept="image/*,.pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <button onClick={handleUpload} className="btn btn-primary mb-4">
          Upload Document
        </button>

      
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="d-flex justify-content-between align-items-center border p-3 mb-2 rounded"
          >
            <div>
              <p className="fw-bold mb-1">{doc.title}</p>
              <p className="text-muted mb-1">{doc.type.toUpperCase()}</p>
              <p className="mb-1">{doc.name}</p>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-success me-2"
              >
                View
              </a>
              <button
                className="btn btn-sm btn-outline-info me-2"
                onClick={() => handleDownload(doc)}
              >
                Download
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(doc.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>

      {/* Services Section */}
      <section className="services bg-light py-5" data-aos="fade-up">
        <div className="container">
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="p-4 shadow-sm rounded bg-white h-100">
                <h5 className="mb-2">Education Records</h5>
                <p>
                  Store and access mark sheets, degrees, and other educational
                  records.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 shadow-sm rounded bg-white h-100">
                <h5 className="mb-2">Healthcare Documents</h5>
                <p>
                  Keep your medical records, prescriptions, and health
                  certificates safe.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 shadow-sm rounded bg-white h-100">
                <h5 className="mb-2">Railway Tickets & IDs</h5>
                <p>
                  Store government issued tickets and identity proofs for
                  travel.
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="p-4 shadow-sm rounded bg-white h-100">
                <h5 className="mb-2">Banking Verification</h5>
                <p>
                  Keep important documents like passbooks, account proofs, and
                  verification forms.
                </p>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="p-4 shadow-sm rounded bg-white h-100">
                <h5 className="mb-2">Personal Certificates</h5>
                <p>
                  Store birth, caste, income and other personal documents
                  digitally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
