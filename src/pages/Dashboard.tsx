import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Heart, Settings, Camera, Shield, MessageCircle, Users, Bell, LogOut } from "lucide-react";
import LocationPermissionPopup from "@/components/LocationPermissionPopup";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  useEffect(() => {
    // Check if we should show location popup (from signup completion)
    if (searchParams.get('showLocationPopup') === 'true') {
      setShowLocationPopup(true);
      // Clean up the URL
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [searchParams]);

  const handleLocationAllow = () => {
    setShowLocationPopup(false);
    // Here you would typically save the location permission status
    console.log('Location access granted');
  };

  const handleLocationDeny = () => {
    setShowLocationPopup(false);
    // Here you would typically save the location permission status
    console.log('Location access denied');
  };

  const handleLocationClose = () => {
    setShowLocationPopup(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-current" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-foreground text-lg">TRUE</span>
                <span className="text-xs text-primary -mt-1">dots</span>
              </div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-card transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-card transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-card transition-colors">
                <LogOut className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to TRUEdots! 💕</h1>
          <p className="text-muted-foreground">
            Complete your profile setup to start finding meaningful connections.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            to="/photo-verification"
            className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Verify Your Photos</h3>
                <p className="text-sm text-muted-foreground">Get a verified badge</p>
              </div>
            </div>
          </Link>

          <Link
            to="/mfa-setup"
            className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Enable 2FA</h3>
                <p className="text-sm text-muted-foreground">Secure your account</p>
              </div>
            </div>
          </Link>

          <div className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 transition-colors group cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Browse Matches</h3>
                <p className="text-sm text-muted-foreground">Find your perfect match</p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Completion */}
        <div className="bg-card rounded-lg p-6 border border-border mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Complete Your Profile</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span className="text-foreground">Basic Information</span>
              </div>
              <span className="text-sm text-green-600">Complete</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                  <span className="text-amber-600 text-sm">!</span>
                </div>
                <span className="text-foreground">Profile Photos</span>
              </div>
              <button className="text-sm text-primary hover:text-primary/80">Add Photos</button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">○</span>
                </div>
                <span className="text-foreground">Interests & Preferences</span>
              </div>
              <button className="text-sm text-primary hover:text-primary/80">Complete</button>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Profile Completion</span>
              <span className="text-sm text-foreground">60%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-background rounded-lg">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary fill-current" />
              </div>
              <div>
                <p className="text-foreground">Welcome to TRUEdots!</p>
                <p className="text-sm text-muted-foreground">Complete your profile to start matching</p>
              </div>
              <span className="text-sm text-muted-foreground ml-auto">Just now</span>
            </div>
            
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No messages yet</p>
              <p className="text-sm text-muted-foreground">Start browsing profiles to make connections!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Location Permission Popup */}
      {showLocationPopup && (
        <LocationPermissionPopup
          onClose={handleLocationClose}
          onAllow={handleLocationAllow}
          onDeny={handleLocationDeny}
        />
      )}
    </div>
  );
};

export default Dashboard;
