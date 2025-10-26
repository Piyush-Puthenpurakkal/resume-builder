import React from "react";
import { useResume } from "../context/useResume";

function ProjectsForm() {
  const { resumeData, updateResumeData } = useResume();

  const handleAddProject = () => {
    updateResumeData("projects", [
      ...resumeData.projects,
      {
        id: Date.now(),
        name: "",
        description: "",
        link: "",
      },
    ]);
  };

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    updateResumeData(
      "projects",
      resumeData.projects.map((project) =>
        project.id === id ? { ...project, [name]: value } : project
      )
    );
  };

  const handleRemoveProject = (id) => {
    updateResumeData(
      "projects",
      resumeData.projects.filter((project) => project.id !== id)
    );
  };

  return (
    <div className="form-section card">
      <h2>Projects</h2>
      {resumeData.projects.map((project) => (
        <div key={project.id} className="form-item">
          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={project.name}
            onChange={(e) => handleChange(project.id, e)}
          />
          <textarea
            name="description"
            placeholder="Project Description"
            value={project.description}
            onChange={(e) => handleChange(project.id, e)}
          ></textarea>
          <input
            type="text"
            name="link"
            placeholder="Project Link (Optional)"
            value={project.link}
            onChange={(e) => handleChange(project.id, e)}
          />
          <button
            type="button"
            onClick={() => handleRemoveProject(project.id)}
            className="remove-button"
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddProject} className="add-button">
        Add Project
      </button>
    </div>
  );
}

export default ProjectsForm;
