
import React from "react";
import { Monitor, Sparkles } from "lucide-react";

const ImageShowcaseSection = () => {
  return (
    <section className="w-full pt-16 sm:pt-20 pb-20 bg-background relative overflow-hidden" id="showcase">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-[15%] text-primary/10 font-mono text-6xl animate-pulse">&lt;/&gt;</div>
        <div className="absolute bottom-20 right-[20%] text-accent/10 font-mono text-4xl animate-bounce">[ ]</div>
      </div>
      
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 animate-on-scroll">
          <div className="code-chip mx-auto mb-4">
            <Monitor className="w-3 h-3 mr-1" />
            <span>Showcase</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground mb-3 sm:mb-4">
            Experience the 
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"> Future </span>
            of Coding
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground">
            Transform your development environment with beautiful themes, smooth animations, 
            and aesthetic vibes that make coding feel like art.
          </p>
        </div>
        
        <div className="glass-card rounded-2xl sm:rounded-3xl overflow-hidden shadow-elegant mx-auto max-w-4xl animate-on-scroll border border-border/50">
          <div className="w-full bg-gradient-to-br from-card via-muted/50 to-card p-4 sm:p-8">
            {/* Mock VS Code Interface */}
            <div className="bg-card rounded-lg border border-border/50 overflow-hidden">
              {/* VS Code Header */}
              <div className="flex items-center justify-between p-3 bg-muted/50 border-b border-border/30">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                  <span className="text-muted-foreground text-sm font-mono ml-4">vibe-code-demo.tsx</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-primary text-sm font-mono">Vibe Mode: ON</span>
                </div>
              </div>
              
              {/* Code Content */}
              <div className="p-4 sm:p-6 bg-card font-mono text-xs sm:text-sm space-y-1 sm:space-y-2 overflow-x-auto">
                <div className="flex whitespace-nowrap">
                  <span className="text-muted-foreground mr-4 w-6 text-right flex-shrink-0">1</span>
                  <span className="text-primary">import</span>
                  <span className="text-foreground ml-2">React</span>
                  <span className="text-muted-foreground ml-2">from</span>
                  <span className="text-accent ml-2">'react'</span>
                </div>
                <div className="flex whitespace-nowrap">
                  <span className="text-muted-foreground mr-4 w-6 text-right flex-shrink-0">2</span>
                  <span className="text-primary">import</span>
                  <span className="text-foreground ml-2">{'{ Sparkles }'}</span>
                  <span className="text-muted-foreground ml-2">from</span>
                  <span className="text-accent ml-2">'lucide-react'</span>
                </div>
                <div className="flex whitespace-nowrap">
                  <span className="text-muted-foreground mr-4 w-6 text-right flex-shrink-0">3</span>
                </div>
                <div className="flex whitespace-nowrap">
                  <span className="text-muted-foreground mr-4 w-6 text-right flex-shrink-0">4</span>
                  <span className="text-muted-foreground">// This is what coding with vibes looks like ✨</span>
                </div>
                <div className="flex whitespace-nowrap">
                  <span className="text-muted-foreground mr-4 w-6 text-right flex-shrink-0">5</span>
                  <span className="text-primary">const</span>
                  <span className="text-accent ml-2">VibeCode</span>
                  <span className="text-foreground ml-2">=</span>
                  <span className="text-muted-foreground ml-2">()</span>
                  <span className="text-primary ml-2">=&gt;</span>
                  <span className="text-muted-foreground ml-2">{'{'}</span>
                </div>
                <div className="flex whitespace-nowrap">
                  <span className="text-muted-foreground mr-4 w-6 text-right flex-shrink-0">6</span>
                  <span className="text-primary ml-4">return</span>
                  <span className="text-muted-foreground ml-2">(</span>
                </div>
                <div className="flex whitespace-nowrap">
                  <span className="text-muted-foreground mr-4 w-6 text-right flex-shrink-0">7</span>
                  <span className="text-muted-foreground ml-8">&lt;div</span>
                  <span className="text-accent ml-2">className</span>
                  <span className="text-foreground">=</span>
                  <span className="text-accent">"beautiful-vibes"</span>
                  <span className="text-muted-foreground">&gt;</span>
                </div>
                <div className="flex whitespace-nowrap">
                  <span className="text-muted-foreground mr-4 w-6 text-right flex-shrink-0">8</span>
                  <span className="text-muted-foreground ml-12">&lt;Sparkles</span>
                  <span className="text-accent ml-2">className</span>
                  <span className="text-foreground">=</span>
                  <span className="text-accent">"animate-pulse"</span>
                  <span className="text-muted-foreground ml-2">/&gt;</span>
                </div>
                <div className="flex whitespace-nowrap">
                  <span className="text-muted-foreground mr-4 w-6 text-right flex-shrink-0">9</span>
                  <span className="text-foreground ml-12">Coding with maximum vibes! 🚀</span>
                </div>
                <div className="flex whitespace-nowrap">
                  <span className="text-muted-foreground mr-4 w-6 text-right flex-shrink-0">10</span>
                  <span className="text-muted-foreground ml-8">&lt;/div&gt;</span>
                </div>
                <div className="flex whitespace-nowrap">
                  <span className="text-muted-foreground mr-4 w-6 text-right flex-shrink-0">11</span>
                  <span className="text-muted-foreground ml-4">)</span>
                </div>
                <div className="flex whitespace-nowrap">
                  <span className="text-muted-foreground mr-4 w-6 text-right flex-shrink-0">12</span>
                  <span className="text-muted-foreground">{'}'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-card/50 p-4 sm:p-8 backdrop-blur-sm border-t border-border/30">
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4 text-foreground">
              Next Generation Developer Experience
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Built with aesthetic principles and developer happiness in mind. Beautiful themes, 
              smooth animations, and intelligent features that make every coding session a joy. 
              Transform your IDE into a work of art.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageShowcaseSection;
