import React from "react";
import { useResume } from "../context/useResume";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons

function SummaryForm({ isExpanded, toggleExpand }) {
  const { resumeData, updateResumeData } = useResume();

  const handleChange = (e) => {
    updateResumeData("summary", e.target.value);
  };

  return (
    <div className="form-section card">
      <div className="form-section-header" onClick={toggleExpand}>
        <h2>Summary</h2>
        <button type="button" className="expand-toggle-button">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className="form-section-content">
          <textarea
            name="summary"
            placeholder="A concise summary of your professional background and goals."
            value={resumeData.summary}
            onChange={handleChange}
          ></textarea>
        </div>
      )}
    </div>
  );
}

export default SummaryForm;
