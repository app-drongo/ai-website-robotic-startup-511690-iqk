'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Shield, Rocket, Star, Users, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: 'Build the Future with AI-Powered Solutions',
  subtitle:
    "Transform your startup with cutting-edge technology that scales. From MVP to unicorn, we've got the tools you need.",
  ctaText: 'Start Building',
  ctaHref: '/get-started',
  secondaryCtaText: 'View Demo',
  secondaryCtaHref: '/demo',
  heroImageUrl:
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&crop=center',
  heroImageAlt: 'Futuristic tech dashboard visualization',
  features: [
    { icon: 'Zap', title: 'Lightning Fast', description: 'Deploy in minutes, not months' },
    { icon: 'Shield', title: 'Enterprise Security', description: 'Bank-grade encryption built-in' },
    { icon: 'Rocket', title: 'Auto-Scale', description: 'Grows with your success' },
  ],
  stats: [
    { value: '10k+', label: 'Startups Launched' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '500ms', label: 'Average Response' },
  ],
  trustBadge: 'Trusted by 500+ startups worldwide',
  rating: '4.9',
  ratingCount: '2,847',
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handlePrimaryClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getIcon = (iconName: string) => {
    const icons = { Zap, Shield, Rocket };
    const IconComponent = icons[iconName as keyof typeof icons] || Zap;
    return <IconComponent className="h-6 w-6" />;
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badge */}
        <div className="text-center mb-8">
          <Badge variant="secondary" className="bg-accent text-accent-foreground px-4 py-2">
            <Users className="h-4 w-4 mr-2" />
            <span data-editable="trustBadge">{config.trustBadge}</span>
          </Badge>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span data-editable="title">{config.title}</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span data-editable="rating">{config.rating}</span> from{' '}
                <span data-editable="ratingCount">{config.ratingCount}</span> reviews
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryClick}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 group"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryClick}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {config.stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">
                    <span data-editable={`stats[${idx}].value`}>{stat.value}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span data-editable={`stats[${idx}].label`}>{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image & Features */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-2xl blur-3xl transform rotate-6"></div>
              <Card className="relative bg-card text-card-foreground border-border shadow-2xl">
                <CardContent className="p-0">
                  <Image
                    src={config.heroImageUrl}
                    alt={config.heroImageAlt}
                    data-editable-src="heroImageUrl"
                    width={800}
                    height={600}
                    className="w-full h-auto rounded-lg object-cover"
                    priority
                  />
                </CardContent>
              </Card>
            </div>

            {/* Feature Cards */}
            <div className="grid gap-4">
              {config.features.map((feature, idx) => (
                <Card
                  key={idx}
                  className="bg-card text-card-foreground border-border hover:bg-accent/50 transition-all duration-300 group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        {getIcon(feature.icon)}
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">
                          <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                        </h3>
                        <p className="text-muted-foreground">
                          <span data-editable={`features[${idx}].description`}>
                            {feature.description}
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>Join the fastest-growing tech ecosystem</span>
          </div>
        </div>
      </div>
    </section>
  );
}
