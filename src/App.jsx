import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import SummaryForm from "./components/SummaryForm";
import EducationForm from "./components/EducationForm";
import ExperienceForm from "./components/ExperienceForm";
import SkillsForm from "./components/SkillsForm";
import ProjectsForm from "./components/ProjectsForm";
import CertificationsForm from "./components/CertificationsForm";
import ResumePreview from "./components/ResumePreview";
import "./App.css"; // For general layout and styling

function App() {
  const resumePreviewRef = useRef();
  const [showPreview, setShowPreview] = useState(false); // State for mobile preview toggle
  const [expandedSections, setExpandedSections] = useState({
    personalDetails: true,
    summary: true,
    education: true,
    experience: true,
    skills: true,
    projects: true,
    certifications: true,
  });

  const toggleSection = (sectionName) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const handleDownloadPdf = async () => {
    const element = resumePreviewRef.current;
    if (!element) {
      console.error("Resume preview element not found for PDF download.");
      return;
    }

    const canvas = await html2canvas(element, { scale: 2 }); // Re-introducing scale for better resolution
    console.log("Canvas dimensions:", canvas.width, canvas.height); // Debugging canvas output
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let cursorY = 0; // Tracks the current Y position in the PDF

    // Get all links from the element once
    const links = element.querySelectorAll("a");
    console.log("Found links (initial query):", links); // Debugging: Log found links

    // Function to add image and links for a given page segment
    const addPageSegment = (
      pdfInstance,
      imgDataSegment,
      yOffset,
      pageLinks
    ) => {
      pdfInstance.addImage(
        imgDataSegment,
        "PNG",
        0,
        yOffset,
        imgWidth,
        imgHeight
      );

      // Add clickable links for the current page segment
      pageLinks.forEach((link) => {
        const rect = link.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect(); // Get rect of the parent element
        const linkTop =
          ((rect.top - elementRect.top) * imgHeight) / canvas.height; // Adjust relative to parent
        const linkBottom =
          ((rect.bottom - elementRect.top) * imgHeight) / canvas.height; // Adjust relative to parent

        console.log("Link debug:", {
          url: link.href,
          linkTop,
          linkBottom,
          yOffset,
          pageHeight,
          condition: linkTop >= -yOffset && linkBottom <= -yOffset + pageHeight,
          currentPage: pdfInstance.internal.getNumberOfPages(),
        });

        // Check if the link is within the current page segment
        if (linkTop >= -yOffset && linkBottom <= -yOffset + pageHeight) {
          const scaleX = imgWidth / elementRect.width;
          const scaleY = imgHeight / elementRect.height;

          const pdfX = (rect.left - elementRect.left) * scaleX;
          const pdfY = (rect.top - elementRect.top) * scaleY + yOffset;
          const pdfWidth = rect.width * scaleX;
          const pdfHeight = rect.height * scaleY + 2; // Increased buffer to 2mm for debugging

          console.log("Adding link (SUCCESS):", {
            url: link.href,
            pdfX,
            pdfY,
            pdfWidth,
            pdfHeight,
            linkTop,
            yOffset,
            pageHeight,
            currentPage: pdfInstance.internal.getNumberOfPages(),
          });

          pdfInstance.link(pdfX, pdfY, pdfWidth, pdfHeight, {
            url: link.href,
          });
        }
      });
    };

    addPageSegment(pdf, imgData, 0, links);
    heightLeft -= pageHeight;
    cursorY += pageHeight;

    while (heightLeft > 0) {
      pdf.addPage();
      const yOffset = -cursorY; // Negative offset for the image
      addPageSegment(pdf, imgData, yOffset, links);
      heightLeft -= pageHeight;
      cursorY += pageHeight;
    }

    pdf.save("resume.pdf");
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className={`app-container ${showPreview ? "show-preview" : ""}`}>
      {/* Editor Panel */}
      <div className="editor-panel">
        <h1>Resume Builder</h1>
        <PersonalDetailsForm
          isExpanded={expandedSections.personalDetails}
          toggleExpand={() => toggleSection("personalDetails")}
        />
        <SummaryForm
          isExpanded={expandedSections.summary}
          toggleExpand={() => toggleSection("summary")}
        />
        <EducationForm
          isExpanded={expandedSections.education}
          toggleExpand={() => toggleSection("education")}
        />
        <ExperienceForm
          isExpanded={expandedSections.experience}
          toggleExpand={() => toggleSection("experience")}
        />
        <SkillsForm
          isExpanded={expandedSections.skills}
          toggleExpand={() => toggleSection("skills")}
        />
        <ProjectsForm
          isExpanded={expandedSections.projects}
          toggleExpand={() => toggleSection("projects")}
        />
        <CertificationsForm
          isExpanded={expandedSections.certifications}
          toggleExpand={() => toggleSection("certifications")}
        />
        {/* Download button for desktop */}
        <button
          onClick={handleDownloadPdf}
          className="download-button desktop-only"
        >
          Download as PDF
        </button>
      </div>

      {/* Preview Panel */}
      <div className="preview-panel">
        <ResumePreview ref={resumePreviewRef} />
      </div>

      {/* Floating Download button for mobile */}
      <button
        onClick={handleDownloadPdf}
        className="download-button mobile-floating-download"
      >
        ⬇️ Download PDF
      </button>
      {/* Mobile-only toggle button */}
      <button
        onClick={togglePreview}
        className="toggle-preview-button mobile-only"
      >
        {showPreview ? "✏️ Back to Editor" : "👁️️ Show Preview"}
      </button>
    </div>
  );
}

export default App;
