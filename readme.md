# TRUEdots - Meaningful Connections 🗺️💕

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-blue.svg)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-green.svg)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4.10-purple.svg)](https://vitejs.dev/)

> **TRUEdots** is a modern dating/matchmaking platform that represents every connection as a dot on a digital map. It takes at least two dots to make a meaningful connection, and for that connection to be meaningful, it must be TRUE! 💫

## 🌟 Features

### 🗺️ **Interactive Map Interface**
- **Real-time user discovery** with location-based matching
- **Beautiful user dots** on interactive OpenStreetMap
- **Click interactions** to view profiles and start connections
- **GPS integration** for accurate location-based matching
- **Zoom controls** and location centering

### 🔐 **Authentication System**
- **Email/password authentication** with Supabase
- **Multi-step signup flow** with phone verification
- **Profile completion** with photo uploads
- **Dating preferences** and interest matching
- **Secure session management**

### 💬 **Social Features**
- **User profiles** with photos and interests
- **Like system** for mutual connections
- **Chat functionality** for matched users
- **Profile verification** and online status
- **Interest-based matching**

### 🎨 **Modern UI/UX**
- **Responsive design** for all devices
- **Dark/Light theme** with system preference detection
- **Smooth animations** and transitions
- **Glassmorphism design** with backdrop blur effects
- **Accessible components** with proper ARIA labels

## 🚀 Tech Stack

### **Frontend**
- **React 18** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible UI components
- **React Router** - Client-side routing
- **React Leaflet** - Interactive maps

### **Backend**
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Relational database
- **Row Level Security** - Data protection
- **Real-time subscriptions** - Live updates
- **Authentication** - Built-in auth system

### **Development Tools**
- **Vite** - Fast build tool and dev server
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS processing
- **Git** - Version control

## 📱 Screenshots

### 🗺️ Interactive Map
![Map Interface](https://via.placeholder.com/800x400/6366f1/ffffff?text=Interactive+Map+with+User+Dots)

### 🔐 Authentication Flow
![Signup Flow](https://via.placeholder.com/800x400/10b981/ffffff?text=Multi-step+Signup+Process)

### 💻 Dashboard
![Dashboard](https://via.placeholder.com/800x400/f59e0b/ffffff?text=Modern+Dashboard+Interface)

## 🛠️ Installation

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **Quick Start**
```bash
# Clone the repository
git clone https://github.com/aalmamunsikder/truedots-new.git
cd truedots-new

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev

# Open http://localhost:5173
```

### **Environment Variables**
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🗄️ Database Setup

The project uses Supabase with the following schema:

### **Tables**
- `profiles` - User profile information
- `matches` - User connections and relationships
- `messages` - Chat messages between users

### **Features**
- **Row Level Security** for data protection
- **Real-time subscriptions** for live updates
- **Automatic profile creation** on signup
- **Location-based queries** for nearby users

## 🎯 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/            # Shadcn/ui components
│   ├── signup/        # Signup flow components
│   └── ModernMapView.tsx  # Interactive map
├── pages/             # Application pages
│   ├── dashboard/     # Dashboard components
│   └── auth/          # Authentication pages
├── contexts/          # React contexts
├── lib/               # Utility functions
├── hooks/             # Custom React hooks
└── types/             # TypeScript type definitions
```

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Manual Deployment**
```bash
# Build for production
npm run build

# Deploy dist/ folder to your hosting service
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Guidelines**
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain component reusability
- Write meaningful commit messages
- Test on multiple devices

## 📋 Roadmap

### **Phase 1: Core Features** ✅
- [x] User authentication system
- [x] Interactive map interface
- [x] Basic profile system
- [x] Location-based matching

### **Phase 2: Enhanced Matching** 🚧
- [ ] Advanced compatibility algorithm
- [ ] Interest-based filtering
- [ ] Age and location preferences
- [ ] Profile verification system

### **Phase 3: Social Features** 📅
- [ ] Real-time chat system
- [ ] Video calling integration
- [ ] Group events and activities
- [ ] Social media integration

### **Phase 4: Premium Features** 📅
- [ ] Subscription plans
- [ ] Advanced search filters
- [ ] Profile boost features
- [ ] Analytics dashboard

## 🐛 Known Issues

- **Map loading**: Occasional slow loading on first visit
- **Mobile responsiveness**: Some edge cases on very small screens
- **Browser compatibility**: Limited support for older browsers

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/aalmamunsikder/truedots-new/issues)
- **Discussions**: [GitHub Discussions](https://github.com/aalmamunsikder/truedots-new/discussions)
- **Email**: [Your Email]

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Shadcn/ui** for beautiful UI components
- **Supabase** for backend services
- **OpenStreetMap** for free map tiles
- **React Leaflet** for map functionality
- **Tailwind CSS** for utility-first styling

---

<div align="center">

**Made with ❤️ by the TRUEdots Team**

*Every connection, every entity is represented by a dot on the digital map. It takes at least two dots to make a meaningful connection, and for that connection to be meaningful, it must be TRUE!*

[🌐 Website](https://truedots.com) • [📱 App Store]() • [🤖 Google Play]()

</div>
