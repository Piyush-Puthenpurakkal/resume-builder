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
  skills: [],
  projects: [],
  certifications: [],
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    const savedData = localStorage.getItem("resumeData");
    return savedData ? JSON.parse(savedData) : initialResumeData;
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
