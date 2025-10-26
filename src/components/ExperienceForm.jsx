import React from "react";
import { useResume } from "../context/useResume";

function ExperienceForm() {
  const { resumeData, updateResumeData } = useResume();

  const handleAddExperience = () => {
    updateResumeData("experience", [
      ...resumeData.experience,
      {
        id: Date.now(),
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    updateResumeData(
      "experience",
      resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [name]: value } : exp
      )
    );
  };

  const handleRemoveExperience = (id) => {
    updateResumeData(
      "experience",
      resumeData.experience.filter((exp) => exp.id !== id)
    );
  };

  return (
    <div className="form-section card">
      <h2>Experience</h2>
      {resumeData.experience.map((exp) => (
        <div key={exp.id} className="form-item">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={exp.title}
            onChange={(e) => handleChange(exp.id, e)}
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => handleChange(exp.id, e)}
          />
          <input
            type="text"
            name="startDate"
            placeholder="Start Date"
            value={exp.startDate}
            onChange={(e) => handleChange(exp.id, e)}
          />
          <input
            type="text"
            name="endDate"
            placeholder="End Date"
            value={exp.endDate}
            onChange={(e) => handleChange(exp.id, e)}
          />
          <textarea
            name="description"
            placeholder="Responsibilities and achievements (use bullet points)"
            value={exp.description}
            onChange={(e) => handleChange(exp.id, e)}
          ></textarea>
          <button
            type="button"
            onClick={() => handleRemoveExperience(exp.id)}
            className="remove-button"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddExperience}
        className="add-button"
      >
        Add Experience
      </button>
    </div>
  );
}

export default ExperienceForm;
