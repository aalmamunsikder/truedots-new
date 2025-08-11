
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { UserPlus, Heart, MessageCircle, Sparkles } from "lucide-react";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const StepCard = ({ number, title, description, icon, isActive, onClick }: StepCardProps) => {
  return (
    <div 
      className={cn(
        "rounded-xl p-6 cursor-pointer transition-all duration-500 border backdrop-blur-sm",
        isActive 
          ? "bg-card shadow-elegant border-primary/50 scale-[1.02]" 
          : "bg-card/50 hover:bg-card/70 border-border/50 hover:border-primary/30"
      )}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={cn(
          "flex items-center justify-center rounded-full w-12 h-12 mr-4 flex-shrink-0 transition-all duration-300 font-mono text-lg font-bold",
          isActive 
            ? "bg-primary text-primary-foreground shadow-lg" 
            : "bg-muted text-muted-foreground"
        )}>
          {isActive ? icon : number}
        </div>
        <div>
          <h3 className={cn(
            "text-lg font-semibold mb-2 transition-colors duration-300",
            isActive ? "text-primary" : "text-foreground"
          )}>
            {title}
          </h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsData = [
    {
      number: "01",
      title: "Create Your Profile",
      description: "Sign up and build your authentic profile with photos and interests. Verification takes just minutes.",
      icon: <UserPlus className="w-6 h-6" />,
      code: `💕 Welcome to TRUEdots
📸 Upload your best photos
✍️ Share your story and interests`,
      terminalOutput: [
        "💕 Creating your profile...",
        "📸 Verifying your photos...",
        "✨ Setting up your preferences...",
        "✓ Ready to find meaningful connections!"
      ]
    },
    {
      number: "02",
      title: "Discover Matches",
      description: "Our smart algorithm finds compatible singles based on your values, interests, and location.",
      icon: <Heart className="w-6 h-6 fill-current" />,
      code: `💖 Smart matching algorithm
📍 Location-based search
🎯 Compatibility analysis`,
      terminalOutput: [
        "💖 Analyzing compatibility...",
        "🎯 Finding your perfect matches...",
        "📍 Searching nearby singles...",
        "💫 Your matches are ready!"
      ]
    },
    {
      number: "03",
      title: "Start Conversations",
      description: "Connect with your matches through secure messaging, voice calls, and video chats.",
      icon: <MessageCircle className="w-6 h-6" />,
      code: `💬 Send meaningful messages
🎥 Video calls available
🔒 End-to-end encryption`,
      terminalOutput: [
        "💬 Starting conversation...",
        "🔒 Securing your messages...",
        "🎥 Video chat ready...",
        "💕 Building connections!"
      ]
    },
    {
      number: "04",
      title: "Find True Love",
      description: "Build meaningful relationships with verified singles who share your values and dreams.",
      icon: <Sparkles className="w-6 h-6" />,
      code: `💞 Meaningful connections
💍 Long-term relationships
🌟 Your happily ever after`,
      terminalOutput: [
        "💞 Building deep connections...",
        "💍 Planning your future together...",
        "🌟 Creating lasting memories...",
        "✨ You found your TRUE love!"
      ]
    }
  ];

  useEffect(() => {
    // Auto-cycle through steps
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stepsData.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [stepsData.length]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".fade-in-stagger");
    elements.forEach((el, index) => {
      (el as HTMLElement).style.animationDelay = `${0.1 * (index + 1)}s`;
      observer.observe(el);
    });
    
    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);
  
  return (
    <section className="py-20 bg-background relative overflow-hidden" id="how-it-works" ref={sectionRef}>
      {/* Enhanced background decorative elements */}
      <div className="absolute -top-20 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full opacity-60 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full opacity-70 blur-3xl -z-10"></div>
      
      {/* Floating love symbols */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-40 left-[15%] text-primary/20 text-4xl animate-bounce">💕</div>
        <div className="absolute top-60 right-[20%] text-accent/20 text-3xl animate-pulse">💖</div>
        <div className="absolute bottom-40 left-[70%] text-primary/20 text-5xl animate-bounce">💜</div>
      </div>
      
      <div className="section-container">
        <div className="text-center mb-16 opacity-0 fade-in-stagger">
          <div className="love-chip mx-auto mb-4">
            <span>How It Works</span>
          </div>
          <h2 className="section-title mb-4">
            Find Love in
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"> Four Simple Steps</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Join TRUEdots and discover your meaningful connection through our proven process designed for authentic relationships.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 order-2 lg:order-1 opacity-0 fade-in-stagger">
            {stepsData.map((step, index) => (
              <StepCard
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                icon={step.icon}
                isActive={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
          
          <div className="relative rounded-3xl overflow-hidden h-[500px] shadow-elegant order-1 lg:order-2 opacity-0 fade-in-stagger">
            {stepsData.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000",
                  activeStep === index ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              >
                <div className="bg-card h-full border border-border/50 backdrop-blur-sm">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 p-4 border-b border-border/50 bg-muted/50">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                    <span className="text-muted-foreground ml-2 text-sm">TRUEdots-app - Step {step.number}</span>
                  </div>
                  
                  {/* Code Section */}
                  <div className="p-6 text-sm bg-card/50">
                    <div className="text-accent mb-2">💕 # {step.title}</div>
                    {step.code.split('\n').map((line, lineIndex) => (
                      <div key={lineIndex} className="flex mb-1">
                        <span className="text-muted-foreground mr-2">💖</span>
                        <span className="text-foreground">{line}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Output Section */}
                  <div className="p-6 pt-0 text-sm">
                    <div className="space-y-1">
                      {step.terminalOutput.map((output, outputIndex) => (
                        <div key={outputIndex} className="text-muted-foreground flex items-center">
                          <span className="text-primary mr-2">→</span>
                          {output}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Preview Section */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/20 to-transparent p-6">
                    <div className="text-center">
                      <div className="inline-flex items-center px-4 py-2 bg-primary/20 rounded-lg backdrop-blur-sm border border-primary/30">
                        {step.icon}
                        <span className="ml-2 text-primary font-medium">{step.title}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
