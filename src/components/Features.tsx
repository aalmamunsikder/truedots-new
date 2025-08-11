
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Heart, MapPin, MessageCircle, Shield, Users, Sparkles } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
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
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "feature-card glass-card opacity-0 p-4 sm:p-6 group",
        "lg:hover:bg-gradient-to-br lg:hover:from-card lg:hover:to-secondary/50",
        "border border-border/50 hover:border-primary/30",
        "transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl",
        "cursor-pointer"
      )}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="rounded-full bg-primary/20 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-primary mb-4 sm:mb-5 border border-primary/30 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
        {description}
      </p>
      
      {/* Hover glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-accent/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-16 sm:py-20 md:py-24 relative bg-background overflow-hidden" id="features" ref={sectionRef}>
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-[5%] text-primary/5 dark:text-primary/8 text-6xl sm:text-8xl animate-pulse">💕</div>
        <div className="absolute bottom-20 right-[10%] text-accent/5 dark:text-accent/8 text-4xl sm:text-6xl animate-bounce">💖</div>
        <div className="absolute top-1/2 left-[70%] text-primary/3 dark:text-primary/5 text-9xl animate-pulse">💜</div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 dark:via-primary/5 to-transparent -z-10"></div>
      
      <div className="section-container">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="love-chip mx-auto mb-4 sm:mb-6 opacity-0 fade-in-element">
            <Heart className="w-3 h-3 mr-1 fill-current" />
            <span>Features</span>
          </div>
          <h2 className="section-title mb-4 sm:mb-6 opacity-0 fade-in-element">
            Find Love with <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">Meaningful Connections</span>
          </h2>
          <p className="section-subtitle mx-auto opacity-0 fade-in-element max-w-2xl">
            Discover authentic relationships through our advanced matching algorithm and safety-first approach to online dating.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          <FeatureCard
            icon={<Heart className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />}
            title="Smart Matching"
            description="Advanced algorithm analyzes compatibility based on values, interests, and lifestyle to find your perfect match with meaningful connections."
            index={0}
          />
          <FeatureCard
            icon={<MapPin className="w-6 h-6 sm:w-7 sm:h-7" />}
            title="Location-Based Search"
            description="Find love nearby with precise location matching. Connect with singles in your area or expand your search radius to discover new possibilities."
            index={1}
          />
          <FeatureCard
            icon={<MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />}
            title="Secure Messaging"
            description="End-to-end encrypted chat with voice and video calls. Share your thoughts safely while building genuine connections with verified users."
            index={2}
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 sm:w-7 sm:h-7" />}
            title="Safety First"
            description="Photo verification, background checks, and advanced moderation ensure a safe dating environment where you can focus on finding love."
            index={3}
          />
          <FeatureCard
            icon={<Users className="w-6 h-6 sm:w-7 sm:h-7" />}
            title="Inclusive Community"
            description="Welcome to all regardless of race, religion, or sexual orientation. Our diverse community celebrates love in all its beautiful forms."
            index={4}
          />
          <FeatureCard
            icon={<Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />}
            title="Premium Features"
            description="Unlock advanced search filters, unlimited likes, premium visibility, and exclusive features designed to accelerate your journey to love."
            index={5}
          />
        </div>
        
        {/* Bottom CTA section */}
        <div className="text-center mt-16 sm:mt-20 opacity-0 fade-in-element">
          <p className="text-muted-foreground mb-6">
            <span className="text-accent">💕 </span>
            Ready to find your meaningful connection?
          </p>
          <a
            href="#get-started"
            className="button-primary inline-flex items-center group"
          >
            <Heart className="w-4 h-4 mr-2 group-hover:animate-pulse fill-current" />
            Start Your Love Journey
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
