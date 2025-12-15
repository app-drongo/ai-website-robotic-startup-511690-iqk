'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Shield, Rocket, Users, BarChart3 } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FEATURES = {
  title: 'Powerful Features for Modern Teams',
  subtitle: 'Everything you need to scale your tech startup from MVP to enterprise',
  ctaText: 'Start Free Trial',
  ctaHref: '/signup',
  features: [
    {
      icon: 'Zap',
      title: 'Lightning Fast Performance',
      description:
        'Built with modern tech stack for blazing fast load times and seamless user experience',
      benefits: ['99.9% uptime', 'Sub-100ms response', 'Global CDN'],
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-grade security with end-to-end encryption and compliance certifications',
      benefits: ['SOC 2 compliant', '256-bit encryption', 'GDPR ready'],
    },
    {
      icon: 'Rocket',
      title: 'Rapid Deployment',
      description:
        'Deploy in minutes with our automated CI/CD pipeline and infrastructure management',
      benefits: ['One-click deploy', 'Auto-scaling', 'Zero downtime'],
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description:
        'Real-time collaboration tools designed for distributed teams and agile workflows',
      benefits: ['Live editing', 'Team workspaces', 'Role management'],
    },
    {
      icon: 'BarChart3',
      title: 'Advanced Analytics',
      description:
        'Deep insights with real-time metrics, custom dashboards, and predictive analytics',
      benefits: ['Real-time data', 'Custom reports', 'AI insights'],
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };
  const navigate = useSmartNavigation();

  const getIcon = (iconName: string) => {
    const icons = {
      Zap: Zap,
      Shield: Shield,
      Rocket: Rocket,
      Users: Users,
      BarChart3: BarChart3,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Zap;
    return <IconComponent className="h-8 w-8" />;
  };

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="features" className="bg-background text-foreground py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
          <Button
            size="lg"
            onClick={handleCTAClick}
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg"
          >
            <span data-editable="ctaText">{config.ctaText}</span>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-card text-card-foreground border-border hover:shadow-lg transition-all duration-300 group"
            >
              <CardContent className="p-8">
                {/* Icon */}
                <div className="bg-primary/10 text-primary rounded-lg w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(feature.icon)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-4">
                  <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  <span data-editable={`features[${idx}].description`}>{feature.description}</span>
                </p>

                {/* Benefits */}
                <div className="space-y-3">
                  {feature.benefits.map((benefit, benefitIdx) => (
                    <div key={benefitIdx} className="flex items-center gap-3">
                      <div className="bg-primary/20 text-primary rounded-full p-1">
                        <Check className="h-3 w-3" />
                      </div>
                      <span
                        className="text-sm text-muted-foreground"
                        data-editable={`features[${idx}].benefits[${benefitIdx}]`}
                      >
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-muted/50 rounded-2xl p-8 sm:p-12">
            <Badge variant="secondary" className="mb-4">
              Ready to get started?
            </Badge>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Join thousands of teams already using our platform
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start building with our comprehensive feature set today. No credit card required.
            </p>
            <Button
              size="lg"
              onClick={handleCTAClick}
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
