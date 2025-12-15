'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Cpu, Shield, Zap, Brain, Settings } from 'lucide-react';

const DEFAULT_FEATURES = {
  sectionTitle: 'Revolutionary Robotic Capabilities',
  sectionSubtitle:
    'Discover the advanced features that make our robotic solutions industry-leading',
  features: [
    {
      id: 'ai-intelligence',
      icon: 'Brain',
      title: 'Advanced AI Intelligence',
      description:
        'Machine learning algorithms that adapt and improve performance in real-time environments',
      badge: 'AI-Powered',
    },
    {
      id: 'precision-control',
      icon: 'Settings',
      title: 'Precision Control Systems',
      description:
        'Sub-millimeter accuracy with advanced servo motors and feedback control systems',
      badge: 'Ultra-Precise',
    },
    {
      id: 'autonomous-operation',
      icon: 'Bot',
      title: 'Autonomous Operation',
      description:
        'Self-navigating robots with obstacle detection and path optimization capabilities',
      badge: 'Autonomous',
    },
    {
      id: 'real-time-processing',
      icon: 'Cpu',
      title: 'Real-Time Processing',
      description:
        'Edge computing with millisecond response times for critical industrial applications',
      badge: 'Lightning Fast',
    },
    {
      id: 'safety-protocols',
      icon: 'Shield',
      title: 'Advanced Safety Protocols',
      description: 'Multi-layered safety systems with emergency stops and collision avoidance',
      badge: 'Safety First',
    },
    {
      id: 'energy-efficient',
      icon: 'Zap',
      title: 'Energy Efficient Design',
      description:
        'Optimized power consumption with smart energy management and battery technology',
      badge: 'Eco-Friendly',
    },
  ],
} as const;

type FeaturesProps = Partial<typeof DEFAULT_FEATURES>;

export default function Features(props: FeaturesProps) {
  const config = { ...DEFAULT_FEATURES, ...props };

  const getIcon = (iconName: string) => {
    const iconMap = {
      Brain,
      Settings,
      Bot,
      Cpu,
      Shield,
      Zap,
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Bot;
    return <IconComponent className="h-8 w-8" />;
  };

  return (
    <section id="features" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span data-editable="sectionTitle">{config.sectionTitle}</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            <span data-editable="sectionSubtitle">{config.sectionSubtitle}</span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {config.features.map((feature, idx) => (
            <Card
              key={feature.id}
              className="bg-card text-card-foreground border-border hover:bg-accent/5 transition-colors duration-300 group"
            >
              <CardContent className="p-8">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="bg-primary/10 text-primary p-3 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {getIcon(feature.icon)}
                  </div>
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    <span data-editable={`features[${idx}].badge`}>{feature.badge}</span>
                  </Badge>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">
                    <span data-editable={`features[${idx}].title`}>{feature.title}</span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <span data-editable={`features[${idx}].description`}>
                      {feature.description}
                    </span>
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div className="mt-6 h-1 bg-gradient-to-r from-primary to-accent rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Accent */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-6 py-3 rounded-full">
            <Bot className="h-5 w-5" />
            <span className="text-sm font-medium">Powered by Next-Generation Robotics</span>
          </div>
        </div>
      </div>
    </section>
  );
}
