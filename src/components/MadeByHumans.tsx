
import React from "react";
import { Heart, Code, Users } from "lucide-react";

const MadeByHumans = () => {
  return (
    <section id="made-by-humans" className="w-full bg-background py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-[10%] text-primary/10 font-mono text-8xl animate-pulse">{'<>'}</div>
        <div className="absolute bottom-20 right-[15%] text-accent/10 font-mono text-6xl animate-bounce">{'❤'}</div>
      </div>
      
      <div className="section-container opacity-0 animate-on-scroll pb-2">
        <div className="w-full glass-card rounded-2xl sm:rounded-3xl overflow-hidden relative mt-6 sm:mt-8 border border-border/50">
          <div className="bg-gradient-to-br from-primary/20 via-card to-accent/20 p-8 sm:p-12 min-h-[350px] sm:min-h-[400px] flex flex-col justify-between backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center text-foreground mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mr-3">
                <Code className="w-4 h-4 text-background" />
              </div>
              <span className="text-foreground text-xl font-mono font-bold">
                vibe.code
            </span>
            </div>
            
            {/* Main content */}
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-foreground font-light mb-6">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Made by Developers,
                </span>
                <br />
                <span className="text-foreground">
                  for Developers
                </span>
              </h2>
              
              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto mb-8">
                <span className="font-mono text-accent">// </span>
                Crafted with passion by the coding community to bring joy, aesthetics, and productivity to every developer's workflow.
              </p>
              
              {/* Community stats */}
              <div className="flex items-center justify-center space-x-8 text-center">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-foreground font-mono">50K+ Devs</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-foreground font-mono">Open Source</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-accent" />
                  <span className="text-foreground font-mono">With Vibes</span>
                </div>
              </div>
            </div>
            
            {/* Bottom gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-card/80 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MadeByHumans;
