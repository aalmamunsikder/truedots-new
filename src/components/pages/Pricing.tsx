import React, { useRef } from "react";
import { Check, Heart, Crown, Sparkles } from "lucide-react";

interface PricingTierProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  gradient: string;
  icon: React.ReactNode;
}

const pricingTiers: PricingTierProps[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Start your journey to find meaningful connections",
    features: [
      "Create detailed profile",
      "Browse profiles nearby",
      "5 likes per day",
      "Basic matching algorithm",
      "Standard messaging",
      "Photo verification"
    ],
    gradient: "from-muted/50 to-muted/30",
    icon: <Heart className="w-6 h-6" />
  },
  {
    name: "Premium",
    price: "$19.99",
    period: "per month",
    description: "Unlock advanced features to accelerate your love journey",
    features: [
      "Everything in Free",
      "Unlimited likes",
      "Advanced search filters",
      "See who liked you",
      "Priority in matching",
      "Read receipts",
      "Video calls",
      "Premium visibility boost"
    ],
    isPopular: true,
    gradient: "from-primary/80 to-accent/60",
    icon: <Crown className="w-6 h-6" />
  },
  {
    name: "Elite",
    price: "$39.99",
    period: "per month",
    description: "The ultimate dating experience for serious relationships",
    features: [
      "Everything in Premium",
      "Personal matchmaker",
      "Background verification",
      "Exclusive events access",
      "Priority customer support",
      "Advanced compatibility insights",
      "Relationship coaching",
      "VIP profile badge"
    ],
    gradient: "from-accent/80 to-primary/60",
    icon: <Sparkles className="w-6 h-6" />
  }
];

const PricingCard = ({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  isPopular = false, 
  gradient,
  icon 
}: PricingTierProps) => {
  return (
    <div className={`relative rounded-2xl p-6 h-full flex flex-col ${isPopular ? 'border-2 border-primary' : 'border border-border'} bg-card backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
            Most Popular 💕
          </div>
        </div>
      )}
      
      <div className="text-center mb-6">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-foreground mb-1">{price}</div>
        <div className="text-muted-foreground text-sm">{period}</div>
      </div>
      
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
        isPopular 
          ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl' 
          : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border hover:border-primary'
      }`}>
        {name === 'Free' ? 'Get Started Free' : 'Choose Plan'}
      </button>
      
      {/* Hover glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-accent/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
    </div>
  );
};

const Pricing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-background relative overflow-hidden" id="pricing" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-[5%] text-primary/8 text-6xl animate-pulse">💕</div>
        <div className="absolute bottom-20 right-[10%] text-accent/8 text-4xl animate-bounce">💖</div>
        <div className="absolute top-60 right-[70%] text-primary/5 text-8xl animate-pulse">💜</div>
      </div>
      
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="text-center mb-16">
          <div className="love-chip mx-auto mb-4">
            <Crown className="w-3 h-3 mr-1" />
            <span>Pricing</span>
          </div>
          
          <h2 className="section-title mb-4">
            Choose Your <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Love Journey
            </span>
          </h2>
          
          <p className="section-subtitle mx-auto">
            Find the perfect plan to discover your meaningful connection. Start free and upgrade anytime.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className="opacity-0 animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PricingCard {...tier} />
            </div>
          ))}
        </div>
        
        {/* Bottom note */}
        <div className="text-center mt-12 opacity-0 animate-on-scroll">
          <p className="text-muted-foreground text-sm">
            💕 All plans include our safety guarantee and 24/7 support
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            Cancel anytime. No hidden fees. Your privacy is our priority.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
