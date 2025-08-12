import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Heart, Settings, Camera, Shield, MessageCircle, Users, Bell, LogOut, 
  MapPin, Search, Star, Crown, Gift, Gamepad2, Eye, UserPlus, Filter,
  MoreHorizontal, Phone, Video, Send, Image, Paperclip, Smile
} from "lucide-react";
import LocationPermissionPopup from "@/components/LocationPermissionPopup";
import { ThemeToggle } from "@/components/ThemeToggle";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [activeTab, setActiveTab] = useState('matches');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistance, setSelectedDistance] = useState(25);
  const [isPremium, setIsPremium] = useState(false);

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

  // Mock data for demonstration
  const mockMatches = [
    {
      id: 1,
      name: "Sarah",
      age: 28,
      location: "2.3 km away",
      photos: ["/placeholder.svg"],
      verified: true,
      online: true,
      interests: ["Travel", "Music", "Cooking"]
    },
    {
      id: 2,
      name: "Emma",
      age: 25,
      location: "5.1 km away",
      photos: ["/placeholder.svg"],
      verified: false,
      online: false,
      interests: ["Art", "Photography", "Yoga"]
    },
    {
      id: 3,
      name: "Jessica",
      age: 30,
      location: "1.8 km away",
      photos: ["/placeholder.svg"],
      verified: true,
      online: true,
      interests: ["Fitness", "Reading", "Movies"]
    }
  ];

  const mockMessages = [
    {
      id: 1,
      name: "Sarah",
      lastMessage: "Hey! How are you doing?",
      time: "2 min ago",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Emma",
      lastMessage: "That sounds great!",
      time: "1 hour ago",
      unread: 0,
      online: false
    }
  ];

  const renderMatchesTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, interests, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-foreground"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(Number(e.target.value))}
              className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={25}>25 km</option>
              <option value={50}>50 km</option>
              <option value={100}>100 km</option>
            </select>
            <button className="px-4 py-3 border border-border rounded-lg hover:bg-card transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMatches.map((match) => (
          <div key={match.id} className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 transition-colors group">
            <div className="relative">
              <img
                src={match.photos[0]}
                alt={match.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                {match.verified && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                )}
                {match.online && (
                  <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              {isPremium && (
                <div className="absolute bottom-3 left-3">
                  <button className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                    <Eye className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground text-lg">{match.name}, {match.age}</h3>
                <button className="p-2 rounded-full hover:bg-muted transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="w-4 h-4 mr-1" />
                {match.location}
              </div>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {match.interests.slice(0, 3).map((interest, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg hover:bg-primary/90 transition-colors">
                  <MessageCircle className="w-4 h-4 mr-2 inline" />
                  Message
                </button>
                <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors">
                  <Heart className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderChatsTab = () => (
    <div className="space-y-6">
      {/* Chat List */}
      <div className="bg-card rounded-lg border border-border">
        {mockMessages.map((message) => (
          <div key={message.id} className="flex items-center p-4 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors cursor-pointer">
            <div className="relative mr-4">
              <img
                src="/placeholder.svg"
                alt={message.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {message.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-foreground">{message.name}</h3>
                <span className="text-sm text-muted-foreground">{message.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{message.lastMessage}</p>
            </div>
            
            {message.unread > 0 && (
              <div className="ml-4">
                <span className="w-6 h-6 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                  {message.unread}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Start New Chat */}
      <div className="bg-card rounded-lg p-6 border border-border text-center">
        <UserPlus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Start New Conversations</h3>
        <p className="text-muted-foreground mb-4">Browse profiles and start meaningful connections</p>
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Browse Profiles
        </button>
      </div>
    </div>
  );

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src="/placeholder.svg"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-foreground">John Doe</h2>
              {isPremium ? (
                <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm rounded-full">
                  <Crown className="w-4 h-4" />
                  Premium
                </div>
              ) : (
                <button className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full hover:bg-primary/90 transition-colors">
                  Upgrade to Premium
                </button>
              )}
            </div>
            <p className="text-muted-foreground mb-2">28 years old • 5.2 km away</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">Profile views: 127</span>
              <span className="text-muted-foreground">Likes: 89</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4">Profile Completion</h3>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </div>
  );

  const renderPremiumTab = () => (
    <div className="space-y-6">
      {/* Premium Features */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-8 text-white text-center">
        <Crown className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Upgrade to Premium</h2>
        <p className="text-lg mb-6">Unlock all features and find your perfect match faster</p>
        <button className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Get Premium - $19.99/month
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border">
          <Eye className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">See Who Liked You</h3>
          <p className="text-muted-foreground">Discover who's interested in your profile</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <MapPin className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Advanced Search</h3>
          <p className="text-muted-foreground">Filter by location, interests, and more</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <Gift className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Send Gifts</h3>
          <p className="text-muted-foreground">Show your interest with virtual gifts</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <Gamepad2 className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Premium Games</h3>
          <p className="text-muted-foreground">Access exclusive couple games</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <Star className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Priority Matching</h3>
          <p className="text-muted-foreground">Get shown to more potential matches</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <Shield className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Privacy Mode</h3>
          <p className="text-muted-foreground">Browse profiles invisibly</p>
        </div>
      </div>
    </div>
  );

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

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8">
          {[
            { id: 'matches', label: 'Matches', icon: Users },
            { id: 'chats', label: 'Chats', icon: MessageCircle },
            { id: 'profile', label: 'Profile', icon: Heart },
            { id: 'premium', label: 'Premium', icon: Crown }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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
        {activeTab === 'matches' && renderMatchesTab()}
        {activeTab === 'chats' && renderChatsTab()}
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'premium' && renderPremiumTab()}
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
