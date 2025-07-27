import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, FileText, Download, Plus, Trash2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react"; 

// ...existing code...

const ResumeBuilder = () => {
  // ...existing code...

  // Inject PDF clean styles once on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.head.querySelector('style[data-pdf-clean]')) {
      const style = document.createElement('style');
      style.setAttribute('data-pdf-clean', 'true');
      style.innerHTML = `
        .pdf-clean-bg, .pdf-clean-bg * {
          background: #fff !important;
          box-shadow: none !important;
          color-adjust: exact !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .pdf-preview-wrapper {
          max-width: 700px;
          margin: 0 auto;
          padding: 32px 16px;
        }
        .pdf-card-export {
          box-shadow: none !important;
          background: #fff !important;
          border: 1px solid #e5e7eb !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  year: string;
}

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("template") || "1";

  // Template style mapping
  const templateStyles: Record<string, { card: string; header: string; section: string; text: string }> = {
    '1': { card: 'bg-white border border-gray-200', header: 'text-blue-700', section: 'text-blue-600', text: 'text-gray-900' },
    '2': { card: 'bg-gray-50 border border-gray-300', header: 'text-green-700', section: 'text-green-600', text: 'text-gray-800' },
    '3': { card: 'bg-gradient-to-br from-purple-500 to-purple-700', header: 'text-white', section: 'text-purple-200', text: 'text-white' },
    '4': { card: 'bg-gradient-to-br from-gray-600 to-gray-800', header: 'text-yellow-200', section: 'text-yellow-100', text: 'text-white' },
    '5': { card: 'bg-gradient-to-br from-cyan-500 to-cyan-700', header: 'text-white', section: 'text-cyan-200', text: 'text-white' },
    '6': { card: 'bg-gradient-to-br from-indigo-500 to-indigo-700', header: 'text-white', section: 'text-indigo-200', text: 'text-white' },
    '7': { card: 'bg-gradient-to-br from-orange-500 to-orange-700', header: 'text-white', section: 'text-orange-200', text: 'text-white' },
    '8': { card: 'bg-gradient-to-br from-teal-500 to-teal-700', header: 'text-white', section: 'text-teal-200', text: 'text-white' },
    '9': { card: 'bg-gradient-to-br from-emerald-500 to-emerald-700', header: 'text-white', section: 'text-emerald-200', text: 'text-white' },
    '10': { card: 'bg-gradient-to-br from-pink-500 to-pink-700', header: 'text-white', section: 'text-pink-200', text: 'text-white' },
  };
  const selectedStyle = templateStyles[templateId] || templateStyles['1'];

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: ""
  });

  const [experiences, setExperiences] = useState<Experience[]>([
    { id: 1, company: "", position: "", duration: "", description: "" }
  ]);

  const [education, setEducation] = useState<Education[]>([
    { id: 1, institution: "", degree: "", year: "" }
  ]);

  const [skills, setSkills] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    // Add a clean style for PDF export
    const previewEl = previewRef.current;
    const originalClass = previewEl.className;
    previewEl.className += ' pdf-clean-bg';
    // Wait for style to apply
    await new Promise((res) => setTimeout(res, 100));
    const canvas = await html2canvas(previewEl, { scale: 3, backgroundColor: '#fff', useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * pageWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("resume.pdf");
    // Restore original class
    previewEl.className = originalClass;
  };

  const addExperience = () => {
    setExperiences([...experiences, { 
      id: experiences.length + 1, 
      company: "", 
      position: "", 
      duration: "", 
      description: "" 
    }]);
  };

  const removeExperience = (id: number) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: number, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    setEducation([...education, { 
      id: education.length + 1, 
      institution: "", 
      degree: "", 
      year: "" 
    }]);
  };

  const removeEducation = (id: number) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: number, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="p-6 border-b border-primary/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/templates")}
            className="text-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">ResumeHub</span>
              <span className="text-xs text-muted-foreground">Powered by Two Tech Minds</span>
            </div>
          </div>
          <Button className="bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground" onClick={handleDownloadPDF}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Form Section */}
        <div className="lg:w-1/2 p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">Build Your Resume</h2>

            {/* Personal Information */}
            <Card className="bg-gradient-card backdrop-blur-sm border border-primary/20">
              <CardHeader>
                <CardTitle className="text-foreground">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                    <Input
                      id="fullName"
                      value={personalInfo.fullName}
                      onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-foreground">Phone</Label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-foreground">Address</Label>
                    <Input
                      id="address"
                      value={personalInfo.address}
                      onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                      placeholder="City, State"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="summary" className="text-foreground">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    value={personalInfo.summary}
                    onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
                    placeholder="Brief description of your professional background..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card className="bg-gradient-card backdrop-blur-sm border border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground">Work Experience</CardTitle>
                <Button onClick={addExperience} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border border-primary/10 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-foreground">Experience {exp.id}</h4>
                      {experiences.length > 1 && (
                        <Button
                          onClick={() => removeExperience(exp.id)}
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-foreground">Company</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <Label className="text-foreground">Position</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                          placeholder="Job Title"
                        />
                      </div>
                      <div>
                        <Label className="text-foreground">Duration</Label>
                        <Input
                          value={exp.duration}
                          onChange={(e) => updateExperience(exp.id, "duration", e.target.value)}
                          placeholder="2020 - 2023"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-foreground">Description</Label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                        placeholder="Describe your responsibilities and achievements..."
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="bg-gradient-card backdrop-blur-sm border border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground">Education</CardTitle>
                <Button onClick={addEducation} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="border border-primary/10 rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-foreground">Education {edu.id}</h4>
                      {education.length > 1 && (
                        <Button
                          onClick={() => removeEducation(edu.id)}
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-foreground">Institution</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                          placeholder="University Name"
                        />
                      </div>
                      <div>
                        <Label className="text-foreground">Degree</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                          placeholder="Bachelor's in Computer Science"
                        />
                      </div>
                      <div>
                        <Label className="text-foreground">Year</Label>
                        <Input
                          value={edu.year}
                          onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                          placeholder="2020"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-gradient-card backdrop-blur-sm border border-primary/20">
              <CardHeader>
                <CardTitle className="text-foreground">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="skills" className="text-foreground">Skills (comma separated)</Label>
                <Textarea
                  id="skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="JavaScript, React, Node.js, Python..."
                  rows={3}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Preview Section */}
        <div className="lg:w-1/2 p-6 bg-background/50">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-6"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">Live Preview</h3>
            <div ref={previewRef} className="pdf-preview-wrapper">
              <Card className={selectedStyle.card + " shadow-lg pdf-card-export"}>
                <CardContent className="p-8">
                  <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center border-b pb-4">
                    <h1 className={`text-2xl font-bold ${selectedStyle.header}`}>
                      {personalInfo.fullName || "Your Name"}
                    </h1>
                    <div className={`text-sm mt-2 ${selectedStyle.text}`}>
                      {personalInfo.email && <span>{personalInfo.email}</span>}
                      {personalInfo.phone && personalInfo.email && <span> | </span>}
                      {personalInfo.phone && <span>{personalInfo.phone}</span>}
                      {personalInfo.address && (personalInfo.email || personalInfo.phone) && <span> | </span>}
                      {personalInfo.address && <span>{personalInfo.address}</span>}
                    </div>
                  </div>

                  {/* Summary */}
                  {personalInfo.summary && (
                    <div>
                      <h2 className={`text-lg font-semibold border-b mb-2 ${selectedStyle.section}`}>Professional Summary</h2>
                      <p className={`${selectedStyle.text} text-sm`}>{personalInfo.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {experiences.some(exp => exp.company || exp.position) && (
                    <div>
                      <h2 className={`text-lg font-semibold border-b mb-2 ${selectedStyle.section}`}>Work Experience</h2>
                      <div className="space-y-3">
                        {experiences.filter(exp => exp.company || exp.position).map((exp) => (
                          <div key={exp.id}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className={`font-medium ${selectedStyle.header}`}>{exp.position || "Position"}</h3>
                                <p className={`${selectedStyle.text} text-sm`}>{exp.company || "Company"}</p>
                              </div>
                              <span className={`${selectedStyle.text} text-sm`}>{exp.duration || "Duration"}</span>
                            </div>
                            {exp.description && <p className={`${selectedStyle.text} text-sm mt-1`}>{exp.description}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {education.some(edu => edu.institution || edu.degree) && (
                    <div>
                      <h2 className={`text-lg font-semibold border-b mb-2 ${selectedStyle.section}`}>Education</h2>
                      <div className="space-y-2">
                        {education.filter(edu => edu.institution || edu.degree).map((edu) => (
                          <div key={edu.id} className="flex justify-between items-start">
                            <div>
                              <h3 className={`font-medium ${selectedStyle.header}`}>{edu.degree || "Degree"}</h3>
                              <p className={`${selectedStyle.text} text-sm`}>{edu.institution || "Institution"}</p>
                            </div>
                            <span className={`${selectedStyle.text} text-sm`}>{edu.year || "Year"}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {skills && (
                    <div>
                      <h2 className={`text-lg font-semibold border-b mb-2 ${selectedStyle.section}`}>Skills</h2>
                      <p className={`${selectedStyle.text} text-sm`}>{skills}</p>
                    </div>
                  )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;