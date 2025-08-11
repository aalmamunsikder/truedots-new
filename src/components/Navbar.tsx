
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Heart, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
        isScrolled 
          ? "bg-background/90 backdrop-blur-md shadow-lg border-b border-border/50" 
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#"
          className="flex items-center space-x-2 group"
          onClick={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
          aria-label="TRUEdots"
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-4 h-4 text-background fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-lg">TRUE</span>
              <span className="text-xs text-primary -mt-1">dots</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a
            href="#"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
          >
            Home
          </a>
          <a href="#features" className="nav-link">Find Love</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#testimonials" className="nav-link">Success Stories</a>
          <a href="#pricing" className="nav-link">Pricing</a>
        </nav>

        {/* Theme Toggle & CTA Button - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-card/50 transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            )}
          </button>
          <a
            href="#get-started"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-sm px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
          >
            Join TRUEdots
          </a>
        </div>

        {/* Mobile menu button - increased touch target */}
        <button 
          className="md:hidden text-foreground p-3 focus:outline-none hover:bg-card/50 rounded-lg transition-colors" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - improved for better touch experience */}
      <div className={cn(
        "fixed inset-0 z-40 bg-background/95 backdrop-blur-md flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out border-r border-border/50",
        isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <nav className="flex flex-col space-y-8 items-center mt-8">
          <a 
            href="#" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-card/50 text-foreground transition-colors" 
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Home
          </a>
          <a
            href="#features"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-card/50 text-foreground transition-colors"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Find Love
          </a>
          <a
            href="#how-it-works"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-card/50 text-foreground transition-colors"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            How It Works
          </a>
          <a
            href="#testimonials"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-card/50 text-foreground transition-colors"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Success Stories
          </a>
          <a
            href="#pricing"
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-card/50 text-foreground transition-colors"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Pricing
          </a>

          {/* Theme Toggle - Mobile */}
          <button
            onClick={() => {
              toggleTheme();
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
            className="flex items-center justify-center text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-card/50 text-foreground transition-colors"
          >
            {isDark ? (
              <>
                <Sun className="w-5 h-5 mr-2" />
                Light Mode
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 mr-2" />
                Dark Mode
              </>
            )}
          </button>

          <a
            href="#get-started"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg px-8 py-3 rounded-lg transition-all duration-300 mt-4"
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Join TRUEdots
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
