import React from "react";
import { useResume } from "../context/useResume";

function CertificationsForm() {
  const { resumeData, updateResumeData } = useResume();

  const handleAddCertification = () => {
    updateResumeData("certifications", [
      ...resumeData.certifications,
      {
        id: Date.now(),
        name: "",
        issuingOrganization: "",
        issueDate: "",
      },
    ]);
  };

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    updateResumeData(
      "certifications",
      resumeData.certifications.map((cert) =>
        cert.id === id ? { ...cert, [name]: value } : cert
      )
    );
  };

  const handleRemoveCertification = (id) => {
    updateResumeData(
      "certifications",
      resumeData.certifications.filter((cert) => cert.id !== id)
    );
  };

  return (
    <div className="form-section card">
      <h2>Certifications</h2>
      {resumeData.certifications.map((cert) => (
        <div key={cert.id} className="form-item">
          <input
            type="text"
            name="name"
            placeholder="Certification Name"
            value={cert.name}
            onChange={(e) => handleChange(cert.id, e)}
          />
          <input
            type="text"
            name="issuingOrganization"
            placeholder="Issuing Organization"
            value={cert.issuingOrganization}
            onChange={(e) => handleChange(cert.id, e)}
          />
          <input
            type="text"
            name="issueDate"
            placeholder="Issue Date"
            value={cert.issueDate}
            onChange={(e) => handleChange(cert.id, e)}
          />
          <button
            type="button"
            onClick={() => handleRemoveCertification(cert.id)}
            className="remove-button"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddCertification}
        className="add-button"
      >
        Add Certification
      </button>
    </div>
  );
}

export default CertificationsForm;
