import React from "react";
import { useResume } from "../context/useResume";

function PersonalDetailsForm() {
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
      <h2>Personal Details</h2>
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
        placeholder="LinkedIn Profile"
        value={resumeData.personalDetails.linkedin}
        onChange={handleChange}
      />
      <input
        type="text"
        name="github"
        placeholder="GitHub Profile"
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
  );
}

export default PersonalDetailsForm;
