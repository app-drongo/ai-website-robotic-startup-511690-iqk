'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Zap, Target, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_HERO = {
  title: "Next-Generation Robotics for Tomorrow's World",
  subtitle:
    'Empowering businesses with intelligent automation solutions that increase efficiency, reduce costs, and unlock new possibilities in manufacturing, logistics, and beyond.',
  ctaText: 'Start Your Automation Journey',
  ctaHref: '/get-started',
  secondaryCtaText: 'Watch Demo',
  secondaryCtaHref: '/demo',
  heroImageUrl:
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop',
  heroImageAlt: 'Advanced robotic arm in modern manufacturing facility',
  badgeText: 'Industry Leading Technology',
  metrics: [
    { icon: 'Zap', value: '99.9%', label: 'Uptime Reliability' },
    { icon: 'Target', value: '50%', label: 'Cost Reduction' },
    { icon: 'TrendingUp', value: '300%', label: 'Efficiency Boost' },
  ],
} as const;

type HeroProps = Partial<typeof DEFAULT_HERO>;

export default function Hero(props: HeroProps) {
  const config = { ...DEFAULT_HERO, ...props };
  const navigate = useSmartNavigation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePrimaryCTA = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryCTA = () => {
    setIsVideoPlaying(true);
    navigate(config.secondaryCtaHref);
  };

  const getMetricIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="h-5 w-5" />;
      case 'Target':
        return <Target className="h-5 w-5" />;
      case 'TrendingUp':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  return (
    <section id="hero" className="bg-background text-foreground py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Column */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="flex justify-start">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium"
              >
                <span data-editable="badgeText">{config.badgeText}</span>
              </Badge>
            </div>

            {/* Headlines */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                <span data-editable="title">{config.title}</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                <span data-editable="subtitle">{config.subtitle}</span>
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={handlePrimaryCTA}
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold group"
              >
                <span data-editable="ctaText">{config.ctaText}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSecondaryCTA}
                data-editable-href="secondaryCtaHref"
                data-href={config.secondaryCtaHref}
                className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold group"
              >
                <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
              </Button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {config.metrics.map((metric, idx) => (
                <div key={idx} className="text-center space-y-2">
                  <div className="flex justify-center text-primary">
                    {getMetricIcon(metric.icon)}
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">
                    <span data-editable={`metrics[${idx}].value`}>{metric.value}</span>
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    <span data-editable={`metrics[${idx}].label`}>{metric.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Column */}
          <div className="relative">
            <Card className="bg-card border-border overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={config.heroImageUrl}
                    alt={config.heroImageAlt}
                    data-editable-src="heroImageUrl"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      onClick={handleSecondaryCTA}
                      className="bg-primary/90 text-primary-foreground hover:bg-primary backdrop-blur-sm rounded-full h-16 w-16 p-0 shadow-lg transition-all duration-300 hover:scale-110"
                      data-editable-href="secondaryCtaHref"
                      data-href={config.secondaryCtaHref}
                    >
                      <Play className="h-6 w-6 ml-1" fill="currentColor" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating accent elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/10 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
