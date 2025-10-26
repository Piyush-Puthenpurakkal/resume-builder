import React from "react";
import { useResume } from "../context/useResume";

function SummaryForm() {
  const { resumeData, updateResumeData } = useResume();

  const handleChange = (e) => {
    updateResumeData("summary", e.target.value);
  };

  return (
    <div className="form-section card">
      <h2>Summary</h2>
      <textarea
        name="summary"
        placeholder="A brief summary about yourself..."
        value={resumeData.summary}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}

export default SummaryForm;
