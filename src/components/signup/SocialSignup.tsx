import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
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

  const handleSocialSignup = (method: "google" | "apple" | "facebook") => {
    toast({
      title: `${method.charAt(0).toUpperCase() + method.slice(1)} Coming Soon`,
      description: `${method.charAt(0).toUpperCase() + method.slice(1)} authentication will be available in the next update!`
    });
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
          <div className="space-y-3">
            <button
              onClick={() => handleSocialSignup("google")}
              disabled
              className="w-full flex items-center justify-center px-4 py-3 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed opacity-60"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-foreground text-sm font-medium">Continue with Google</span>
            </button>

            <button
              onClick={() => handleSocialSignup("apple")}
              disabled
              className="w-full flex items-center justify-center px-4 py-3 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed opacity-60"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span className="text-sm font-medium">Continue with Apple</span>
            </button>

            <button
              onClick={() => handleSocialSignup("facebook")}
              disabled
              className="w-full flex items-center justify-center px-4 py-3 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed opacity-60"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium">Continue with Facebook</span>
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

          {/* Social Login Note */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Social login options will be available soon! 🔜
            </p>
          </div>

          {/* Email Option */}
          <button
            onClick={() => setShowEmailForm(true)}
            className="w-full flex items-center justify-center px-4 py-3 border border-border rounded-lg hover:bg-card transition-colors duration-300"
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
                  className="w-full pl-12 pr-12 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
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
