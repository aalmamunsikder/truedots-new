
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Heart } from "lucide-react";
import LottieAnimation from "./LottieAnimation";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [lottieData, setLottieData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch('/loop-header.lottie')
      .then(response => response.json())
      .then(data => setLottieData(data))
      .catch(error => console.error("Error loading Lottie animation:", error));
  }, []);

  useEffect(() => {
    // Skip effect on mobile
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;
      
      const {
        left,
        top,
        width,
        height
      } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);
  
  useEffect(() => {
    // Skip parallax on mobile
    if (isMobile) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax');
      elements.forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        const yPos = -scrollY * speed;
        element.style.setProperty('--parallax-y', `${yPos}px`);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  
  return (
    <section 
      className="overflow-hidden relative bg-background min-h-screen flex items-center" 
      id="hero" 
      style={{
        padding: isMobile ? '120px 12px 80px' : '140px 20px 100px'
      }}
    >
      {/* Enhanced romantic grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 dark:opacity-15"></div>

      {/* Floating love symbols */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-[5%] text-primary/15 dark:text-primary/20 text-8xl animate-pulse">💕</div>
        <div className="absolute top-32 right-[10%] text-accent/15 dark:text-accent/20 text-6xl animate-bounce">💖</div>
        <div className="absolute bottom-32 left-[15%] text-primary/10 dark:text-primary/15 text-7xl animate-pulse">💜</div>
        <div className="absolute top-80 left-[75%] text-accent/10 dark:text-accent/15 text-5xl animate-bounce">💝</div>
        <div className="absolute bottom-60 right-[5%] text-primary/8 dark:text-primary/10 text-9xl animate-pulse">💗</div>
        <div className="absolute top-40 left-[50%] text-accent/8 dark:text-accent/10 text-4xl animate-bounce">💘</div>
        <div className="absolute bottom-20 left-[40%] text-primary/10 dark:text-primary/15 text-6xl animate-pulse">💞</div>
      </div>
      
      {/* Enhanced gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card/20 dark:via-card/30 to-background"></div>
      <div className="absolute -top-[20%] -right-[10%] w-2/3 h-[80%] bg-gradient-to-br from-primary/15 dark:from-primary/25 via-accent/8 dark:via-accent/15 to-primary/12 dark:to-primary/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute -bottom-[20%] -left-[10%] w-1/2 h-[60%] bg-gradient-to-tr from-accent/12 dark:from-accent/20 to-primary/15 dark:to-primary/25 blur-3xl rounded-full"></div>
      <div className="absolute top-[30%] left-[60%] w-1/3 h-[40%] bg-gradient-to-l from-primary/6 dark:from-primary/10 to-accent/8 dark:to-accent/15 blur-2xl rounded-full animate-pulse"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8 w-full" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-center min-h-[70vh]">
          <div className="w-full lg:w-1/2">
            <div
              className="love-chip mb-3 sm:mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <Heart className="w-3 h-3 mr-1 fill-current" />
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground mr-2 text-xs">💕</span>
              <span>Find Your Match</span>
            </div>
            
            <h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl leading-tight opacity-0 animate-fade-in text-foreground"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="text-primary text-xl sm:text-2xl lg:text-3xl block mb-3 sm:mb-4">💕 TRUEdots</span>
              Find Your<br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">Meaningful Connection</span>
            </h1>
            
            <p
              style={{ animationDelay: "0.5s" }}
              className="mt-4 sm:mt-8 mb-6 sm:mb-10 leading-relaxed opacity-0 animate-fade-in text-muted-foreground font-normal text-lg sm:text-xl lg:text-2xl text-left max-w-2xl"
            >
              <span className="text-accent text-xl sm:text-2xl">💖</span> Connect with like-minded souls who share your values, interests, and dreams. Every meaningful relationship starts with a single dot.
              <br />
              <span className="text-primary text-base sm:text-lg lg:text-xl mt-2 block">✨ Love authentically. Connect deeply. Find your TRUE match.</span>
            </p>
            
            <div
              className="flex flex-col sm:flex-row gap-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.7s" }}
            >
              <a
                href="#get-started"
                className="button-primary group flex items-center justify-center w-full sm:w-auto text-center text-lg sm:text-xl px-8 py-4"
              >
                Start Your Journey 💕
                <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#features"
                className="button-secondary flex items-center justify-center w-full sm:w-auto text-center text-lg sm:text-xl px-8 py-4"
              >
                Discover Features
              </a>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0 flex items-center justify-center">
            {lottieData ? (
              <div className="relative z-10 animate-fade-in" style={{ animationDelay: "0.9s" }}>
                <LottieAnimation 
                  animationPath={lottieData} 
                  className="w-full h-auto max-w-lg mx-auto"
                  loop={true}
                  autoplay={true}
                />
              </div>
            ) : (
              <>
              <div className="absolute inset-0 bg-card rounded-2xl sm:rounded-3xl -z-10 shadow-xl border border-primary/20"></div>
              <div className="relative transition-all duration-500 ease-out overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                <div className="bg-card p-6 text-sm border border-border/50">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                    <span className="text-muted-foreground ml-2">TRUEdots-app</span>
                  </div>
                  <div className="space-y-2 text-foreground">
                    <div className="flex">
                      <span className="text-accent">💕</span>
                      <span className="ml-2">Creating your perfect match profile...</span>
                    </div>
                    <div className="text-muted-foreground">💖 Analyzing compatibility factors...</div>
                    <div className="text-primary">💜 Finding meaningful connections...</div>
                    <div className="text-accent">✨ Optimizing your dating experience...</div>
                    <div className="text-primary font-bold">💞 Ready to find your TRUE love!</div>
                    <div className="flex">
                      <span className="text-accent">💘</span>
                      <span className="ml-2 animate-pulse text-primary">Start matching</span>
                      <span className="ml-1 animate-pulse">💗</span>
                    </div>
                  </div>
                </div>

                {/* Profile preview section */}
                <div className="bg-secondary/30 p-4 border-t border-border/30">
                  <div className="text-xs space-y-1">
                    <div className="flex">
                      <span className="text-muted-foreground mr-2">💕</span>
                      <span className="text-primary">Profile:</span>
                      <span className="text-foreground ml-1">Ready</span>
                      <span className="text-accent ml-1">✓</span>
                    </div>
                    <div className="flex">
                      <span className="text-muted-foreground mr-2">💖</span>
                      <span className="text-primary">Matches:</span>
                      <span className="text-foreground ml-1">Finding</span>
                      <span className="text-accent ml-1">your</span>
                      <span className="text-accent ml-1">soulmate...</span>
                    </div>
                  </div>
                </div>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10 parallax animate-pulse" data-speed="0.05"></div>
    </section>
  );
};

export default Hero;
