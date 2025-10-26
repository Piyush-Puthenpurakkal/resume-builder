import React from "react";
import { useResume } from "../context/useResume";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons

function PersonalDetailsForm({ isExpanded, toggleExpand }) {
  const { resumeData, updateResumeData } = useResume();

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateResumeData("personalDetails", {
      ...resumeData.personalDetails,
      [name]: value,
    });
  };

  return (
    <div className="form-section card">
      <div className="form-section-header" onClick={toggleExpand}>
        <h2>Personal Details</h2>
        <button type="button" className="expand-toggle-button">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className="form-section-content">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={resumeData.personalDetails.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={resumeData.personalDetails.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={resumeData.personalDetails.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn Profile URL"
            value={resumeData.personalDetails.linkedin}
            onChange={handleChange}
          />
          <input
            type="text"
            name="github"
            placeholder="GitHub Profile URL"
            value={resumeData.personalDetails.github}
            onChange={handleChange}
          />
          <input
            type="text"
            name="portfolio"
            placeholder="Portfolio Link"
            value={resumeData.personalDetails.portfolio}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={resumeData.personalDetails.address}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}

export default PersonalDetailsForm;
