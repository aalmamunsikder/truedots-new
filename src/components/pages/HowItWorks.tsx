
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { UserPlus, Heart, MessageCircle, Sparkles, CheckCircle, ArrowRight } from "lucide-react";

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
          "flex items-center justify-center rounded-full w-12 h-12 mr-4 flex-shrink-0 transition-all duration-300",
          isActive 
            ? "bg-primary text-primary-foreground shadow-lg" 
            : "bg-muted text-muted-foreground"
        )}>
          {isActive ? icon : <span className="font-bold text-lg">{number}</span>}
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
      mockupData: {
        profile: {
          name: "Sarah, 24",
          location: "📍 University of California",
          bio: "Passionate about psychology, coffee, and hiking. Looking for someone who shares my values and dreams.",
          interests: ["📚 Psychology", "☕ Coffee", "🏔️ Hiking", "🎨 Art", "✈️ Travel"],
          photos: [
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          ]
        }
      }
    },
    {
      number: "02",
      title: "Discover Matches",
      description: "Our smart algorithm finds compatible singles based on your values, interests, and location.",
      icon: <Heart className="w-6 h-6 fill-current" />,
      mockupData: {
        matches: [
          {
            name: "Mike, 25",
            location: "📍 Stanford University",
            compatibility: "98%",
            interests: ["🎓 Computer Science", "🏃‍♂️ Running", "🎵 Jazz"],
            photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face"
          },
          {
            name: "Alex, 23",
            location: "📍 UC Berkeley",
            compatibility: "95%",
            interests: ["📚 Literature", "☕ Coffee", "🎨 Photography"],
            photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face"
          },
          {
            name: "David, 26",
            location: "📍 UCLA",
            compatibility: "92%",
            interests: ["🏀 Basketball", "🎵 Music", "🍕 Food"],
            photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face"
          }
        ]
      }
    },
    {
      number: "03",
      title: "Start Conversations",
      description: "Connect with your matches through secure messaging, voice calls, and video chats.",
      icon: <MessageCircle className="w-6 h-6" />,
      mockupData: {
        conversation: {
          match: "Mike",
          messages: [
            { sender: "Mike", text: "Hey Sarah! I saw we both love hiking 🏔️", time: "2:30 PM", isMatch: true },
            { sender: "Sarah", text: "Hi Mike! Yes, I'm planning a trip to Yosemite next month", time: "2:32 PM", isMatch: false },
            { sender: "Mike", text: "That sounds amazing! I've been there twice. Would love to share some tips", time: "2:35 PM", isMatch: true },
            { sender: "Sarah", text: "That would be great! Maybe we could grab coffee and chat about it? ☕", time: "2:37 PM", isMatch: false }
          ]
        }
      }
    },
    {
      number: "04",
      title: "Find True Love",
      description: "Build meaningful relationships with verified singles who share your values and dreams.",
      icon: <Sparkles className="w-6 h-6" />,
      mockupData: {
        success: {
          couple: "Sarah & Mike",
          story: "Met on TRUEdots in March 2024",
          milestone: "💍 Engaged in December 2024",
          photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=200&fit=crop&crop=face",
          quote: "\"TRUEdots brought us together through our shared love of adventure and coffee. We're getting married next summer!\""
        }
      }
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

  const renderMockup = (step: any) => {
    // Safety check - ensure step and mockupData exist
    if (!step || !step.mockupData) {
      return (
        <div className="bg-card h-full border border-border/50 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center animate-pulse">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm">Loading...</p>
          </div>
        </div>
      );
    }

    switch (activeStep) {
      case 0: // Profile Creation
        if (!step.mockupData.profile) return null;
        return (
          <div className="bg-card h-full border border-border/50 backdrop-blur-sm p-6 relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
            
            <div className="text-center mb-6 relative z-10">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg hover:scale-105 transition-transform duration-300">
                <img src={step.mockupData.profile.photos[0]} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{step.mockupData.profile.name}</h3>
              <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {step.mockupData.profile.location}
              </p>
            </div>
            
            <div className="mb-6 relative z-10">
              <p className="text-foreground text-sm mb-4 leading-relaxed">{step.mockupData.profile.bio}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {step.mockupData.profile.interests.map((interest: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-200">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 justify-center relative z-10">
              {step.mockupData.profile.photos.map((photo: string, index: number) => (
                <div key={index} className="w-12 h-12 rounded-lg overflow-hidden border-2 border-border hover:border-primary/50 transition-colors duration-200 hover:scale-110">
                  <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            
            {/* Verification badge */}
            <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Verified
            </div>
          </div>
        );

      case 1: // Matches
        if (!step.mockupData.matches) return null;
        return (
          <div className="bg-card h-full border border-border/50 backdrop-blur-sm p-6 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-foreground mb-4 text-center flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-primary fill-current" />
                Your Matches
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">3 new</span>
              </h3>
              
              <div className="space-y-4">
                {step.mockupData.matches.map((match: any, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl border border-border/30 hover:border-primary/30 hover:bg-muted/70 transition-all duration-300 hover:scale-[1.02] group">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border group-hover:border-primary/50 transition-colors duration-200">
                      <img src={match.photo} alt={match.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors duration-200">{match.name}</h4>
                        <span className="text-primary text-xs font-bold bg-primary/20 px-2 py-1 rounded-full">{match.compatibility}</span>
                      </div>
                      <p className="text-muted-foreground text-xs mb-2">{match.location}</p>
                      <div className="flex flex-wrap gap-1">
                        {match.interests.slice(0, 2).map((interest: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-200 opacity-0 group-hover:opacity-100">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2: // Conversations
        if (!step.mockupData.conversation) return null;
        return (
          <div className="bg-card h-full border border-border/50 backdrop-blur-sm p-4 flex flex-col relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-1/2 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-accent rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.7s'}}></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4 p-3 bg-primary/10 rounded-xl border border-primary/20 hover:bg-primary/20 transition-colors duration-200">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/30">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" alt="Mike" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground text-sm">Mike</h4>
                  <p className="text-green-500 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
                <div className="flex gap-1">
                  <button className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors duration-200">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 bg-primary/20 text-primary rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors duration-200">
                    <UserPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 space-y-3 overflow-y-auto mb-4">
                {step.mockupData.conversation.messages.map((message: any, index: number) => (
                  <div key={index} className={`flex ${message.isMatch ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-2 duration-300`} style={{animationDelay: `${index * 100}ms`}}>
                    <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                      message.isMatch 
                        ? 'bg-muted text-foreground border border-border/30' 
                        : 'bg-primary text-primary-foreground'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isMatch ? 'text-muted-foreground' : 'text-primary-foreground/70'
                      }`}>{message.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2 relative z-10">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 px-3 py-2 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-background text-foreground"
                />
                <button className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors duration-200 hover:scale-105">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );

      case 3: // Success Story
        if (!step.mockupData.success) return null;
        return (
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 h-full border border-border/50 backdrop-blur-sm rounded-2xl p-6 text-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.3s'}}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.6s'}}></div>
            </div>
            
            <div className="relative z-10">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg hover:scale-105 transition-transform duration-300">
                  <img src={step.mockupData.success.photo} alt="Success couple" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">{step.mockupData.success.couple}</h3>
                <p className="text-muted-foreground text-sm mb-1">{step.mockupData.success.story}</p>
                <p className="text-primary font-semibold text-lg flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  {step.mockupData.success.milestone}
                </p>
              </div>
              
              <div className="bg-card rounded-xl p-4 mb-4 border border-border/50 shadow-sm">
                <p className="text-foreground text-sm italic">"{step.mockupData.success.quote}"</p>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Success Story Verified</span>
              </div>
              
              {/* Success metrics */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-card/50 rounded-lg p-3 border border-border/30">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <div className="text-xs text-muted-foreground">Compatibility</div>
                </div>
                <div className="bg-card/50 rounded-lg p-3 border border-border/30">
                  <div className="text-2xl font-bold text-accent">18mo</div>
                  <div className="text-xs text-muted-foreground">To Engagement</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-card h-full border border-border/50 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center animate-pulse">
                <Heart className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-sm">Select a step to see how it works</p>
            </div>
          </div>
        );
    }
  };
  
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
                {renderMockup(step)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
