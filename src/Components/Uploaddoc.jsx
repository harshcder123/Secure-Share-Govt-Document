import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function UploadDoc() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("docs")) || [];
    setDocuments(saved);
  }, []);

  const handleDownload = (doc) => {
    const link = document.createElement("a");
    link.href = doc.url;
    link.download = doc.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (id) => {
    const updated = documents.filter((doc) => doc.id !== id);
    setDocuments(updated);
    localStorage.setItem("docs", JSON.stringify(updated));
  };

  if (documents.length === 0) {
    return (
      <div className="container mt-5">
        <h4>No documents uploaded yet.</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Back to Upload
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>📄 Uploaded Documents</h2>
      <div className="row">
        {documents.map((doc) => (
          <div key={doc.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{doc.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Type: {doc.type.toUpperCase()}
                </h6>
                <p className="card-text">File Name: {doc.name}</p>
                <div className="mt-auto d-flex flex-wrap gap-2">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success btn-sm flex-grow-1 flex-md-grow-0"
                  >
                    View
                  </a>
                  <button
                    className="btn btn-info btn-sm flex-grow-1 flex-md-grow-0"
                    onClick={() => handleDownload(doc)}
                  >
                    Download
                  </button>
                  <button
                    className="btn btn-danger btn-sm flex-grow-1 flex-md-grow-0"
                    onClick={() => handleDelete(doc.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Back to Upload
        </button>
      </div>
    </div>
  );
}

export default UploadDoc;
