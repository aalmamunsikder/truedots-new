import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Heart, Camera, Upload, CheckCircle, AlertCircle, RotateCcw, ArrowLeft } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const PhotoVerification = () => {
  const [step, setStep] = useState(1);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "approved" | "rejected" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStep(2);
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to take a verification photo.",
        variant: "destructive"
      });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext("2d");
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const photoDataUrl = canvas.toDataURL("image/jpeg");
        setCapturedPhoto(photoDataUrl);
        setStep(3);
        
        // Stop camera stream
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
          setStream(null);
        }
      }
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedPhoto(e.target?.result as string);
        setStep(3);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitVerification = async () => {
    setIsLoading(true);
    
    // Simulate API call for photo verification
    setTimeout(() => {
      // Simulate random verification result for demo
      const isApproved = Math.random() > 0.3; // 70% approval rate
      setVerificationStatus(isApproved ? "approved" : "rejected");
      setStep(4);
      setIsLoading(false);
      
      if (isApproved) {
        toast({
          title: "Photo verified! ✅",
          description: "Your identity has been successfully verified."
        });
      } else {
        toast({
          title: "Verification failed",
          description: "Please try again with a clearer photo.",
          variant: "destructive"
        });
      }
    }, 3000);
  };

  const verificationTips = [
    "Face the camera directly",
    "Ensure good lighting",
    "Remove sunglasses or hats",
    "Keep a neutral expression",
    "Make sure your face is clearly visible"
  ];

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
            <Camera className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-3xl font-bold text-foreground">
            {step === 1 && "Verify your identity"}
            {step === 2 && "Take your photo"}
            {step === 3 && "Review your photo"}
            {step === 4 && (verificationStatus === "approved" ? "Verification complete" : "Verification failed")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {step === 1 && "Help us keep TRUEdots safe by verifying your identity"}
            {step === 2 && "Position your face in the center and take a clear photo"}
            {step === 3 && "Make sure your photo is clear and follows our guidelines"}
            {step === 4 && verificationStatus === "approved" && "Your identity has been successfully verified"}
            {step === 4 && verificationStatus === "rejected" && "Please try again with a clearer photo"}
          </p>
        </div>

        {/* Step 1: Instructions */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-card/30 rounded-lg p-6 border border-border">
              <h3 className="font-semibold text-foreground mb-4">Photo verification tips:</h3>
              <ul className="space-y-2">
                {verificationTips.map((tip, index) => (
                  <li key={index} className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <button
                onClick={startCamera}
                className="w-full button-primary py-4 flex items-center justify-center"
              >
                <Camera className="w-5 h-5 mr-2" />
                Take photo with camera
              </button>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full button-secondary py-4 flex items-center justify-center"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload from device
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            <div className="text-center">
              <Link
                to="/dashboard"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Skip for now
              </Link>
            </div>
          </div>
        )}

        {/* Step 2: Camera */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-80 object-cover rounded-lg bg-muted"
              />
              <div className="absolute inset-0 border-4 border-primary/30 rounded-lg pointer-events-none">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-64 border-2 border-primary rounded-lg"></div>
              </div>
            </div>
            
            <canvas ref={canvasRef} className="hidden" />
            
            <div className="flex space-x-4">
              <button
                onClick={() => {
                  if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                    setStream(null);
                  }
                  setStep(1);
                }}
                className="flex-1 button-secondary py-3 flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button
                onClick={capturePhoto}
                className="flex-1 button-primary py-3 flex items-center justify-center"
              >
                <Camera className="w-4 h-4 mr-2" />
                Capture
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && capturedPhoto && (
          <div className="space-y-6">
            <div className="relative">
              <img
                src={capturedPhoto}
                alt="Captured verification photo"
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            
            <div className="bg-card/30 rounded-lg p-4 border border-border">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Before submitting</h4>
                  <p className="text-sm text-muted-foreground">
                    Make sure your face is clearly visible and the photo follows our guidelines.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={retakePhoto}
                className="flex-1 button-secondary py-3 flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retake
              </button>
              <button
                onClick={submitVerification}
                disabled={isLoading}
                className="flex-1 button-primary py-3"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  "Submit for verification"
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Result */}
        {step === 4 && (
          <div className="space-y-6 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              verificationStatus === "approved" 
                ? "bg-green-100 dark:bg-green-900/30" 
                : "bg-red-100 dark:bg-red-900/30"
            }`}>
              {verificationStatus === "approved" ? (
                <CheckCircle className="w-10 h-10 text-green-600" />
              ) : (
                <AlertCircle className="w-10 h-10 text-red-600" />
              )}
            </div>
            
            {verificationStatus === "approved" ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Your identity has been verified! You now have a verified badge on your profile.
                </p>
                <Link
                  to="/dashboard"
                  className="w-full button-primary py-3 text-center block"
                >
                  Continue to Dashboard
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We couldn't verify your photo. Please try again with a clearer image that follows our guidelines.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      setCapturedPhoto(null);
                      setVerificationStatus(null);
                      setStep(1);
                    }}
                    className="flex-1 button-primary py-3"
                  >
                    Try again
                  </button>
                  <Link
                    to="/dashboard"
                    className="flex-1 button-secondary py-3 text-center"
                  >
                    Skip for now
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoVerification;
