import React, { createContext, useState, useEffect } from "react";

export const ResumeContext = createContext();

const initialResumeData = {
  personalDetails: {
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    portfolio: "", // Added portfolio field
    address: "",
  },
  summary: "",
  education: [],
  experience: [],
  skills: [
    { id: 1, name: "Languages", items: [] },
    { id: 2, name: "Frontend", items: [] },
    { id: 3, name: "Backend", items: [] },
    { id: 4, name: "Databases", items: [] },
    { id: 5, name: "Tools", items: [] },
    { id: 6, name: "Testing", items: [] },
    { id: 7, name: "Cloud & DevOps", items: [] },
  ],
  projects: [],
  certifications: [],
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Check if skills data needs migration
      if (
        parsedData.skills &&
        parsedData.skills.length > 0 &&
        !parsedData.skills[0].items
      ) {
        // Old skills format detected, migrate to new format
        const migratedSkills = initialResumeData.skills.map((category) => {
          const existingCategory = parsedData.skills.find(
            (oldSkill) => oldSkill.name === category.name
          );
          if (existingCategory) {
            return { ...category, items: existingCategory.items || [] }; // Assuming old skills might have a 'name' property
          }
          return category;
        });
        return { ...parsedData, skills: migratedSkills };
      }
      return parsedData;
    }
    return initialResumeData;
  });

  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  const updateResumeData = (section, data) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };

  return (
    <ResumeContext.Provider value={{ resumeData, updateResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};
