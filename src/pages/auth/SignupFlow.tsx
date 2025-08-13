import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

// Import step components
import SocialSignup from "@/components/auth/signup/SocialSignup";
import PhoneVerification from "@/components/auth/signup/PhoneVerification";
import WelcomePopup from "@/components/auth/signup/WelcomePopup";
import ProfileDetails from "@/components/auth/signup/ProfileDetails";
import DatingPreferences from "@/components/auth/signup/DatingPreferences";
import PhotoUpload from "@/components/auth/signup/PhotoUpload";

export interface SignupData {
  signupMethod: "" | "email" | "google" | "apple" | "facebook";
  email: string;
  password: string;
  phoneNumber: string;
  fullName: string;
  birthday: string;
  gender: string;
  interestedIn: string[];
  lookingFor: string;
  interests: string[];
  photos: string[];
}

const SignupFlow = () => {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showWelcome, setShowWelcome] = useState(false);
  const [signupData, setSignupData] = useState<SignupData>({
    signupMethod: "",
    email: "",
    password: "",
    phoneNumber: "",
    fullName: "",
    birthday: "",
    gender: "",
    interestedIn: [],
    lookingFor: "",
    interests: [],
    photos: []
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const updateSignupData = (data: Partial<SignupData>) => {
    setSignupData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep === 2) {
      // After phone verification, show welcome popup
      setShowWelcome(true);
    } else if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete signup and go to dashboard
      completeSignup();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    setCurrentStep(3); // Move to profile details
  };

  const completeSignup = async () => {
    try {
      // Create account with Supabase
      const result = await signUp({
        email: signupData.email,
        password: signupData.password,
        phone: signupData.phoneNumber,
        full_name: signupData.fullName,
        birthday: signupData.birthday,
        gender: signupData.gender,
        interested_in: signupData.interestedIn,
        looking_for: signupData.lookingFor,
        interests: signupData.interests,
        photos: signupData.photos
      });

      if (result.success) {
        toast({
          title: "Welcome to TRUEdots! 💕",
          description: "Your account has been created successfully."
        });
        
        // Navigate to dashboard after successful signup
        setTimeout(() => {
          navigate("/dashboard?showLocationPopup=true");
        }, 1500);
      } else {
        toast({
          title: "Signup failed",
          description: result.error || "Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };

  const steps = [
    { number: 1, title: "Sign Up Method", component: SocialSignup },
    { number: 2, title: "Phone Verification", component: PhoneVerification },
    { number: 3, title: "Basic Information", component: ProfileDetails },
    { number: 4, title: "Dating Preferences", component: DatingPreferences },
    { number: 5, title: "Upload Photos", component: PhotoUpload }
  ];

  const CurrentStepComponent = steps[currentStep - 1]?.component;

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
              <h2 className="text-2xl font-bold text-foreground">
                {steps[currentStep - 1]?.title}
              </h2>
              <p className="mt-2 text-muted-foreground text-sm">
                {currentStep === 1 && "Choose how you'd like to sign up for TRUEdots"}
                {currentStep === 2 && "Verify your phone number for account security"}
                {currentStep === 3 && "Tell us about yourself"}
                {currentStep === 4 && "Set your dating preferences"}
                {currentStep === 5 && "Add photos to complete your profile"}
              </p>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center space-x-2 mb-6">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    currentStep >= step.number 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-4 h-0.5 mx-1 ${
                      currentStep > step.number ? "bg-primary" : "bg-muted"
                    }`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step Component */}
            {CurrentStepComponent && (
              <CurrentStepComponent
                signupData={signupData}
                updateSignupData={updateSignupData}
                onNext={nextStep}
                onPrev={prevStep}
                canGoBack={currentStep > 1}
                canGoNext={
                  (currentStep === 1 && signupData.signupMethod !== "") ||
                  (currentStep === 2 && signupData.phoneNumber !== "") ||
                  (currentStep === 3 && signupData.fullName !== "" && signupData.birthday !== "" && signupData.gender !== "") ||
                  (currentStep === 4 && signupData.interestedIn.length > 0 && signupData.lookingFor !== "") ||
                  (currentStep === 5 && signupData.photos.length >= 2)
                }
              />
            )}

            {/* Sign in link */}
            <div className="text-center">
              <p className="text-muted-foreground text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Sign in here
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
            Start Your
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent block">
              Love Journey
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

      {/* Welcome Popup */}
      {showWelcome && (
        <WelcomePopup
          onClose={handleWelcomeClose}
          userName={signupData.fullName || "there"}
        />
      )}
    </div>
  );
};

export default SignupFlow;
