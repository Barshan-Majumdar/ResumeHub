import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ScrollReveal() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show button when user scrolls down more than 50% of viewport height
      setIsVisible(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Button
        size="lg"
        onClick={() => navigate("/build")}
        className="bg-gradient-primary hover:bg-gradient-secondary border-0 text-primary-foreground font-semibold px-8 py-4 rounded-full shadow-glow hover:shadow-elegant transition-all duration-300 hover:scale-105 animate-glow"
      >
        <FileText className="mr-2 h-5 w-5" />
        Build Resume
      </Button>
    </motion.div>
  );
}