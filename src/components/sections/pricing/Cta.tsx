'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Check, Zap, Shield, Rocket } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState } from 'react';

const DEFAULT_CTA = {
  badge: 'Limited Time Offer',
  title: 'Ready to Transform Your Business?',
  subtitle:
    'Join thousands of companies already using our platform to scale their operations and boost productivity.',
  description:
    'Start your free trial today and experience the difference. No credit card required, cancel anytime.',
  primaryCtaText: 'Start Free Trial',
  primaryCtaHref: '/signup',
  secondaryCtaText: 'Schedule Demo',
  secondaryCtaHref: '/demo',
  features: ['14-day free trial', 'No setup fees', '24/7 support included'],
  trustIndicators: [
    { icon: 'shield', text: 'Enterprise Security' },
    { icon: 'zap', text: '99.9% Uptime' },
    { icon: 'rocket', text: 'Fast Setup' },
  ],
  testimonialText: 'This platform transformed how we work. ROI was immediate.',
  testimonialAuthor: 'Sarah Chen',
  testimonialRole: 'CTO, TechCorp',
  urgencyText: 'Join 10,000+ teams already scaling with us',
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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'shield':
        return <Shield className="h-5 w-5" />;
      case 'zap':
        return <Zap className="h-5 w-5" />;
      case 'rocket':
        return <Rocket className="h-5 w-5" />;
      default:
        return <Check className="h-5 w-5" />;
    }
  };

  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-24 sm:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-3xl opacity-30" />

          <Card className="relative bg-card/80 backdrop-blur-sm border-border/50 shadow-2xl">
            <CardContent className="p-8 sm:p-12 lg:p-16">
              <div className="text-center max-w-4xl mx-auto">
                {/* Badge */}
                <Badge
                  variant="secondary"
                  className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  <span data-editable="badge">{config.badge}</span>
                </Badge>

                {/* Main heading */}
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  <span data-editable="title">{config.title}</span>
                </h2>

                {/* Subtitle */}
                <p className="text-xl sm:text-2xl text-muted-foreground mb-6 leading-relaxed">
                  <span data-editable="subtitle">{config.subtitle}</span>
                </p>

                {/* Description */}
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  <span data-editable="description">{config.description}</span>
                </p>

                {/* Features list */}
                <div className="flex flex-wrap justify-center gap-6 mb-10">
                  {config.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-foreground">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span data-editable={`features[${idx}]`} className="text-sm sm:text-base">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button
                    size="lg"
                    onClick={handlePrimaryClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
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
                    onClick={handleSecondaryClick}
                    className="border-border hover:bg-accent hover:text-accent-foreground px-8 py-6 text-lg font-semibold transition-all duration-300"
                    data-editable-href="secondaryCtaHref"
                    data-href={config.secondaryCtaHref}
                  >
                    <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                  {config.trustIndicators.map((indicator, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center gap-3 text-muted-foreground"
                    >
                      <div className="text-primary">{getIcon(indicator.icon)}</div>
                      <span
                        data-editable={`trustIndicators[${idx}].text`}
                        className="text-sm font-medium"
                      >
                        {indicator.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <Card className="bg-muted/30 border-border/50 max-w-2xl mx-auto mb-8">
                  <CardContent className="p-6">
                    <blockquote className="text-foreground font-medium mb-4">
                      "<span data-editable="testimonialText">{config.testimonialText}</span>"
                    </blockquote>
                    <div className="text-sm text-muted-foreground">
                      <span data-editable="testimonialAuthor" className="font-semibold">
                        {config.testimonialAuthor}
                      </span>
                      <span className="mx-2">•</span>
                      <span data-editable="testimonialRole">{config.testimonialRole}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Urgency text */}
                <p className="text-sm text-muted-foreground font-medium">
                  <span data-editable="urgencyText">{config.urgencyText}</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
