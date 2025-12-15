'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Shield, Rocket, Code, Globe, Users } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FEATURES = {
  title: 'Powerful Features for Modern Teams',
  subtitle: 'Everything you need to build, deploy, and scale your applications with confidence',
  ctaText: 'Explore All Features',
  ctaHref: '/features',
  features: [
    {
      icon: 'Zap',
      title: 'Lightning Fast Performance',
      description:
        'Optimized infrastructure delivers sub-100ms response times globally with intelligent caching and edge computing.',
      badge: 'Performance',
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description:
        'Bank-grade encryption, SOC 2 compliance, and advanced threat detection keep your data secure 24/7.',
      badge: 'Security',
    },
    {
      icon: 'Rocket',
      title: 'Instant Deployment',
      description:
        'Deploy from Git in seconds with automatic scaling, rollbacks, and zero-downtime deployments.',
      badge: 'DevOps',
    },
    {
      icon: 'Code',
      title: 'Developer Experience',
      description:
        'Intuitive APIs, comprehensive documentation, and powerful CLI tools that developers actually love using.',
      badge: 'DX',
    },
    {
      icon: 'Globe',
      title: 'Global Infrastructure',
      description:
        'Multi-region deployment across 15+ data centers with automatic failover and load balancing.',
      badge: 'Scale',
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description:
        'Real-time collaboration tools, role-based access control, and integrated communication workflows.',
      badge: 'Teams',
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
      Code: Code,
      Globe: Globe,
      Users: Users,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Zap;
    return <IconComponent className="h-8 w-8" />;
  };

  const handleCTAClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="features" className="bg-background text-foreground py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {config.features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-card text-card-foreground border-border hover:bg-accent/50 transition-all duration-300 group"
            >
              <CardContent className="p-8">
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    {getIcon(feature.icon)}
                  </div>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    <span data-editable={`features[${idx}].badge`}>{feature.badge}</span>
                  </Badge>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                  <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  <span data-editable={`features[${idx}].description`}>{feature.description}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={handleCTAClick}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 group"
            data-editable-href="ctaHref"
            data-href={config.ctaHref}
          >
            <span data-editable="ctaText">{config.ctaText}</span>
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
