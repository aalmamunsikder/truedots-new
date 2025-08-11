
import React, { useEffect, useRef, useState } from "react";
import { Code, Palette, Zap, Sparkles, Laptop, Braces, Terminal } from "lucide-react";

const HumanoidSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  // More responsive timing function with shorter duration
  const cardStyle = {
    height: '65vh',
    maxHeight: '650px',
    borderRadius: '24px',
    transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
    willChange: 'transform, opacity, filter'
  };

  useEffect(() => {
    // Create intersection observer to detect when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 } // Start observing when 10% of element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Optimized scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (!ticking.current) {
        lastScrollY.current = window.scrollY;
        
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          
          const sectionRect = sectionRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollDistance = viewportHeight * 2;
          
          // Calculate the scroll progress
          let progress = 0;
          if (sectionRect.top <= 0) {
            progress = Math.min(1, Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance));
          }
          
          // Determine which card should be visible based on progress
          if (progress >= 0.66) {
            setActiveCardIndex(2);
          } else if (progress >= 0.33) {
            setActiveCardIndex(1);
          } else {
            setActiveCardIndex(0);
          }
          
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Card visibility based on active index instead of direct scroll progress
  const isFirstCardVisible = isIntersecting;
  const isSecondCardVisible = activeCardIndex >= 1;
  const isThirdCardVisible = activeCardIndex >= 2;

  return (
    <div 
      ref={sectionRef} 
      className="relative" 
      style={{ height: '300vh' }}
    >
      <section className="w-full h-screen py-10 md:py-16 sticky top-0 overflow-hidden bg-background" id="why-vibe-coding">
        {/* Enhanced Background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-20 left-[5%] text-primary/10 font-mono text-7xl sm:text-9xl animate-pulse">&lt;&gt;</div>
          <div className="absolute bottom-20 right-[10%] text-accent/10 font-mono text-5xl sm:text-7xl animate-bounce">{'{ }'}</div>
          <div className="absolute top-1/2 left-[80%] text-primary/5 font-mono text-8xl rotate-12">[&nbsp;]</div>
          <div className="absolute bottom-32 left-[20%] text-accent/5 font-mono text-6xl -rotate-12">=&gt;</div>
        </div>
        
        {/* Enhanced gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/50 to-background -z-10"></div>
        <div className="absolute -top-[20%] -right-[10%] w-2/3 h-[80%] bg-gradient-to-br from-primary/20 via-accent/10 to-primary/15 blur-3xl rounded-full animate-pulse -z-10"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-1/2 h-[60%] bg-gradient-to-tr from-accent/15 to-primary/20 blur-3xl rounded-full -z-10"></div>
        
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto h-full flex flex-col">
          <div className="mb-6 md:mb-8 lg:mb-10">
            <div className="flex items-center gap-4 mb-4 pt-4 sm:pt-6 md:pt-8">
              <div className="code-chip opacity-0 animate-fade-in" style={{
                animationDelay: "0.1s"
              }}>
                <Terminal className="w-3 h-3 mr-1" />
                <span>Philosophy</span>
              </div>
            </div>
            
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-4 text-foreground">
              Why <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">Vibe Coding</span>
            </h2>
            <p className="text-muted-foreground/80 text-lg sm:text-xl max-w-2xl">
              Transform your development environment into a space that inspires creativity and boosts productivity.
            </p>
          </div>
          
          <div ref={cardsContainerRef} className="relative flex-1 perspective-1000 min-h-0">
            {/* First Card - Aesthetic First */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-2xl border border-primary/20 backdrop-blur-sm ${isFirstCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 10,
                transform: `translateY(${isFirstCardVisible ? '90px' : '200px'}) scale(0.9) ${isFirstCardVisible ? 'rotateX(0deg)' : 'rotateX(-15deg)'}`,
                opacity: isFirstCardVisible ? 0.9 : 0,
                filter: `brightness(${isFirstCardVisible ? '100%' : '80%'})`
              }}
            >
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/20 via-card to-accent/20"></div>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:24px_24px] opacity-10"></div>
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary border border-primary/30 text-sm sm:text-base">
                  <Palette className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="font-medium">Aesthetic First</span>
                </div>
              </div>
              
              <div className="relative z-10 p-6 sm:p-8 md:p-10 h-full flex items-center">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-foreground font-bold leading-tight mb-4 sm:mb-6">
                    We're transforming how developers <span className="text-primary">experience code</span>
                  </h3>
                  <p className="text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed">
                    Beautiful themes and smooth animations turn coding from a task into an art form. Every line of code becomes a brushstroke in your digital masterpiece.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Second Card - Productivity */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-2xl border border-accent/20 backdrop-blur-sm ${isSecondCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 20,
                transform: `translateY(${isSecondCardVisible ? activeCardIndex === 1 ? '55px' : '45px' : '200px'}) scale(0.95) ${isSecondCardVisible ? 'rotateX(0deg)' : 'rotateX(-15deg)'}`,
                opacity: isSecondCardVisible ? 1 : 0,
                pointerEvents: isSecondCardVisible ? 'auto' : 'none',
                filter: `brightness(${isSecondCardVisible ? '100%' : '80%'})`
              }}
            >
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-accent/20 via-card to-primary/20"></div>
              <div className="absolute inset-0 bg-[linear-gradient(45deg,hsl(var(--border))_1px,transparent_1px),linear-gradient(-45deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:32px_32px] opacity-10"></div>
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm text-accent border border-accent/30 text-sm sm:text-base">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="font-medium">Productivity</span>
                </div>
              </div>
              
              <div className="relative z-10 p-6 sm:p-8 md:p-10 h-full flex items-center">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                      <Laptop className="w-6 h-6 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-foreground font-bold leading-tight mb-4 sm:mb-6">
                    We're boosting <span className="text-accent">developer happiness</span> through design
                  </h3>
                  <p className="text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed">
                    When your environment sparks joy, productivity and creativity naturally follow. Our tools are designed to make coding feel effortless and enjoyable.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Third Card - Community */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-2xl border border-primary/20 backdrop-blur-sm ${isThirdCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 30,
                transform: `translateY(${isThirdCardVisible ? activeCardIndex === 2 ? '15px' : '0' : '200px'}) scale(1) ${isThirdCardVisible ? 'rotateX(0deg)' : 'rotateX(-15deg)'}`,
                opacity: isThirdCardVisible ? 1 : 0,
                pointerEvents: isThirdCardVisible ? 'auto' : 'none',
                filter: `brightness(${isThirdCardVisible ? '100%' : '80%'})`
              }}
            >
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/30 via-card to-accent/30"></div>
              <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px),linear-gradient(0deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:16px_16px] opacity-10"></div>
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary border border-primary/30 text-sm sm:text-base">
                  <Braces className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="font-medium">Community</span>
                </div>
              </div>
              
              <div className="relative z-10 p-6 sm:p-8 md:p-10 h-full flex items-center">
                <div className="max-w-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Code className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display text-foreground font-bold leading-tight mb-4 sm:mb-6">
                    We're building a <span className="text-accent">vibrant</span> <span className="text-primary">ecosystem</span>
                  </h3>
                  <p className="text-muted-foreground text-base sm:text-lg lg:text-xl leading-relaxed">
                    Join a community of developers who believe that coding should be both powerful and beautiful. Share themes, workflows, and inspiration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HumanoidSection;
