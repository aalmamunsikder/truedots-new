import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Shield, Smartphone, MessageSquare, QrCode, CheckCircle, ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const MFASetup = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const mfaMethods = [
    {
      id: "sms",
      title: "SMS Text Message",
      description: "Receive verification codes via text message",
      icon: <MessageSquare className="w-6 h-6" />,
      recommended: true
    },
    {
      id: "authenticator",
      title: "Authenticator App",
      description: "Use Google Authenticator or similar apps",
      icon: <Smartphone className="w-6 h-6" />,
      recommended: false
    },
    {
      id: "phone",
      title: "Phone Call",
      description: "Receive verification codes via phone call",
      icon: <Shield className="w-6 h-6" />,
      recommended: false
    }
  ];

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setStep(2);
  };

  const handleSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (selectedMethod === "sms" || selectedMethod === "phone") {
        toast({
          title: "Verification code sent",
          description: `We've sent a code to ${phoneNumber}`
        });
        setStep(3);
      } else {
        setStep(3);
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "MFA enabled successfully! 🔒",
        description: "Your account is now more secure with two-factor authentication."
      });
      setStep(4);
      setIsLoading(false);
    }, 1500);
  };

  if (step === 4) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">All set!</h2>
          <p className="text-muted-foreground">
            Two-factor authentication has been enabled for your TRUEdots account. Your account is now more secure.
          </p>
          <div className="space-y-4">
            <Link
              to="/dashboard"
              className="w-full button-primary py-3 text-center block"
            >
              Continue to Dashboard
            </Link>
            <Link
              to="/settings/security"
              className="block w-full button-secondary py-3 text-center"
            >
              Security Settings
            </Link>
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
          <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-xl">TRUE</span>
              <span className="text-sm text-primary -mt-1">dots</span>
            </div>
          </Link>
          
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground">
            {step === 1 && "Secure your account"}
            {step === 2 && "Setup verification"}
            {step === 3 && "Verify your method"}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {step === 1 && "Add an extra layer of security with two-factor authentication"}
            {step === 2 && "Configure your chosen verification method"}
            {step === 3 && "Enter the verification code to complete setup"}
          </p>
        </div>

        {/* Step 1: Method Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-card/30 rounded-lg p-4 border border-border">
              <div className="flex items-center space-x-3 mb-2">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Why enable 2FA?</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Two-factor authentication adds an extra layer of security to your account, protecting your personal information and connections.
              </p>
            </div>

            <div className="space-y-3">
              {mfaMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handleMethodSelect(method.id)}
                  className="w-full p-4 border border-border rounded-lg hover:bg-card/50 transition-colors duration-300 text-left relative"
                >
                  {method.recommended && (
                    <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{method.title}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <Link
              to="/dashboard"
              className="block text-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Skip for now
            </Link>
          </div>
        )}

        {/* Step 2: Setup Method */}
        {step === 2 && (
          <form className="space-y-6" onSubmit={handleSetupSubmit}>
            {(selectedMethod === "sms" || selectedMethod === "phone") && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
                  placeholder="Enter your phone number"
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  We'll send verification codes to this number
                </p>
              </div>
            )}

            {selectedMethod === "authenticator" && (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-48 h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center border">
                    <QrCode className="w-24 h-24 text-gray-400" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Scan this QR code with your authenticator app
                  </p>
                </div>
                <div className="bg-card/30 rounded-lg p-4 border border-border">
                  <h4 className="font-semibold text-foreground mb-2">Setup key (manual entry)</h4>
                  <code className="text-sm bg-muted px-2 py-1 rounded text-foreground">
                    JBSWY3DPEHPK3PXP
                  </code>
                </div>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 button-secondary py-3 flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 button-primary py-3"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                    Setting up...
                  </div>
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Verification */}
        {step === 3 && (
          <form className="space-y-6" onSubmit={handleVerificationSubmit}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-foreground mb-2">
                Verification code
              </label>
              <input
                id="code"
                name="code"
                type="text"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground text-center text-lg tracking-widest"
                placeholder="000000"
                maxLength={6}
              />
              <p className="mt-2 text-sm text-muted-foreground text-center">
                {selectedMethod === "sms" && `Enter the 6-digit code sent to ${phoneNumber}`}
                {selectedMethod === "phone" && `Enter the 6-digit code from the phone call`}
                {selectedMethod === "authenticator" && "Enter the 6-digit code from your authenticator app"}
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 button-secondary py-3 flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 button-primary py-3"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  "Verify & Enable"
                )}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Didn't receive a code? Resend
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MFASetup;
