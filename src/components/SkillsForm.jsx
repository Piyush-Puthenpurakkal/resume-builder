import React from "react";
import { useResume } from "../context/useResume";

function SkillsForm() {
  const { resumeData, updateResumeData } = useResume();

  const handleAddSkill = () => {
    updateResumeData("skills", [
      ...resumeData.skills,
      { id: Date.now(), name: "" },
    ]);
  };

  const handleChange = (id, e) => {
    const { value } = e.target;
    updateResumeData(
      "skills",
      resumeData.skills.map((skill) =>
        skill.id === id ? { ...skill, name: value } : skill
      )
    );
  };

  const handleRemoveSkill = (id) => {
    updateResumeData(
      "skills",
      resumeData.skills.filter((skill) => skill.id !== id)
    );
  };

  return (
    <div className="form-section card">
      <h2>Skills</h2>
      {resumeData.skills.map((skill) => (
        <div key={skill.id} className="form-item">
          <input
            type="text"
            name="skill"
            placeholder="Skill Name"
            value={skill.name}
            onChange={(e) => handleChange(skill.id, e)}
          />
          <button
            type="button"
            onClick={() => handleRemoveSkill(skill.id)}
            className="remove-button"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddSkill} className="add-button">
        Add Skill
      </button>
    </div>
  );
}

export default SkillsForm;
