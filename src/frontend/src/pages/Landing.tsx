import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Layers } from 'lucide-react';
import FeatureShowcase from '@/components/FeatureShowcase';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/assets/generated/hero-bg.dim_1920x1080.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/95" />
        </div>

        {/* Geometric Shapes */}
        <div className="absolute top-20 right-10 w-64 h-64 bg-coral/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-teal/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border-4 border-coral/20 rotate-45 geometric-shape" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border-4 border-teal/20 rounded-full geometric-shape" />

        {/* Content */}
        <div className="container relative z-10 py-24 md:py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-coral/10 text-coral text-sm font-medium border border-coral/20">
                  ✨ Something New & Fresh
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Welcome to the{' '}
                <span className="bg-gradient-to-r from-coral via-teal to-coral bg-clip-text text-transparent animate-gradient">
                  Future
                </span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-xl">
                Experience a revolutionary platform that combines cutting-edge design with powerful functionality.
                Built for creators, innovators, and dreamers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate({ to: '/content' })}
                  className="bg-gradient-to-r from-coral to-teal hover:opacity-90 transition-opacity text-lg px-8"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 border-2">
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-coral">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold text-teal">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-coral to-teal bg-clip-text text-transparent">
                    #1
                  </div>
                  <div className="text-sm text-muted-foreground">Platform</div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-coral/20 to-teal/20 rounded-3xl rotate-6 blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-tr from-teal/20 to-coral/20 rounded-3xl -rotate-6 blur-xl" />
                <div className="relative bg-card border border-border/50 rounded-3xl p-8 backdrop-blur-sm shadow-2xl">
                  <div className="space-y-6">
                    <div className="h-12 bg-gradient-to-r from-coral to-teal rounded-lg" />
                    <div className="space-y-3">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-coral/10 rounded-lg border border-coral/20" />
                      <div className="h-24 bg-teal/10 rounded-lg border border-teal/20" />
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-muted rounded w-2/3" />
                      <div className="h-4 bg-muted rounded w-4/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <FeatureShowcase />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-coral/5 via-background to-teal/5 relative overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-5" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to{' '}
              <span className="bg-gradient-to-r from-coral to-teal bg-clip-text text-transparent">
                Transform
              </span>{' '}
              Your Workflow?
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of users who have already discovered the power of Nexus Portal.
            </p>
            <Button
              size="lg"
              onClick={() => navigate({ to: '/content' })}
              className="bg-gradient-to-r from-coral to-teal hover:opacity-90 transition-opacity text-lg px-12"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
