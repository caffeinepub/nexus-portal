import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Shield, Layers } from 'lucide-react';

const features = [
  {
    icon: '/assets/generated/feature-icon-1.dim_64x64.png',
    fallbackIcon: Zap,
    title: 'Lightning Fast',
    description: 'Experience blazing-fast performance with our optimized infrastructure built on the Internet Computer.',
    color: 'coral',
  },
  {
    icon: '/assets/generated/feature-icon-2.dim_64x64.png',
    fallbackIcon: Shield,
    title: 'Secure by Design',
    description: 'Your data is protected with enterprise-grade security and blockchain-backed authentication.',
    color: 'teal',
  },
  {
    icon: '/assets/generated/feature-icon-3.dim_64x64.png',
    fallbackIcon: Layers,
    title: 'Infinitely Scalable',
    description: 'Grow without limits. Our platform scales seamlessly as your needs expand.',
    color: 'coral',
  },
];

export default function FeatureShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Geometric Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-48 h-48 border-2 border-coral/10 rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 border-2 border-teal/10 rotate-45" />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-coral to-teal bg-clip-text text-transparent">
              Nexus Portal
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the features that make us stand out from the crowd
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const FallbackIcon = feature.fallbackIcon;
            const isHovered = hoveredIndex === index;

            return (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-300 cursor-pointer border-2 ${
                  isHovered
                    ? feature.color === 'coral'
                      ? 'border-coral shadow-lg shadow-coral/20 -translate-y-2'
                      : 'border-teal shadow-lg shadow-teal/20 -translate-y-2'
                    : 'border-border/50 hover:border-border'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isHovered ? 'opacity-5' : 'opacity-0'
                  } ${
                    feature.color === 'coral'
                      ? 'bg-gradient-to-br from-coral to-transparent'
                      : 'bg-gradient-to-br from-teal to-transparent'
                  }`}
                />

                <CardHeader className="relative">
                  <div className="mb-4">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        feature.color === 'coral'
                          ? 'bg-coral/10 border-2 border-coral/20'
                          : 'bg-teal/10 border-2 border-teal/20'
                      } ${isHovered ? 'scale-110 rotate-6' : ''}`}
                    >
                      <img
                        src={feature.icon}
                        alt={feature.title}
                        className="w-10 h-10"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <FallbackIcon
                        className={`w-10 h-10 hidden ${
                          feature.color === 'coral' ? 'text-coral' : 'text-teal'
                        }`}
                      />
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>

                {/* Geometric Corner Accent */}
                <div
                  className={`absolute bottom-0 right-0 w-24 h-24 transition-opacity duration-300 ${
                    isHovered ? 'opacity-20' : 'opacity-0'
                  }`}
                >
                  <div
                    className={`absolute bottom-0 right-0 w-full h-full ${
                      feature.color === 'coral' ? 'bg-coral' : 'bg-teal'
                    } rounded-tl-full`}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
