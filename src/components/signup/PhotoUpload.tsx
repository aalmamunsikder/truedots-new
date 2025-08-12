import React, { useState, useRef } from "react";
import { Camera, Upload, ArrowLeft, ArrowRight, X, RotateCcw, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { SignupData } from "@/pages/SignupFlow";

interface PhotoUploadProps {
  signupData: SignupData;
  updateSignupData: (data: Partial<SignupData>) => void;
  onNext: () => void;
  onPrev: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  signupData,
  updateSignupData,
  onNext,
  onPrev,
  canGoBack,
  canGoNext
}) => {
  const [photos, setPhotos] = useState<string[]>(signupData.photos);
  const [currentPhoto, setCurrentPhoto] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB.",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setCurrentPhoto(e.target?.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = () => {
    if (currentPhoto && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = imageRef.current;

      // Set canvas size to square (400x400)
      canvas.width = 400;
      canvas.height = 400;

      if (ctx) {
        // Calculate crop dimensions to center the image
        const size = Math.min(img.naturalWidth, img.naturalHeight);
        const x = (img.naturalWidth - size) / 2;
        const y = (img.naturalHeight - size) / 2;

        // Draw cropped image
        ctx.drawImage(img, x, y, size, size, 0, 0, 400, 400);
        
        // Convert to data URL
        const croppedImage = canvas.toDataURL("image/jpeg", 0.8);
        
        if (photos.length < 6) {
          const updatedPhotos = [...photos, croppedImage];
          setPhotos(updatedPhotos);
          updateSignupData({ photos: updatedPhotos });
          
          toast({
            title: "Photo added! 📸",
            description: "Your photo has been successfully added to your profile."
          });
        }
        
        setShowCropper(false);
        setCurrentPhoto(null);
      }
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    updateSignupData({ photos: updatedPhotos });
  };

  const reorderPhoto = (fromIndex: number, toIndex: number) => {
    const updatedPhotos = [...photos];
    const [movedPhoto] = updatedPhotos.splice(fromIndex, 1);
    updatedPhotos.splice(toIndex, 0, movedPhoto);
    setPhotos(updatedPhotos);
    updateSignupData({ photos: updatedPhotos });
  };

  const handleNext = () => {
    if (photos.length < 2) {
      toast({
        title: "More photos needed",
        description: "Please add at least 2 photos to continue.",
        variant: "destructive"
      });
      return;
    }
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Add your photos
        </h3>
        <p className="text-muted-foreground text-sm">
          Add at least 2 photos to show your personality. First photo will be your main profile picture.
        </p>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Existing Photos */}
        {photos.map((photo, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square rounded-lg overflow-hidden border-2 border-border">
              <img
                src={photo}
                alt={`Profile photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Photo Controls */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
              <button
                onClick={() => removePhoto(index)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              {index > 0 && (
                <button
                  onClick={() => reorderPhoto(index, index - 1)}
                  className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                >
                  ↑
                </button>
              )}
              {index < photos.length - 1 && (
                <button
                  onClick={() => reorderPhoto(index, index + 1)}
                  className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                >
                  ↓
                </button>
              )}
            </div>
            
            {/* Main Photo Badge */}
            {index === 0 && (
              <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                Main
              </div>
            )}
          </div>
        ))}

        {/* Add Photo Button */}
        {photos.length < 6 && (
          <button
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors flex flex-col items-center justify-center space-y-2 text-muted-foreground hover:text-primary"
          >
            <Camera className="w-8 h-8" />
            <span className="text-sm font-medium">Add Photo</span>
          </button>
        )}
      </div>

      {/* Photo Requirements */}
      <div className="bg-card/30 rounded-lg p-4 border border-border">
        <h4 className="font-semibold text-foreground mb-2">Photo Guidelines</h4>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li className="flex items-center">
            <span className={`mr-2 ${photos.length >= 2 ? "text-green-500" : "text-muted-foreground"}`}>
              {photos.length >= 2 ? "✓" : "○"}
            </span>
            At least 2 photos required
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Clear face photos work best
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Show your personality and interests
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Maximum 6 photos allowed
          </li>
        </ul>
      </div>

      {/* Navigation */}
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
          onClick={handleNext}
          disabled={!canGoNext}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 rounded-md font-medium transition-colors flex items-center justify-center"
        >
          Complete Profile
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Photo Cropper Modal */}
      {showCropper && currentPhoto && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Crop your photo</h3>
            
            <div className="space-y-4">
              <div className="relative">
                <img
                  ref={imageRef}
                  src={currentPhoto}
                  alt="Photo to crop"
                  className="w-full h-64 object-contain rounded-lg"
                  onLoad={() => {
                    // Image loaded, ready for cropping
                  }}
                />
                <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none"></div>
              </div>
              
              <p className="text-sm text-muted-foreground text-center">
                Your photo will be cropped to a square format
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowCropper(false);
                    setCurrentPhoto(null);
                  }}
                  className="flex-1 button-secondary py-3"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCrop}
                  className="flex-1 button-primary py-3 flex items-center justify-center"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Save Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Canvas for Cropping */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default PhotoUpload;
