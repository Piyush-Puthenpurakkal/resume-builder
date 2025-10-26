import React from "react";
import { useResume } from "../context/useResume";
import "../styles/ResumePreview.css"; // For specific preview styling

const ResumePreview = React.forwardRef((props, ref) => {
  const { resumeData } = useResume();
  const {
    personalDetails,
    summary,
    education,
    experience,
    skills,
    projects,
    certifications,
  } = resumeData;

  return (
    <div ref={ref} className="resume-preview-container a4-size">
      <header className="preview-header">
        <h1>{personalDetails.name || "Your Name"}</h1>
        <p className="contact-info">
          {personalDetails.address && <span>{personalDetails.address} | </span>}
          {personalDetails.phone && <span>{personalDetails.phone} | </span>}
          {personalDetails.email && (
            <a href={`mailto:${personalDetails.email}`}>
              {personalDetails.email}
            </a>
          )}
        </p>
        <p className="social-links">
          {personalDetails.linkedin && (
            <a
              href={personalDetails.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}{" "}
          {personalDetails.github && (
            <a
              href={personalDetails.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              | GitHub
            </a>
          )}{" "}
          {personalDetails.portfolio && (
            <a
              href={personalDetails.portfolio}
              target="_blank"
              rel="noopener noreferrer"
            >
              | Portfolio
            </a>
          )}
        </p>
      </header>

      {summary && (
        <section className="preview-section">
          <h2>Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="preview-section">
          <h2>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="preview-item">
              <h3>{exp.title}</h3>
              <p className="sub-heading">{exp.company}</p>
              <p className="dates">
                {exp.startDate} - {exp.endDate}
              </p>
              <ul className="description-list">
                {exp.description.split("\n").map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section className="preview-section">
          <h2>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="preview-item">
              <h3>{edu.degree}</h3>
              <p className="sub-heading">{edu.institution}</p>
              <p className="dates">
                {edu.startDate} - {edu.endDate}
              </p>
              <p>{edu.description}</p>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section className="preview-section">
          <h2>Skills</h2>
          <div className="skills-grid">
            {skills.map(
              (skillCategory) =>
                skillCategory.items.length > 0 && (
                  <div
                    key={skillCategory.id}
                    className="skill-category-preview"
                  >
                    <h3>{skillCategory.name}:</h3>
                    <p>
                      {skillCategory.items.map((item) => item.name).join(", ")}
                    </p>
                  </div>
                )
            )}
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="preview-section">
          <h2>Projects</h2>
          {projects.map((project) => (
            <div key={project.id} className="preview-item">
              <h3>
                {project.name}{" "}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    (Link)
                  </a>
                )}
              </h3>
              <ul className="description-list">
                {project.description.split("\n").map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {certifications.length > 0 && (
        <section className="preview-section">
          <h2>Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} className="preview-item">
              <h3>{cert.name}</h3>
              <p className="sub-heading">{cert.issuingOrganization}</p>
              <p className="dates">{cert.issueDate}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
});

export default ResumePreview;
