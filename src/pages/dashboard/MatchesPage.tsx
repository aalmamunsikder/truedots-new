import React, { useState } from "react";
import { 
  Heart, MapPin, Search, Star, Eye, UserPlus, Filter,
  MoreHorizontal, Phone, Video, Send, Image, Paperclip, Smile
} from "lucide-react";

const MatchesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistance, setSelectedDistance] = useState(25);

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

  const renderMatchesTab = () => (
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

  return renderMatchesTab();
};

export default MatchesPage;
