import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FeatureCard } from "@/components/FeatureCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Star, Palette, Settings, ArrowRight, FileText, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">ResumeHub</span>
              <span className="text-xs text-muted-foreground">Powered by Two Tech Minds</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center space-x-4"
          >
            <Button variant="ghost" className="text-foreground hover:text-primary">
              About
            </Button>
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary"
              onClick={() => navigate("/templates")}
            >
              Templates
            </Button>
            <ThemeToggle />
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Create Your Perfect Resume in Minutes
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Build a professional resume that stands out with our powerful,
            <br />
            customizable resume generator - completely free.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              onClick={() => navigate("/templates")}
              className="bg-gradient-primary hover:bg-gradient-secondary border-0 text-primary-foreground font-semibold px-8 py-4 rounded-full shadow-glow hover:shadow-elegant transition-all duration-300 hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/templates")}
              className="border-primary/30 text-foreground hover:bg-primary/10 bg-gradient-card backdrop-blur-sm px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
            >
              View Templates
            </Button>
          </motion.div>
        </motion.div>
      </main>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Why Choose ResumeHub?
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to create a standout resume
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Star}
              title="It's Free"
              description="Create unlimited resumes at no cost. No hidden fees, no premium restrictions - everything is completely free forever."
              delay={0.1}
            />
            <FeatureCard
              icon={Palette}
              title="Customizable"
              description="Choose from professional templates and customize colors, fonts, and layouts to match your style and industry."
              delay={0.2}
            />
            <FeatureCard
              icon={Settings}
              title="More Options"
              description="Advanced features including ATS optimization, export formats, and real-time collaboration for the perfect resume."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative z-10 py-20 px-6">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-gradient-card backdrop-blur-sm border border-primary/20 rounded-3xl p-12 shadow-elegant hover:shadow-glow transition-all duration-300">
            <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to Land Your Dream Job?
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of job seekers who have successfully created their professional resumes with ResumeHub.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/templates")}
              className="bg-gradient-primary hover:bg-gradient-secondary border-0 text-primary-foreground font-semibold px-12 py-4 rounded-full shadow-glow hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-glow"
            >
              Start Building Now
              <FileText className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Scroll Reveal Component */}
      <ScrollReveal />
    </div>
  );
};

export default Index;