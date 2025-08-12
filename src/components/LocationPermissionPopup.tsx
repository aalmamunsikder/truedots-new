import React, { useState } from "react";
import { MapPin, X, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationPermissionPopupProps {
  onClose: () => void;
  onAllow: () => void;
  onDeny: () => void;
}

const LocationPermissionPopup: React.FC<LocationPermissionPopupProps> = ({
  onClose,
  onAllow,
  onDeny
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAllowLocation = async () => {
    setIsLoading(true);
    
    try {
      // Request location permission
      const permission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
      
      if (permission.state === 'granted') {
        // Get current position
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Location obtained:', position.coords);
            onAllow();
          },
          (error) => {
            console.error('Location error:', error);
            onDeny();
          }
        );
      } else if (permission.state === 'prompt') {
        // Request permission
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Location obtained:', position.coords);
            onAllow();
          },
          (error) => {
            console.error('Location error:', error);
            onDeny();
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
        );
      } else {
        onDeny();
      }
    } catch (error) {
      console.error('Permission error:', error);
      onDeny();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDenyLocation = () => {
    onDeny();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl border border-border max-w-md w-full relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-colors z-10"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="p-8 text-center relative z-10">
          {/* Location Icon */}
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-primary" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Enable Location Access
          </h2>
          
          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Allow TRUEdots to access your location to find matches near you and show relevant events in your area.
          </p>

          {/* Benefits */}
          <div className="space-y-3 mb-8 text-left">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-foreground">Find matches in your area</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-foreground">Discover local events</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-sm text-foreground">Better matching accuracy</span>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">Your privacy is protected</p>
                <p className="text-xs text-muted-foreground">
                  We only use your location to improve your matching experience. Your exact location is never shared with other users.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleAllowLocation}
              disabled={isLoading}
              className="w-full py-3 text-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                  Enabling...
                </div>
              ) : (
                "Allow Location Access"
              )}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleDenyLocation}
              className="w-full py-3 text-lg"
            >
              Maybe Later
            </Button>
          </div>

          {/* Additional Info */}
          <p className="text-xs text-muted-foreground mt-4">
            You can change this setting anytime in your profile preferences
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationPermissionPopup;
