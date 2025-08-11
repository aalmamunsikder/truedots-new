
import React from "react";
import { Heart, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-card to-background border-t border-border py-16 relative overflow-hidden">
      {/* Overlay for depth - different for light/dark mode */}
      <div className="absolute inset-0 bg-foreground/5 dark:bg-black/40"></div>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-10 left-[10%] text-primary/8 dark:text-primary/10 text-6xl animate-pulse">💕</div>
        <div className="absolute top-8 right-[15%] text-accent/8 dark:text-accent/10 text-4xl animate-bounce">💖</div>
        <div className="absolute bottom-20 right-[30%] text-primary/5 dark:text-primary/5 text-8xl">💜</div>
      </div>
              <div className="section-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-background fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-foreground text-lg">TRUE</span>
                <span className="text-xs text-primary -mt-1">dots</span>
              </div>
            </div>
            <p className="text-muted-foreground/90 mb-4 max-w-md">
              Find your meaningful connection through authentic relationships. Every love story starts with a single dot.
              Love authentically. Connect deeply. Find your TRUE match.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://instagram.com/truedots"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded-lg hover:bg-primary/10"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/truedots"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded-lg hover:bg-primary/10"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/truedots"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground/80 hover:text-primary transition-colors duration-300 p-2 rounded-lg hover:bg-primary/10"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground/90 mb-4">Dating</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-muted-foreground/80 hover:text-primary transition-colors duration-300 text-sm">Find Love</a></li>
              <li><a href="#how-it-works" className="text-muted-foreground/80 hover:text-primary transition-colors duration-300 text-sm">How It Works</a></li>
              <li><a href="#testimonials" className="text-muted-foreground/80 hover:text-primary transition-colors duration-300 text-sm">Success Stories</a></li>
              <li><a href="#pricing" className="text-muted-foreground/80 hover:text-primary transition-colors duration-300 text-sm">Pricing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground/90 mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="/safety" className="text-muted-foreground/80 hover:text-primary transition-colors duration-300 text-sm">Safety Center</a></li>
              <li><a href="/privacy" className="text-muted-foreground/80 hover:text-primary transition-colors duration-300 text-sm">Privacy Policy</a></li>
              <li><a href="/terms" className="text-muted-foreground/80 hover:text-primary transition-colors duration-300 text-sm">Terms of Service</a></li>
              <li><a href="/help" className="text-muted-foreground/80 hover:text-primary transition-colors duration-300 text-sm">Help Center</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-8 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-muted-foreground/80 text-sm mb-4 md:mb-0">
              © 2024 TRUEdots. Built with{" "}
              <Heart className="w-4 h-4 inline text-primary fill-current" />{" "}
              for singles seeking meaningful connections.
            </p>
            <div className="text-center text-muted-foreground/80 text-sm">
              Connecting Hearts, Creating Love Stories{" "}
              <Heart className="w-3 h-3 inline text-accent animate-pulse fill-current" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
