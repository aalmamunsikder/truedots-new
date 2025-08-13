import React, { useState, useEffect } from "react";
import { Heart, ArrowLeft, ArrowRight, Plus, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { SignupData } from "@/pages/auth/SignupFlow";

interface DatingPreferencesProps {
  signupData: SignupData;
  updateSignupData: (data: Partial<SignupData>) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
}

const DatingPreferences: React.FC<DatingPreferencesProps> = ({
  signupData,
  updateSignupData,
  onNext,
  onPrev,
  canGoBack,
  canGoNext
}) => {
  // Simple state for testing
  const [interestedIn, setInterestedIn] = useState<string[]>([]);
  const [lookingFor, setLookingFor] = useState<string>("");
  const [interests, setInterests] = useState<string[]>([]);

  // Initialize from signupData
  useEffect(() => {
    setInterestedIn(signupData.interestedIn || []);
    setLookingFor(signupData.lookingFor || "");
    setInterests(signupData.interests || []);
  }, [signupData]);

  const handleNext = () => {
    const formData = { interestedIn, lookingFor, interests };
    updateSignupData(formData);
    onNext();
  };

  // Simple validation
  const isFormValid = interestedIn.length > 0 && lookingFor !== "";

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Dating Preferences</h3>
      
      {/* Interested In */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Interested In *
        </label>
        <div className="space-y-2">
          {["men", "women", "everyone"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                const newValue = interestedIn.includes(option)
                  ? interestedIn.filter(item => item !== option)
                  : [...interestedIn, option];
                setInterestedIn(newValue);
              }}
              className={`w-full p-3 border rounded-lg text-sm font-medium transition-colors text-left ${
                interestedIn.includes(option)
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50 text-foreground"
              }`}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Looking For */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Looking For *
        </label>
        <div className="space-y-2">
          {["long-term", "casual", "friendship", "networking"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setLookingFor(option);
              }}
              className={`w-full p-3 border rounded-lg text-sm font-medium transition-colors text-left ${
                lookingFor === option
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border hover:border-primary/50 text-foreground"
              }`}
            >
              {option === "long-term" ? "Long-term relationship" : 
               option === "casual" ? "Casual dating" :
               option === "friendship" ? "Friendship" : "Networking"}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex space-x-4 pt-4">
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
          onClick={handleNext}
          disabled={!isFormValid}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default DatingPreferences;
