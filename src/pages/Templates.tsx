import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const navigate = useNavigate();

  const templates = [
    { id: 1, name: "Classic Professional", color: "bg-gradient-to-br from-blue-500 to-blue-700", preview: "Clean and professional layout with traditional styling" },
    { id: 2, name: "Modern Minimalist", color: "bg-gradient-to-br from-green-500 to-green-700", preview: "Sleek design with plenty of white space" },
    { id: 3, name: "Creative Designer", color: "bg-gradient-to-br from-purple-500 to-purple-700", preview: "Bold and creative layout for designers" },
    { id: 4, name: "Executive Elite", color: "bg-gradient-to-br from-gray-600 to-gray-800", preview: "Sophisticated template for senior positions" },
    { id: 5, name: "Tech Innovator", color: "bg-gradient-to-br from-cyan-500 to-cyan-700", preview: "Modern tech-focused design with clean lines" },
    { id: 6, name: "Academic Scholar", color: "bg-gradient-to-br from-indigo-500 to-indigo-700", preview: "Perfect for academic and research positions" },
    { id: 7, name: "Startup Enthusiast", color: "bg-gradient-to-br from-orange-500 to-orange-700", preview: "Dynamic design for startup environments" },
    { id: 8, name: "Healthcare Pro", color: "bg-gradient-to-br from-teal-500 to-teal-700", preview: "Professional template for healthcare workers" },
    { id: 9, name: "Finance Expert", color: "bg-gradient-to-br from-emerald-500 to-emerald-700", preview: "Conservative and trustworthy design" },
    { id: 10, name: "Creative Artist", color: "bg-gradient-to-br from-pink-500 to-pink-700", preview: "Artistic and expressive layout" }
  ];

  const handleTemplateSelect = (templateId: number) => {
    navigate(`/build?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
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
        </div>
      </header>

      {/* Templates Section */}
      <main className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Choose Your Template
            </h1>
            <p className="text-xl text-muted-foreground">
              Select from our collection of professional resume templates
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-gradient-card backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`${template.color} h-48 rounded-lg mb-4 relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-white/10 p-4">
                        <div className="bg-white/20 h-4 w-3/4 rounded mb-2"></div>
                        <div className="bg-white/15 h-3 w-1/2 rounded mb-4"></div>
                        <div className="space-y-2">
                          <div className="bg-white/10 h-2 w-full rounded"></div>
                          <div className="bg-white/10 h-2 w-5/6 rounded"></div>
                          <div className="bg-white/10 h-2 w-4/5 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {template.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {template.preview}
                    </p>
                    <Button
                      onClick={() => handleTemplateSelect(template.id)}
                      className="w-full bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground"
                    >
                      Use This Template
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Templates;