import React from "react";
import { useResume } from "../context/useResume";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons

function EducationForm({ isExpanded, toggleExpand }) {
  const { resumeData, updateResumeData } = useResume();

  const handleAddEducation = () => {
    updateResumeData("education", [
      ...resumeData.education,
      {
        id: Date.now(),
        institution: "",
        degree: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    updateResumeData(
      "education",
      resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [name]: value } : edu
      )
    );
  };

  const handleRemoveEducation = (id) => {
    updateResumeData(
      "education",
      resumeData.education.filter((edu) => edu.id !== id)
    );
  };

  return (
    <div className="form-section card">
      <div className="form-section-header" onClick={toggleExpand}>
        <h2>Education</h2>
        <button type="button" className="expand-toggle-button">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className="form-section-content">
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="form-item">
              <input
                type="text"
                name="institution"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => handleChange(edu.id, e)}
              />
              <input
                type="text"
                name="degree"
                placeholder="Degree/Field of Study"
                value={edu.degree}
                onChange={(e) => handleChange(edu.id, e)}
              />
              <input
                type="text"
                name="startDate"
                placeholder="Start Date"
                value={edu.startDate}
                onChange={(e) => handleChange(edu.id, e)}
              />
              <input
                type="text"
                name="endDate"
                placeholder="End Date"
                value={edu.endDate}
                onChange={(e) => handleChange(edu.id, e)}
              />
              <textarea
                name="description"
                placeholder="Description (e.g., relevant coursework, honors)"
                value={edu.description}
                onChange={(e) => handleChange(edu.id, e)}
              ></textarea>
              <button
                type="button"
                onClick={() => handleRemoveEducation(edu.id)}
                className="remove-button"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddEducation}
            className="add-button"
          >
            Add Education
          </button>
        </div>
      )}
    </div>
  );
}

export default EducationForm;
