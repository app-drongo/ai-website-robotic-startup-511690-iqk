'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Shield, Rocket } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState } from 'react';

const DEFAULT_CTA = {
  title: 'Ready to Transform Your Tech Stack?',
  subtitle: "Join thousands of developers who've already upgraded their workflow",
  description:
    'Get started with our cutting-edge platform and experience the future of development today.',
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'View Pricing',
  secondaryCtaHref: '/pricing',
  features: ['Deploy in seconds', '99.9% uptime guarantee', '24/7 expert support'],
  featureIcons: ['Rocket', 'Shield', 'Zap'],
  badge: 'Limited Time',
  badgeText: '50% off first 3 months',
  testimonial: 'This platform revolutionized our development process. We ship 10x faster now.',
  testimonialAuthor: 'Sarah Chen',
  testimonialRole: 'CTO at TechFlow',
} as const;

type CtaProps = Partial<typeof DEFAULT_CTA>;

export default function Cta(props: CtaProps) {
  const config = { ...DEFAULT_CTA, ...props };
  const navigate = useSmartNavigation();
  const [isHovered, setIsHovered] = useState(false);

  const handlePrimaryClick = () => {
    navigate(config.primaryCtaHref);
  };

  const handleSecondaryClick = () => {
    navigate(config.secondaryCtaHref);
  };

  const getFeatureIcon = (iconName: string, index: number) => {
    const iconProps = { className: 'h-5 w-5 text-primary' };
    switch (iconName) {
      case 'Rocket':
        return <Rocket key={index} {...iconProps} />;
      case 'Shield':
        return <Shield key={index} {...iconProps} />;
      case 'Zap':
        return <Zap key={index} {...iconProps} />;
      default:
        return <Zap key={index} {...iconProps} />;
    }
  };

  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-background via-accent/5 to-primary/5 py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="mb-8">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20 px-4 py-2"
          >
            <span data-editable="badge">{config.badge}</span>
            <span className="mx-2">•</span>
            <span data-editable="badgeText">{config.badgeText}</span>
          </Badge>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span data-editable="title">{config.title}</span>
          </h2>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="description">{config.description}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {config.features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card/50 border border-border/50"
            >
              {getFeatureIcon(config.featureIcons[idx] || 'Zap', idx)}
              <span className="text-card-foreground font-medium" data-editable={`features[${idx}]`}>
                {feature}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            onClick={handlePrimaryClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-editable-href="primaryCtaHref"
            data-href={config.primaryCtaHref}
          >
            <span data-editable="primaryCtaText">{config.primaryCtaText}</span>
            <ArrowRight
              className={`ml-2 h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
            />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-border text-foreground hover:bg-accent hover:text-accent-foreground px-8 py-4 text-lg font-semibold"
            onClick={handleSecondaryClick}
            data-editable-href="secondaryCtaHref"
            data-href={config.secondaryCtaHref}
          >
            <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
          </Button>
        </div>

        {/* Testimonial */}
        <Card className="max-w-2xl mx-auto bg-card/50 border-border/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <blockquote className="text-lg italic text-card-foreground mb-4">
              "<span data-editable="testimonial">{config.testimonial}</span>"
            </blockquote>
            <div className="flex items-center justify-center gap-2">
              <div className="text-center">
                <div className="font-semibold text-card-foreground">
                  <span data-editable="testimonialAuthor">{config.testimonialAuthor}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <span data-editable="testimonialRole">{config.testimonialRole}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
