import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Heart, Mail, Lock, Facebook, Twitter, Linkedin } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome back! 💕",
        description: "You've successfully logged into TRUEdots."
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: `Connecting with ${provider}...`
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 overflow-y-auto bg-background">
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md w-full space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="flex items-center justify-between mb-6">
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
              <h2 className="text-2xl font-bold text-foreground">Welcome back</h2>
              <p className="mt-2 text-muted-foreground text-sm">
                Sign in to continue your love journey
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-2">
              <button
                onClick={() => handleSocialLogin("Facebook")}
                className="w-full flex items-center justify-center px-4 py-2.5 border border-border rounded-lg hover:bg-card transition-colors duration-300"
              >
                <Facebook className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-foreground text-sm">Continue with Facebook</span>
              </button>
              <button
                onClick={() => handleSocialLogin("LinkedIn")}
                className="w-full flex items-center justify-center px-4 py-2.5 border border-border rounded-lg hover:bg-card transition-colors duration-300"
              >
                <Linkedin className="w-4 h-4 text-blue-700 mr-2" />
                <span className="text-foreground text-sm">Continue with LinkedIn</span>
              </button>
              <button
                onClick={() => handleSocialLogin("Twitter")}
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

            {/* Login Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                  placeholder="Enter your email"
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                  placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Sign up link */}
            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 items-center justify-center relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-[10%] text-primary/10 text-6xl animate-pulse">💕</div>
          <div className="absolute bottom-20 right-[15%] text-accent/10 text-4xl animate-bounce">💖</div>
          <div className="absolute top-60 right-[20%] text-primary/8 text-8xl animate-pulse">💜</div>
          <div className="absolute bottom-40 left-[20%] text-accent/8 text-5xl animate-bounce">💝</div>
        </div>
        
        <div className="text-center z-10 max-w-md">
          <h3 className="text-4xl font-bold text-foreground mb-4">
            Find Your
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent block">
              Meaningful Connection
            </span>
          </h3>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of singles who found love through authentic relationships and meaningful connections.
          </p>
          <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">250K+</div>
              <div>Active Singles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">15K+</div>
              <div>Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">95%</div>
              <div>Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
