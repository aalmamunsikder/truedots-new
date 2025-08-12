import React, { useState } from "react";
import { 
  Crown, Star, Shield, Eye, Heart, Zap, Check, Gift, 
  TrendingUp, Users, MessageCircle, Camera, MapPin
} from "lucide-react";

const PremiumPage = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [isPremium, setIsPremium] = useState(false);

  const plans = {
    monthly: {
      price: 19.99,
      savings: null
    },
    yearly: {
      price: 199.99,
      savings: 39.89
    }
  };

  const features = [
    {
      icon: Eye,
      title: "See who likes you",
      description: "Find out who's interested in you before you match",
      premium: true
    },
    {
      icon: Heart,
      title: "Unlimited likes",
      description: "Send as many likes as you want every day",
      premium: true
    },
    {
      icon: MapPin,
      title: "Global reach",
      description: "Connect with people from anywhere in the world",
      premium: true
    },
    {
      icon: MessageCircle,
      title: "Priority messaging",
      description: "Your messages appear at the top of their inbox",
      premium: true
    },
    {
      icon: Camera,
      title: "Advanced filters",
      description: "Filter by education, job, height, and more",
      premium: true
    },
    {
      icon: Shield,
      title: "Enhanced privacy",
      description: "Control exactly who can see your profile",
      premium: true
    },
    {
      icon: Users,
      title: "See mutual friends",
      description: "Discover connections you have in common",
      premium: false
    },
    {
      icon: Zap,
      title: "Profile boost",
      description: "Get featured at the top of search results",
      premium: false
    }
  ];

  const renderPremiumTab = () => (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Crown className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">
          {isPremium ? 'You\'re Premium!' : 'Upgrade to Premium'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {isPremium 
            ? 'Enjoy all the premium features and maximize your dating success!'
            : 'Unlock powerful features to boost your dating success and find meaningful connections faster.'
          }
        </p>
      </div>

      {/* Current Status */}
      {isPremium && (
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Crown className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold text-yellow-800">Premium Active</span>
          </div>
          <p className="text-yellow-700">Your premium subscription is active until December 31, 2024</p>
        </div>
      )}

      {/* Pricing Plans */}
      {!isPremium && (
        <div className="bg-card rounded-xl border border-border p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Choose Your Plan</h2>
            <div className="flex items-center justify-center gap-4 bg-muted p-1 rounded-lg w-fit mx-auto">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedPlan === 'monthly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  selectedPlan === 'yearly'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Yearly
                {plans.yearly.savings && (
                  <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                    Save ${plans.yearly.savings}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="border border-border rounded-xl p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Free</h3>
                <div className="text-3xl font-bold text-foreground mb-1">$0</div>
                <p className="text-muted-foreground">Forever</p>
              </div>
              <ul className="space-y-3 mb-6">
                {features.filter(f => !f.premium).map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">{feature.title}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 px-4 border border-border rounded-lg text-foreground hover:bg-muted transition-colors">
                Current Plan
              </button>
            </div>

            {/* Premium Plan */}
            <div className="border-2 border-primary rounded-xl p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">Premium</h3>
                <div className="text-3xl font-bold text-foreground mb-1">
                  ${plans[selectedPlan].price}
                </div>
                <p className="text-muted-foreground">
                  per {selectedPlan === 'monthly' ? 'month' : 'year'}
                </p>
              </div>
              <ul className="space-y-3 mb-6">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-foreground">{feature.title}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Upgrade to Premium
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-card rounded-lg p-6 border border-border">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
              feature.premium ? 'bg-primary/20' : 'bg-muted'
            }`}>
              <feature.icon className={`w-6 h-6 ${
                feature.premium ? 'text-primary' : 'text-muted-foreground'
              }`} />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
            {feature.premium && (
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-yellow-600 font-medium">Premium Feature</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Success Stories */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Sarah & Mike</h3>
            <p className="text-muted-foreground text-sm">
              "Premium helped us find each other despite living in different cities. 
              The advanced filters made all the difference!"
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Emma & David</h3>
            <p className="text-muted-foreground text-sm">
              "Being able to see who liked us first gave us the confidence to make the first move. 
              Now we're engaged!"
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="border-b border-border pb-4">
            <h3 className="font-semibold text-foreground mb-2">Can I cancel my subscription anytime?</h3>
            <p className="text-muted-foreground text-sm">
              Yes, you can cancel your premium subscription at any time. You'll continue to have access to premium features until the end of your current billing period.
            </p>
          </div>
          <div className="border-b border-border pb-4">
            <h3 className="font-semibold text-foreground mb-2">Is there a free trial?</h3>
            <p className="text-muted-foreground text-sm">
              We offer a 7-day free trial for new premium subscribers. You can cancel anytime during the trial period without being charged.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground text-sm">
              We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through Stripe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return renderPremiumTab();
};

export default PremiumPage;
