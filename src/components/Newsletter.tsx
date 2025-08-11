import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Mail, Heart, Users } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome to TRUEdots! 💕",
        description: "You'll receive dating tips, success stories, and updates about new features."
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="get-started" className="bg-background py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-[5%] text-primary/10 text-8xl animate-pulse">💕</div>
        <div className="absolute bottom-20 right-[10%] text-accent/10 text-6xl animate-bounce">💖</div>
        <div className="absolute top-60 right-[70%] text-primary/10 text-4xl animate-pulse">💜</div>
      </div>
      
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <div className="love-chip mx-auto mb-6">
            <Heart className="w-3 h-3 mr-1 fill-current" />
            <span>Join TRUEdots</span>
          </div>

          <h2 className="section-title mb-4">
            Start Your <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Love Journey Today
            </span>
          </h2>

          <p className="text-xl text-muted-foreground mb-10">
            Get dating tips, success stories, and be the first to know about new features and events.
            <br />
            <span className="text-primary text-sm">💕 No spam, just meaningful connections</span>
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 items-center max-w-md mx-auto">
            <div className="relative flex-grow w-full">
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Enter your email..." 
                className="w-full px-6 py-4 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 backdrop-blur-sm"
                required 
              />
              <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="button-primary flex items-center justify-center w-full sm:w-auto whitespace-nowrap min-w-[180px]"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                  Joining...
                </div>
              ) : (
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-2 fill-current" />
                  Join TRUEdots
                </div>
              )}
            </button>
          </form>
          
          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <Heart className="w-4 h-4 mr-2 text-primary fill-current" />
              Dating Tips & Advice
            </div>
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <Users className="w-4 h-4 mr-2 text-accent" />
              Success Stories
            </div>
            <div className="flex items-center justify-center text-sm text-muted-foreground">
              <Mail className="w-4 h-4 mr-2 text-primary" />
              Exclusive Events
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;