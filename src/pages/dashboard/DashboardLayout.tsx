import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { 
  Heart, Settings, Bell, LogOut, Users, MessageCircle, Crown
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import LocationPermissionPopup from "@/components/LocationPermissionPopup";
import MatchesPage from "./MatchesPage";
import ChatsPage from "./ChatsPage";
import ProfilePage from "./ProfilePage";
import PremiumPage from "./PremiumPage";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, profile, signOut } = useAuth();
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [activeTab, setActiveTab] = useState('matches');

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
    console.log('Location access granted');
  };

  const handleLocationDeny = () => {
    setShowLocationPopup(false);
    console.log('Location access denied');
  };

  const handleLocationClose = () => {
    setShowLocationPopup(false);
  };

  const handleSignOut = async () => {
    console.log('Logout button clicked');
    try {
      console.log('Calling signOut...');
      await signOut();
      console.log('SignOut successful, showing toast...');
      toast({
        title: "Signed out successfully",
        description: "Come back soon! 💕"
      });
      console.log('Toast shown, navigating to home...');
      navigate("/");
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Sign out failed",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Update URL without full navigation
    window.history.replaceState({}, '', `/dashboard/${tabId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 border-b border-border sticky top-0 z-50">
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
              <ThemeToggle />
              <button className="p-2 rounded-lg hover:bg-card transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-card transition-colors">
                <Settings className="w-5 h-5 text-muted-foreground" />
              </button>
              <button 
                onClick={handleSignOut}
                className="p-2 rounded-lg hover:bg-card transition-colors"
                title="Sign out"
              >
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

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8">
          {[
            { id: 'matches', label: 'Matches', icon: Users, path: '/dashboard/matches' },
            { id: 'chats', label: 'Chats', icon: MessageCircle, path: '/dashboard/chats' },
            { id: 'profile', label: 'Profile', icon: Heart, path: '/dashboard/profile' },
            { id: 'premium', label: 'Premium', icon: Crown, path: '/dashboard/premium' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard/matches" replace />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/premium" element={<PremiumPage />} />
        </Routes>
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

export default DashboardLayout;
