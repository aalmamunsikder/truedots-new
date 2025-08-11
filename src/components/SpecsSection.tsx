
import React from "react";
import { Sparkles, Zap } from "lucide-react";

const SpecsSection = () => {
  return (
    <section className="w-full py-20 bg-background relative overflow-hidden" id="specifications">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-[10%] text-primary/10 font-mono text-6xl animate-pulse">{'&&'}</div>
        <div className="absolute bottom-20 right-[15%] text-accent/10 font-mono text-4xl animate-bounce">{'||'}</div>
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Header with badge and line */}
        <div className="flex items-center gap-4 mb-8 sm:mb-16">
          <div className="flex items-center gap-4">
            <div className="code-chip">
              <Zap className="w-3 h-3 mr-1" />
              <span>Performance</span>
            </div>
          </div>
          <div className="flex-1 h-[1px] bg-border"></div>
        </div>
        
        {/* Main content with enhanced styling */}
        <div className="max-w-5xl pl-4 sm:pl-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display leading-tight mb-8 sm:mb-12 text-foreground">
            <span className="block">
              Vibe Code works with your workflow, not against it. By providing{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                beautiful themes
              </span>, 
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-pulse">
                {" "}smooth animations
              </span>, 
              and intelligent features, Vibe Code helps developers focus on what they do best:{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
                create, innovate, and code with joy.
              </span>
            </span>
          </h2>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">100+ Themes</h3>
              <p className="text-muted-foreground text-sm">Curated collection of aesthetic coding themes</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-accent/30">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Zero Lag</h3>
              <p className="text-muted-foreground text-sm">Butter-smooth performance and animations</p>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30">
                <span className="text-primary font-mono font-bold">∞</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Endless Joy</h3>
              <p className="text-muted-foreground text-sm">Designed to spark happiness in every coding session</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;
