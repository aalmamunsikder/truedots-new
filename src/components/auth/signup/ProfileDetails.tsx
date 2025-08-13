import React, { useState, useEffect } from "react";
import { User, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { SignupData } from "@/pages/auth/SignupFlow";

interface ProfileDetailsProps {
  signupData: SignupData;
  updateSignupData: (data: Partial<SignupData>) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  signupData,
  updateSignupData,
  onNext,
  onPrev,
  canGoBack,
  canGoNext
}) => {
  const [formData, setFormData] = useState({
    fullName: signupData.fullName,
    birthday: signupData.birthday,
    gender: signupData.gender
  });

  const genderOptions = [
    { value: "man", label: "Man" },
    { value: "woman", label: "Woman" },
    { value: "non-binary", label: "Non-binary" },
    { value: "other", label: "Other" }
  ];

  const handleInputChange = (field: string, value: any) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    
    // Also update the parent component immediately
    updateSignupData(newFormData);
  };

  const handleNext = () => {
    updateSignupData(formData);
    onNext();
  };

  const calculateAge = (birthday: string) => {
    if (!birthday) return 0;
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(formData.birthday);
  const isValidAge = age >= 18 && age <= 100;

  // Update local formData when signupData changes
  useEffect(() => {
    setFormData({
      fullName: signupData.fullName || "",
      birthday: signupData.birthday || "",
      gender: signupData.gender || ""
    });
  }, [signupData]);

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
        
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="birthday" className="block text-sm font-medium text-foreground mb-2">
            Birthday *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="birthday"
              type="date"
              value={formData.birthday}
              onChange={(e) => handleInputChange("birthday", e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
            />
          </div>
          {formData.birthday && !isValidAge && (
            <p className="text-sm text-red-500 mt-1">
              You must be between 18 and 100 years old to use TRUEdots
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Gender *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {genderOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleInputChange("gender", option.value)}
                className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                  formData.gender === option.value
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 text-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
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
          disabled={!canGoNext || !isValidAge}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
