import React, { useRef } from "react";
import { Smartphone, Download, Apple, Play, Heart, Shield, MessageCircle, Video } from "lucide-react";

const AppFeatures = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const mobileFeatures = [
    {
      icon: <Heart className="w-6 h-6 fill-current" />,
      title: "Smart Matching",
      description: "AI-powered algorithm finds your perfect match based on compatibility"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Secure Chat",
      description: "End-to-end encrypted messaging with photo and voice sharing"
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "Video Calls",
      description: "High-quality video dates before meeting in person"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety First",
      description: "Photo verification and background checks for peace of mind"
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden" id="mobile-app" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-[5%] text-primary/5 dark:text-primary/8 text-6xl animate-pulse">📱</div>
        <div className="absolute top-60 right-[70%] text-primary/3 dark:text-primary/5 text-8xl animate-pulse">💖</div>
      </div>
      
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="text-center mb-16">
          <div className="love-chip mx-auto mb-4">
            <Smartphone className="w-3 h-3 mr-1" />
            <span>Mobile App</span>
          </div>
          
          <h2 className="section-title mb-4">
            Find Love <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              On the Go
            </span>
          </h2>
          
          <p className="section-subtitle mx-auto">
            Download the TRUEdots mobile app for iOS and Android. Your perfect match is just a swipe away.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mobile App Mockup */}
          <div className="relative order-2 lg:order-1 opacity-0 animate-on-scroll">
            <div className="relative mx-auto w-80 h-[600px] bg-gradient-to-br from-card to-secondary rounded-[3rem] p-4 shadow-2xl border border-border">
              {/* Phone Frame */}
              <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden relative">
                {/* Status Bar */}
                <div className="flex justify-between items-center px-6 py-3 bg-card/50">
                  <span className="text-xs text-muted-foreground">9:41</span>
                  <div className="flex space-x-1">
                    <div className="w-4 h-2 bg-primary rounded-sm"></div>
                    <div className="w-1 h-2 bg-muted rounded-sm"></div>
                  </div>
                </div>
                
                {/* App Content */}
                <div className="p-4 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white fill-current" />
                      </div>
                      <span className="font-bold text-foreground">TRUEdots</span>
                    </div>
                    <div className="w-8 h-8 bg-muted rounded-full"></div>
                  </div>
                  
                  {/* Profile Card */}
                  <div className="bg-card rounded-2xl p-4 border border-border">
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mb-3 flex items-center justify-center">
                      <Heart className="w-12 h-12 text-primary/50 fill-current" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">Sarah, 28</h3>
                    <p className="text-sm text-muted-foreground mb-3">2 miles away</p>
                    <div className="flex space-x-2">
                      <div className="flex-1 bg-secondary rounded-lg py-2 px-3 text-center">
                        <span className="text-xs text-muted-foreground">❌</span>
                      </div>
                      <div className="flex-1 bg-primary rounded-lg py-2 px-3 text-center">
                        <span className="text-xs text-white">💕</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Navigation */}
                  <div className="absolute bottom-4 left-4 right-4 bg-card rounded-2xl p-3 border border-border">
                    <div className="flex justify-around">
                      <Heart className="w-6 h-6 text-primary fill-current" />
                      <MessageCircle className="w-6 h-6 text-muted-foreground" />
                      <Smartphone className="w-6 h-6 text-muted-foreground" />
                      <Shield className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center animate-pulse">
              <MessageCircle className="w-6 h-6 text-accent" />
            </div>
          </div>
          
          {/* Features List */}
          <div className="space-y-6 order-1 lg:order-2 opacity-0 animate-on-scroll">
            {mobileFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-xl hover:bg-card/50 transition-colors duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
            
            {/* Download Buttons */}
            <div className="pt-6">
              <h3 className="font-semibold text-foreground mb-4">Download Now</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#"
                  className="flex items-center justify-center space-x-3 bg-card hover:bg-card/80 border border-border rounded-xl px-6 py-3 transition-colors duration-300 group"
                >
                  <Apple className="w-6 h-6 text-foreground group-hover:text-primary" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Download on the</div>
                    <div className="text-sm font-semibold text-foreground">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center justify-center space-x-3 bg-card hover:bg-card/80 border border-border rounded-xl px-6 py-3 transition-colors duration-300 group"
                >
                  <Play className="w-6 h-6 text-foreground group-hover:text-primary" />
                  <div className="text-left">
                    <div className="text-xs text-muted-foreground">Get it on</div>
                    <div className="text-sm font-semibold text-foreground">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 opacity-0 animate-on-scroll">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">4.8★</div>
            <div className="text-muted-foreground text-sm">App Store Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">1M+</div>
            <div className="text-muted-foreground text-sm">Downloads</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50K+</div>
            <div className="text-muted-foreground text-sm">Daily Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">95%</div>
            <div className="text-muted-foreground text-sm">Match Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeatures;
