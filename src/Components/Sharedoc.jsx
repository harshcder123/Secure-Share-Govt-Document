import React, { useState, useEffect } from 'react';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
function ShareDocument() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    aadhaar: '',
    relation: '',
    documentType: '',
    documentFile: null,
    personPhoto: null,
  });

  const [sharedDocs, setSharedDocs] = useState([]);

  useEffect(() => {
    const savedDocs = localStorage.getItem('sharedDocuments');
    if (savedDocs) setSharedDocs(JSON.parse(savedDocs));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setForm(prev => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, aadhaar, relation, documentType, documentFile, personPhoto } = form;

    if (!name || !email || !aadhaar || !relation || !documentType || !documentFile || !personPhoto) {
      alert('⚠️ Please fill all fields and upload both files.');
      return;
    }

    const newDoc = {
      id: Date.now(),
      name,
      email,
      aadhaar,
      relation,
      documentType,
      documentFile,
      personPhoto,
    };

    const updatedDocs = [...sharedDocs, newDoc];
    localStorage.setItem('sharedDocuments', JSON.stringify(updatedDocs));
    setSharedDocs(updatedDocs);

    alert('✅ Document shared successfully!');

    setForm({
      name: '',
      email: '',
      aadhaar: '',
      relation: '',
      documentType: '',
      documentFile: null,
      personPhoto: null,
    });

    document.getElementById('docFile').value = '';
    document.getElementById('personPhoto').value = '';
  };

  return (
    <div className="container" id="share-document">
      <h1>Share Document</h1>

      <form className="form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="input"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="input"
        />

        <input
          type="text"
          name="aadhaar"
          value={form.aadhaar}
          onChange={handleChange}
          placeholder="Aadhaar Number"
          className="input"
        />

        <input
          type="text"
          name="relation"
          value={form.relation}
          onChange={handleChange}
          placeholder="Relation"
          className="input"
        />

        <select
          name="documentType"
          value={form.documentType}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select Document Type</option>
          <option value="Aadhaar Card">Aadhaar Card</option>
          <option value="PAN Card">PAN Card</option>
          <option value="Passport">Passport</option>
          <option value="Driving License">Driving License</option>
        </select>

        <label className="file-label">
          Upload Document:
          <input
            type="file"
            id="docFile"
            name="documentFile"
            accept="image/*,application/pdf"
            onChange={handleChange}
            className="file-input"
          />
        </label>

        <label className="file-label">
          Upload Person Photo:
          <input
            type="file"
            id="personPhoto"
            name="personPhoto"
            accept="image/*"
            onChange={handleChange}
            className="file-input"
          />
        </label>

        <button type="submit" className="btn-share">Share</button>
      </form>

      <hr />
{/* 
      <h2>Shared Documents</h2>
      <ul className="doc-list">
        {sharedDocs.length === 0 ? (
          <li>No documents shared yet.</li>
        ) : (
          sharedDocs.map(doc => (
            <li key={doc.id}>
              <strong>{doc.name}</strong> - {doc.documentType}
            </li>
          ))
        )}
      </ul> */}
    </div>
  );
}

export default ShareDocument;




