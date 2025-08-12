import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Facebook, Linkedin, Twitter } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { SignupData } from "@/pages/SignupFlow";

interface SocialSignupProps {
  signupData: SignupData;
  updateSignupData: (data: Partial<SignupData>) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
}

const SocialSignup: React.FC<SocialSignupProps> = ({
  signupData,
  updateSignupData,
  onNext,
  canGoNext
}) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState(signupData.email);
  const [password, setPassword] = useState(signupData.password);
  const [showPassword, setShowPassword] = useState(false);

  const handleSocialSignup = (method: "facebook" | "linkedin" | "twitter") => {
    updateSignupData({ 
      signupMethod: method,
      email: `user@${method}.com` // Simulate social login email
    });
    toast({
      title: `${method.charAt(0).toUpperCase() + method.slice(1)} Connected`,
      description: "Successfully connected your account."
    });
    setTimeout(() => onNext(), 1000);
  };

  const handleEmailSignup = () => {
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    updateSignupData({ 
      signupMethod: "email",
      email,
      password
    });
    onNext();
  };

  return (
    <div className="space-y-6">
      {!showEmailForm ? (
        <>
          {/* Social Login Options */}
          <div className="space-y-2">
            <button
              onClick={() => handleSocialSignup("facebook")}
              className="w-full flex items-center justify-center px-4 py-2.5 border border-border rounded-lg hover:bg-card transition-colors duration-300"
            >
              <Facebook className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-foreground text-sm">Continue with Facebook</span>
            </button>

            <button
              onClick={() => handleSocialSignup("linkedin")}
              className="w-full flex items-center justify-center px-4 py-2.5 border border-border rounded-lg hover:bg-card transition-colors duration-300"
            >
              <Linkedin className="w-4 h-4 text-blue-700 mr-2" />
              <span className="text-foreground text-sm">Continue with LinkedIn</span>
            </button>

            <button
              onClick={() => handleSocialSignup("twitter")}
              className="w-full flex items-center justify-center px-4 py-2.5 border border-border rounded-lg hover:bg-card transition-colors duration-300"
            >
              <Twitter className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-foreground text-sm">Continue with Twitter</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email Option */}
          <button
            onClick={() => setShowEmailForm(true)}
            className="w-full flex items-center justify-center px-4 py-2.5 border border-border rounded-lg hover:bg-card transition-colors duration-300"
          >
            <Mail className="w-4 h-4 text-primary mr-2" />
            <span className="text-foreground text-sm">Continue with Email</span>
          </button>
        </>
      ) : (
        <>
          {/* Email Form */}
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleEmailSignup(); }}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setShowEmailForm(false)}
                className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-3 rounded-md font-medium transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!email || !password}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 rounded-md font-medium transition-colors"
              >
                Continue
              </button>
            </div>
          </form>
        </>
      )}

      {/* Terms */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-primary hover:text-primary/80">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:text-primary/80">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default SocialSignup;
