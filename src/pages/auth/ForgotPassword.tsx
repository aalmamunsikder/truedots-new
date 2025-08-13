import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Reset link sent! 💕",
        description: "Check your email for password reset instructions."
      });
      setIsLoading(false);
      setIsEmailSent(true);
    }, 1500);
  };

  const handleResendEmail = () => {
    toast({
      title: "Email resent",
      description: "We've sent another reset link to your email."
    });
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white fill-current" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-bold text-foreground text-xl">TRUE</span>
                  <span className="text-sm text-primary -mt-1">dots</span>
                </div>
              </Link>
              <ThemeToggle />
            </div>
            
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="text-3xl font-bold text-foreground">Check your email</h2>
            <p className="mt-4 text-muted-foreground">
              We've sent a password reset link to
            </p>
            <p className="font-medium text-foreground">{email}</p>
          </div>

          {/* Instructions */}
          <div className="bg-card/50 rounded-lg p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-3">What's next?</h3>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                  1
                </span>
                Check your email inbox (and spam folder)
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                  2
                </span>
                Click the "Reset Password" link in the email
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                  3
                </span>
                Create a new password for your account
              </li>
            </ol>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={handleResendEmail}
              className="w-full button-primary py-3"
            >
              Resend email
            </button>
            
            <Link
              to="/login"
              className="w-full button-secondary py-3 text-center flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Link>
          </div>

          {/* Help */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the email?{" "}
              <Link
                to="/contact"
                className="font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold text-foreground text-xl">TRUE</span>
                <span className="text-sm text-primary -mt-1">dots</span>
              </div>
            </Link>
            <ThemeToggle />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground">Forgot your password?</h2>
          <p className="mt-2 text-muted-foreground">
            No worries! Enter your email and we'll send you a reset link.
          </p>
        </div>

        {/* Reset Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full button-primary py-3 text-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending reset link...
              </div>
            ) : (
              "Send reset link"
            )}
          </button>
        </form>

        {/* Back to login */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to login
          </Link>
        </div>

        {/* Help section */}
        <div className="bg-card/30 rounded-lg p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-2">Need help?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            If you're having trouble accessing your account, our support team is here to help.
          </p>
          <Link
            to="/contact"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Contact support →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
