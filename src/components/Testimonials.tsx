
import React, { useRef } from "react";
import { Star, Heart, Users, Sparkles } from "lucide-react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  gradient: string;
  rating: number;
  avatar?: string;
}

const testimonials: TestimonialProps[] = [{
  content: "TRUEdots helped me find my soulmate! The matching algorithm is incredible - it connected me with someone who shares my values and dreams. We're getting married next month! 💕",
  author: "Sarah & Michael",
  role: "Together for 2 years",
  gradient: "from-primary/80 via-accent/60 to-primary/80",
  rating: 5,
  avatar: "S&M"
}, {
  content: "After years of disappointing dating apps, TRUEdots was a breath of fresh air. The safety features and genuine community made me feel secure while finding authentic connections.",
  author: "Jessica Martinez",
  role: "Found love in 3 months",
  gradient: "from-accent/80 via-primary/60 to-accent/80",
  rating: 5,
  avatar: "JM"
}, {
  content: "The location-based matching is perfect! I met my partner who lives just 5 minutes away. We had so much in common and the conversation flowed naturally from day one.",
  author: "David & Emma",
  role: "Engaged after 1 year",
  gradient: "from-primary/80 via-accent/60 to-primary/80",
  rating: 5,
  avatar: "D&E"
}, {
  content: "TRUEdots celebrates diversity and inclusion. As a member of the LGBTQ+ community, I felt welcomed and found my perfect match who truly understands and loves me for who I am.",
  author: "Alex Thompson",
  role: "In a loving relationship",
  gradient: "from-accent/80 via-primary/60 to-accent/80",
  rating: 5,
  avatar: "AT"
}];

const TestimonialCard = ({
  content,
  author,
  role,
  gradient,
  rating,
  avatar = "U"
}: TestimonialProps) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 h-full flex flex-col justify-between text-white transform transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] relative overflow-hidden border border-white/10 backdrop-blur-sm`}>
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 opacity-20">
        <Heart className="w-8 h-8 fill-current" />
      </div>
      <div className="absolute bottom-4 left-4 opacity-10">
        <Sparkles className="w-12 h-12" />
      </div>
      
      <div className="relative z-10">
        {/* Rating */}
        <div className="flex items-center mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        
        {/* Content */}
        <p className="text-lg mb-6 font-medium leading-relaxed">"{content}"</p>
        
        {/* Author */}
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-mono font-bold text-lg mr-4 backdrop-blur-sm border border-white/30">
            {avatar}
          </div>
        <div>
            <h4 className="font-semibold text-lg">{author}</h4>
            <p className="text-white/80 text-sm">{role}</p>
          </div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur opacity-30 -z-10"></div>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-20 bg-background relative overflow-hidden" id="testimonials" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-20 left-[10%] text-primary/10 text-6xl animate-pulse">💕</div>
        <div className="absolute bottom-20 right-[15%] text-accent/10 text-4xl animate-bounce">💖</div>
        <div className="absolute top-60 right-[70%] text-primary/10 text-8xl animate-pulse">💜</div>
      </div>
      
      <div className="section-container opacity-0 animate-on-scroll">
        <div className="text-center mb-16">
          <div className="love-chip mx-auto mb-4">
            <Heart className="w-3 h-3 mr-1 fill-current" />
            <span>Success Stories</span>
          </div>

          <h2 className="section-title mb-4">
            Real Love Stories <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              From Our Community
            </span>
          </h2>

          <p className="section-subtitle mx-auto">
            Join thousands of singles who've found their meaningful connections through TRUEdots.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="opacity-0 animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TestimonialCard 
                content={testimonial.content} 
                author={testimonial.author} 
                role={testimonial.role} 
                gradient={testimonial.gradient}
                rating={testimonial.rating}
                avatar={testimonial.avatar}
              />
            </div>
          ))}
        </div>
        
        {/* Love stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 opacity-0 animate-on-scroll">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">250K+</div>
            <div className="text-muted-foreground">Active Singles</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">15K+</div>
            <div className="text-muted-foreground">Success Stories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">2.5M+</div>
            <div className="text-muted-foreground">Meaningful Matches</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">95%</div>
            <div className="text-muted-foreground">User Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
