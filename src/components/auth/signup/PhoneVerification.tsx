import React, { useState, useEffect } from "react";
import { Phone, ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { SignupData } from "@/pages/auth/SignupFlow";

interface PhoneVerificationProps {
  signupData: SignupData;
  updateSignupData: (data: Partial<SignupData>) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  signupData,
  updateSignupData,
  onNext,
  onPrev,
  canGoBack
}) => {
  const [step, setStep] = useState<"phone" | "verify">("phone");
  const [phoneNumber, setPhoneNumber] = useState(signupData.phoneNumber);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = async () => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      updateSignupData({ phoneNumber });
      setStep("verify");
      setCountdown(60);
      setIsLoading(false);
      toast({
        title: "Code sent! 📱",
        description: `Verification code sent to ${phoneNumber}`
      });
    }, 1500);
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit verification code.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Phone verified! ✅",
        description: "Your phone number has been successfully verified."
      });
      onNext();
    }, 1500);
  };

  const handleResendCode = () => {
    if (countdown > 0) return;
    
    setCountdown(60);
    toast({
      title: "Code resent",
      description: "A new verification code has been sent."
    });
  };

  if (step === "verify") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Enter verification code
          </h3>
          <p className="text-muted-foreground text-sm">
            We sent a 6-digit code to <strong>{phoneNumber}</strong>
          </p>
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium text-foreground mb-2">
            Verification code
          </label>
          <input
            id="code"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground text-center text-lg tracking-widest"
            placeholder="000000"
            maxLength={6}
          />
        </div>

        <div className="text-center">
          {countdown > 0 ? (
            <p className="text-sm text-muted-foreground">
              Resend code in {countdown} seconds
            </p>
          ) : (
            <button
              onClick={handleResendCode}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Didn't receive the code? Resend
            </button>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setStep("phone")}
            className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Change number
          </button>
          <button
            onClick={handleVerifyCode}
            disabled={isLoading || verificationCode.length !== 6}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 rounded-md font-medium transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                Verifying...
              </div>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Add your phone number
        </h3>
        <p className="text-muted-foreground text-sm">
          We'll send you a verification code for security
        </p>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
          Phone number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Standard messaging rates may apply
        </p>
      </div>

        <div className="flex space-x-4">
          {canGoBack && (
            <button
              onClick={onPrev}
              className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          )}
          <button
            onClick={handleSendCode}
            disabled={isLoading || !phoneNumber}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 rounded-md font-medium transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending...
              </div>
            ) : (
              "Send verification code"
            )}
          </button>
        </div>
    </div>
  );
};

export default PhoneVerification;
