import React from "react";
import { Heart, Sparkles, X } from "lucide-react";

interface WelcomePopupProps {
  onClose: () => void;
  userName: string;
}

const WelcomePopup: React.FC<WelcomePopupProps> = ({ onClose, userName }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl border border-border max-w-md w-full relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 left-4 text-primary/10 text-4xl animate-pulse">💕</div>
          <div className="absolute bottom-4 right-4 text-accent/10 text-3xl animate-bounce">💖</div>
          <div className="absolute top-1/2 right-8 text-primary/8 text-5xl animate-pulse">💜</div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-colors z-10"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="p-8 text-center relative z-10">
          {/* Logo */}
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Heart className="w-10 h-10 text-white fill-current" />
          </div>

          {/* Welcome message */}
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome to TRUEdots!
          </h2>
          
          <p className="text-lg text-muted-foreground mb-6">
            Hi {userName || "there"}! 👋
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-primary fill-current" />
              </div>
              <p className="text-sm text-muted-foreground">
                Find meaningful connections with like-minded people
              </p>
            </div>
            
            <div className="flex items-center space-x-3 text-left">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                Smart matching algorithm finds your perfect match
              </p>
            </div>
            
            <div className="flex items-center space-x-3 text-left">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-sm">🔒</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Safe and secure platform with verified profiles
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-3 rounded-md font-medium transition-colors text-lg"
          >
            Let's get started! 💕
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;
