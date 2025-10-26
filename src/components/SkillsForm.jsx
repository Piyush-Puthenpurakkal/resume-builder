import React, { useState } from "react";
import { useResume } from "../context/useResume";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons

function SkillsForm({ isExpanded, toggleExpand }) {
  const { resumeData, updateResumeData } = useResume();
  const [expandedCategories, setExpandedCategories] = useState({}); // Local state for skill categories

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleAddItem = (skillId) => {
    updateResumeData(
      "skills",
      resumeData.skills.map((skill) =>
        skill.id === skillId
          ? { ...skill, items: [...skill.items, { id: Date.now(), name: "" }] }
          : skill
      )
    );
  };

  const handleChangeItem = (skillId, itemId, e) => {
    const { value } = e.target;
    updateResumeData(
      "skills",
      resumeData.skills.map((skill) =>
        skill.id === skillId
          ? {
              ...skill,
              items: skill.items.map((item) =>
                item.id === itemId ? { ...item, name: value } : item
              ),
            }
          : skill
      )
    );
  };

  const handleRemoveItem = (skillId, itemId) => {
    updateResumeData(
      "skills",
      resumeData.skills.map((skill) =>
        skill.id === skillId
          ? {
              ...skill,
              items: skill.items.filter((item) => item.id !== itemId),
            }
          : skill
      )
    );
  };

  return (
    <div className="form-section card">
      <div className="form-section-header" onClick={toggleExpand}>
        <h2>Skills</h2>
        <button type="button" className="expand-toggle-button">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>
      {isExpanded && (
        <div className="form-section-content">
          {resumeData.skills.map((skill) => (
            <div key={skill.id} className="skill-category">
              <div
                className="skill-category-header"
                onClick={() => toggleCategory(skill.id)}
              >
                <h3>{skill.name}</h3>
                <button type="button" className="expand-toggle-button">
                  {expandedCategories[skill.id] ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </button>
              </div>
              {expandedCategories[skill.id] && (
                <div className="skill-category-content">
                  {skill.items.map((item) => (
                    <div key={item.id} className="form-item">
                      <input
                        type="text"
                        name="skillItem"
                        placeholder={`${skill.name} Skill`}
                        value={item.name}
                        onChange={(e) => handleChangeItem(skill.id, item.id, e)}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(skill.id, item.id)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddItem(skill.id)}
                    className="add-button"
                  >
                    Add {skill.name} Skill
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SkillsForm;
