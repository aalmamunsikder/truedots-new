import React, { useState } from "react";
import { 
  Heart, MapPin, Search, Star, Eye, UserPlus, Filter,
  MoreHorizontal, Phone, Video, Send, Image, Paperclip, Smile,
  Map, Grid3X3, Users
} from "lucide-react";
import ModernMapView from "@/components/ModernMapView";
import { toast } from "@/components/ui/use-toast";

const MatchesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistance, setSelectedDistance] = useState(25);
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('map'); // Default to map view
  const [selectedFilters, setSelectedFilters] = useState({
    ageRange: [18, 50],
    verified: false,
    online: false,
    interests: [] as string[]
  });

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

  // Handle map interactions
  const handleUserClick = (userId: string) => {
    console.log('User clicked:', userId);
  };

  const handleLikeUser = (userId: string) => {
    toast({
      title: "Like sent! 💕",
      description: "Let's see if it's a match!"
    });
  };

  const handleViewProfile = (userId: string) => {
    toast({
      title: "Viewing profile",
      description: "Opening user profile..."
    });
  };

  const handleStartChat = (userId: string) => {
    toast({
      title: "Starting chat",
      description: "Opening chat conversation..."
    });
  };

  const renderMapView = () => (
    <div className="space-y-6">
      {/* Map View Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Discover Nearby Connections</h2>
        <p className="text-muted-foreground">
          Each dot represents a potential match. Click on dots to see profiles and start meaningful connections! 💫
        </p>
      </div>

      {/* Map View */}
      <ModernMapView
        users={[]} // Empty array since MapView has its own mock data
        onUserClick={handleUserClick}
        onLikeUser={handleLikeUser}
        onViewProfile={handleViewProfile}
        onStartChat={handleStartChat}
      />

      {/* Map View Info */}
      <div className="bg-muted/50 rounded-xl p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-3">How TRUEdots Works 🗺️</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-medium text-foreground mb-2">See Nearby Users</h4>
            <p className="text-sm text-muted-foreground">Each dot on the map represents a user in your area</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-medium text-foreground mb-2">Click to Explore</h4>
            <p className="text-sm text-muted-foreground">Tap on dots to view profiles and interests</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-medium text-foreground mb-2">Make Connections</h4>
            <p className="text-sm text-muted-foreground">Like profiles and start meaningful conversations</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderGridView = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search matches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedDistance}
            onChange={(e) => setSelectedDistance(Number(e.target.value))}
            className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={25}>25 km</option>
            <option value={50}>50 km</option>
            <option value={100}>100 km</option>
          </select>
          <button className="p-2 border border-border rounded-lg bg-background text-muted-foreground hover:text-foreground transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMatches.map((match) => (
          <div key={match.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={match.photos[0]}
                alt={match.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                {match.verified && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                )}
                {match.online && (
                  <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-foreground">{match.name}, {match.age}</h3>
                <button className="p-1 hover:bg-muted rounded transition-colors">
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              
              <div className="flex items-center gap-1 text-muted-foreground mb-3">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{match.location}</span>
              </div>

              {/* Interests */}
              <div className="flex flex-wrap gap-1 mb-4">
                {match.interests.slice(0, 3).map((interest, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                  >
                    {interest}
                  </span>
                ))}
                {match.interests.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    +{match.interests.length - 3}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  <Heart className="w-4 h-4 inline mr-2" />
                  Like
                </button>
                <button className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-lg font-medium hover:bg-secondary/80 transition-colors">
                  <Eye className="w-4 h-4 inline mr-2" />
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {mockMatches.length === 0 && (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No matches yet</h3>
          <p className="text-muted-foreground">Complete your profile to start finding meaningful connections!</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Discover Matches</h1>
          <p className="text-muted-foreground">
            {viewMode === 'map' 
              ? 'Explore nearby users on the interactive map' 
              : 'Browse matches in a traditional grid view'
            }
          </p>
        </div>
        
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              viewMode === 'map'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Map View</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
            <span>Grid View</span>
          </button>
        </div>
      </div>

      {/* Render appropriate view */}
      {viewMode === 'map' ? renderMapView() : renderGridView()}
    </div>
  );
};

export default MatchesPage;
