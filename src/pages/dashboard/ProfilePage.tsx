import React, { useState } from "react";
import { 
  Heart, Camera, Settings, Edit, MapPin, Calendar, User, 
  Star, Shield, Crown, Gift, Gamepad2, Eye
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ProfilePage = () => {
  const { profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Mock profile data - in real app this would come from the auth context
  const mockProfile = {
    fullName: "Alex Johnson",
    age: 28,
    location: "New York, NY",
    bio: "Adventure seeker and coffee enthusiast. Love exploring new places and meeting interesting people. Looking for someone to share life's adventures with!",
    interests: ["Travel", "Photography", "Hiking", "Cooking", "Reading", "Music"],
    photos: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    verified: true,
    premium: false,
    lastActive: "2 hours ago"
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Photos */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                src={mockProfile.photos[0]}
                alt="Profile"
                className="w-32 h-32 rounded-xl object-cover border-4 border-primary/20"
              />
              <button className="absolute bottom-2 right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2 mt-3">
              {mockProfile.photos.slice(1).map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo}
                    alt={`Photo ${index + 2}`}
                    className="w-16 h-16 rounded-lg object-cover border-2 border-border"
                  />
                  <button className="absolute top-1 right-1 w-5 h-5 bg-muted text-muted-foreground rounded-full flex items-center justify-center hover:bg-background transition-colors">
                    <Edit className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">{mockProfile.fullName}, {mockProfile.age}</h2>
                  {mockProfile.verified && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-white fill-current" />
                    </div>
                  )}
                  {mockProfile.premium && (
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Crown className="w-3 h-3 text-white fill-current" />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4 text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{mockProfile.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Last active {mockProfile.lastActive}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Edit className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <p className="text-muted-foreground mb-4">{mockProfile.bio}</p>

            {/* Interests */}
            <div className="mb-4">
              <h3 className="font-medium text-foreground mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {mockProfile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Edit Profile
              </button>
              <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors">
                View Public Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border text-center">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Eye className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">1,247</h3>
          <p className="text-muted-foreground">Profile Views</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Heart className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">89</h3>
          <p className="text-muted-foreground">Likes Received</p>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">23</h3>
          <p className="text-muted-foreground">Matches</p>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Privacy Settings</h4>
                <p className="text-sm text-muted-foreground">Control who can see your profile</p>
              </div>
            </div>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Settings className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Profile Visibility</h4>
                <p className="text-sm text-muted-foreground">Currently visible to everyone</p>
              </div>
            </div>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Settings className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3">
              <Gift className="w-5 h-5 text-muted-foreground" />
              <div>
                <h4 className="font-medium text-foreground">Notifications</h4>
                <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
              </div>
            </div>
            <button className="p-2 hover:bg-muted rounded-lg transition-colors">
              <Settings className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return renderProfileTab();
};

export default ProfilePage;
