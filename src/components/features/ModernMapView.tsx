import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Heart, Star, Eye, MessageCircle, X, Users, Map as MapIcon } from 'lucide-react';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom user dot icon with modern styling
const createUserIcon = (isOnline: boolean, isVerified: boolean) => {
  return L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div class="relative group">
        <div class="w-10 h-10 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-full flex items-center justify-center shadow-lg border-3 border-white hover:scale-110 transition-all duration-200 group-hover:shadow-xl">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
          </svg>
        </div>
        ${isOnline ? '<div class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>' : ''}
        ${isVerified ? '<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white shadow-md"><svg class="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></div>' : ''}
        <div class="absolute -top-2 -left-2 -right-2 -bottom-2 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

// Component to handle map interactions
const MapController: React.FC<{ onUserClick: (userId: string) => void }> = ({ onUserClick }) => {
  const map = useMap();

  useEffect(() => {
    // Request user location and center map
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 15);
        },
        (error) => {
          console.log('Location access denied, using default center');
          // Default to a central location
          map.setView([40.7128, -74.0060], 13); // New York
        }
      );
    }
  }, [map]);

  return null;
};

// Custom map controls
const CustomControls: React.FC = () => {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleCenterLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 15);
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  };

  return (
    <div className="absolute bottom-4 right-4 space-y-2 z-[1000]">
      {/* Zoom Controls */}
      <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg shadow-lg">
        <button
          onClick={handleZoomIn}
          className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors rounded-t-lg border-b border-border"
        >
          <span className="text-foreground font-bold text-lg">+</span>
        </button>
        <button
          onClick={handleZoomOut}
          className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors rounded-b-lg"
        >
          <span className="text-foreground font-bold text-lg">−</span>
        </button>
      </div>

      {/* Location Button */}
      <button
        onClick={handleCenterLocation}
        className="w-10 h-10 bg-card/90 backdrop-blur-sm border border-border rounded-lg flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
        title="Center on my location"
      >
        <MapPin className="w-5 h-5 text-primary" />
      </button>
    </div>
  );
};

interface User {
  id: string;
  name: string;
  age: number;
  location: string;
  photos: string[];
  verified: boolean;
  online: boolean;
  interests: string[];
  coordinates: [number, number]; // [latitude, longitude] for Leaflet
  distance: number;
}

interface ModernMapViewProps {
  users: User[];
  onUserClick: (userId: string) => void;
  onLikeUser: (userId: string) => void;
  onViewProfile: (userId: string) => void;
  onStartChat: (userId: string) => void;
}

const ModernMapView: React.FC<ModernMapViewProps> = ({
  users,
  onUserClick,
  onLikeUser,
  onViewProfile,
  onStartChat
}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.0060]);
  const [mapZoom, setMapZoom] = useState(13);

  // Mock users with coordinates (replace with real data)
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Sarah',
      age: 28,
      location: '2.3 km away',
      photos: ['/placeholder.svg'],
      verified: true,
      online: true,
      interests: ['Travel', 'Music', 'Cooking'],
      coordinates: [40.7128, -74.0060],
      distance: 2.3
    },
    {
      id: '2',
      name: 'Emma',
      age: 25,
      location: '5.1 km away',
      photos: ['/placeholder.svg'],
      verified: false,
      online: false,
      interests: ['Art', 'Photography', 'Yoga'],
      coordinates: [40.7200, -74.0100],
      distance: 5.1
    },
    {
      id: '3',
      name: 'Jessica',
      age: 30,
      location: '1.8 km away',
      photos: ['/placeholder.svg'],
      verified: true,
      online: true,
      interests: ['Fitness', 'Reading', 'Movies'],
      coordinates: [40.7080, -74.0040],
      distance: 1.8
    },
    {
      id: '4',
      name: 'Alex',
      age: 27,
      location: '3.2 km away',
      photos: ['/placeholder.svg'],
      verified: true,
      online: false,
      interests: ['Technology', 'Gaming', 'Coffee'],
      coordinates: [40.7160, -74.0080],
      distance: 3.2
    },
    {
      id: '5',
      name: 'Maya',
      age: 26,
      location: '4.7 km away',
      photos: ['/placeholder.svg'],
      verified: false,
      online: true,
      interests: ['Dance', 'Fashion', 'Travel'],
      coordinates: [40.7240, -74.0120],
      distance: 4.7
    }
  ];

  const handleMarkerClick = (user: User) => {
    setSelectedUser(user);
    onUserClick(user.id);
  };

  const handleLike = (userId: string) => {
    onLikeUser(userId);
    setSelectedUser(null);
  };

  const handleViewProfile = (userId: string) => {
    onViewProfile(userId);
    setSelectedUser(null);
  };

  const handleStartChat = (userId: string) => {
    onStartChat(userId);
    setSelectedUser(null);
  };

  return (
    <div className="relative h-[600px] rounded-xl overflow-hidden border border-border bg-background">
      {/* Modern Map Container */}
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        className="h-full w-full"
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        {/* Beautiful OpenStreetMap Tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapController onUserClick={onUserClick} />

        {/* Custom Controls - Must be inside MapContainer to access map context */}
        <CustomControls />

        {/* User Markers */}
        {mockUsers.map((user) => (
          <Marker
            key={user.id}
            position={user.coordinates}
            icon={createUserIcon(user.online, user.verified)}
            eventHandlers={{
              click: () => handleMarkerClick(user),
            }}
          >
            <Popup>
              <div className="text-center p-2">
                <h3 className="font-semibold text-sm">{user.name}, {user.age}</h3>
                <p className="text-xs text-muted-foreground">{user.location}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* User Info Panel */}
        {selectedUser && (
          <div className="absolute top-4 right-4 bg-card border border-border rounded-xl p-4 max-w-sm shadow-xl z-[1000]">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary shadow-md">
                  <img
                    src={selectedUser.photos[0]}
                    alt={selectedUser.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{selectedUser.name}, {selectedUser.age}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{selectedUser.location}</span>
                    {selectedUser.verified && (
                      <Star className="w-3 h-3 text-blue-500 fill-current" />
                    )}
                    {selectedUser.online && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Interests */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {selectedUser.interests.slice(0, 3).map((interest, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full border border-border/50"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleLike(selectedUser.id)}
                className="flex-1 bg-primary text-primary-foreground py-2 px-3 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center shadow-sm"
              >
                <Heart className="w-4 h-4 mr-1" />
                Like
              </button>
              <button
                onClick={() => handleViewProfile(selectedUser.id)}
                className="flex-1 bg-secondary text-secondary-foreground py-2 px-3 rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center shadow-sm"
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </button>
              <button
                onClick={() => handleStartChat(selectedUser.id)}
                className="flex-1 bg-accent text-accent-foreground py-2 px-3 rounded-lg text-sm font-medium hover:bg-accent/80 transition-colors flex items-center justify-center shadow-sm"
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Chat
              </button>
            </div>
          </div>
        )}
      </MapContainer>

      {/* Map Info Overlay */}
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg z-[1000]">
        <div className="flex items-center space-x-2">
          <MapIcon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">TRUEdots Map</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {mockUsers.length} users nearby
        </p>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg z-[1000]">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs text-foreground">User</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-foreground">Online</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-foreground">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernMapView;
