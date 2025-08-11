
import React, { useState } from "react";
import { toast } from "sonner";
import { Code2, Sparkles, Download, Palette } from "lucide-react";

const DetailsSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.fullName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Demo form submission
    toast.success("Welcome to the vibe community! ✨ Check your email for next steps.");

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      company: ""
    });
  };

  return (
    <section id="details" className="w-full bg-background py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-[5%] text-primary/10 font-mono text-8xl animate-pulse">{'[]'}</div>
        <div className="absolute bottom-20 right-[10%] text-accent/10 font-mono text-6xl animate-bounce">{'()'}</div>
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
          {/* Left Card - Platform Details */}
          <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant border border-border/50">
            {/* Card Header */}
            <div className="relative h-48 sm:h-64 p-6 sm:p-8 bg-gradient-to-br from-primary/20 via-card to-accent/20 flex items-end">
              <h2 className="text-2xl sm:text-3xl font-display text-foreground font-bold">
                Platform Details
              </h2>
            </div>
            
            {/* Card Content */}
            <div className="bg-card/50 p-4 sm:p-8 backdrop-blur-sm border-t border-border/30">
              <h3 className="text-lg sm:text-xl font-display mb-6 sm:mb-8 text-foreground">
                Developer-first aesthetic platform with maximum vibes
              </h3>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 flex-shrink-0 border border-primary/30">
                    <Code2 className="w-3 h-3 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50">
                      <span className="font-semibold text-base text-foreground">Themes:</span> 
                      <span className="text-primary ml-2">100+ Curated</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-1 flex-shrink-0 border border-accent/30">
                    <Sparkles className="w-3 h-3 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50">
                      <span className="font-semibold text-base text-foreground">Animations:</span>
                      <span className="text-accent ml-2">Butter Smooth</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 flex-shrink-0 border border-primary/30">
                    <Download className="w-3 h-3 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50">
                      <span className="font-semibold text-base text-foreground">Installs:</span>
                      <span className="text-primary ml-2">1M+ Downloads</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-1 flex-shrink-0 border border-accent/30">
                    <Palette className="w-3 h-3 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50">
                      <span className="font-semibold text-base text-foreground">Customization:</span>
                      <span className="text-accent ml-2">Infinite</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1 flex-shrink-0 border border-primary/30">
                    <span className="text-primary font-mono text-xs font-bold">✨</span>
                  </div>
                  <div className="flex-1">
                    <div className="p-3 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50">
                      <span className="font-semibold text-base text-foreground">Vibe Level:</span>
                      <span className="text-primary ml-2">Maximum</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - Demo Request Form */}
          <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant border border-border/50">
            {/* Card Header */}
            <div className="relative h-48 sm:h-64 p-6 sm:p-8 bg-gradient-to-br from-accent/20 via-card to-primary/20 flex flex-col items-start">
              <div className="inline-block px-4 sm:px-6 py-2 border border-primary text-primary rounded-full text-xs mb-4 bg-primary/10 backdrop-blur-sm">
                Early Access
              </div>
              <h2 className="text-2xl sm:text-3xl font-display text-foreground font-bold mt-auto">
                Join the Vibe Community
              </h2>
            </div>
            
            {/* Card Content - Form */}
            <div className="bg-card/50 p-4 sm:p-8 backdrop-blur-sm border-t border-border/30">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleChange} 
                    placeholder="Full name" 
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary backdrop-blur-sm transition-all duration-300" 
                    required 
                  />
                </div>
                
                <div>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email address" 
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary backdrop-blur-sm transition-all duration-300" 
                    required 
                  />
                </div>
                
                <div>
                  <input 
                    type="text" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    placeholder="Company (optional)" 
                    className="w-full px-4 py-3 rounded-xl border border-border bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary backdrop-blur-sm transition-all duration-300" 
                  />
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="button-primary w-full flex items-center justify-center"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Early Access
                  </button>
                </div>
              </form>
              
              <p className="text-muted-foreground text-sm text-center mt-4">
                <span className="font-mono text-accent">// </span>
                Join 50K+ developers already coding with maximum vibes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
