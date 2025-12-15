'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Choose Your Plan',
  subtitle: 'Scale your tech startup with the right plan for your needs',
  billingToggle: true,
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for early-stage startups',
      monthlyPrice: 29,
      yearlyPrice: 290,
      popular: false,
      features: [
        'Up to 5 team members',
        '10GB cloud storage',
        'Basic analytics',
        'Email support',
        'API access',
      ],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup/starter',
    },
    {
      name: 'Growth',
      description: 'For scaling tech companies',
      monthlyPrice: 99,
      yearlyPrice: 990,
      popular: true,
      features: [
        'Up to 25 team members',
        '100GB cloud storage',
        'Advanced analytics',
        'Priority support',
        'Full API access',
        'Custom integrations',
        'Advanced security',
      ],
      ctaText: 'Get Started',
      ctaHref: '/signup/growth',
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: 299,
      yearlyPrice: 2990,
      popular: false,
      features: [
        'Unlimited team members',
        '1TB cloud storage',
        'Real-time analytics',
        '24/7 phone support',
        'Enterprise API',
        'Custom solutions',
        'Advanced security',
        'Dedicated account manager',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact/enterprise',
    },
  ],
  features: [
    {
      icon: 'Zap',
      title: 'Lightning Fast',
      description: 'Built for performance and speed',
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-level security for your data',
    },
    {
      icon: 'Star',
      title: 'Premium Support',
      description: 'Get help when you need it most',
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(true);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="h-6 w-6" />;
      case 'Shield':
        return <Shield className="h-6 w-6" />;
      case 'Star':
        return <Star className="h-6 w-6" />;
      default:
        return <Check className="h-6 w-6" />;
    }
  };

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          {config.billingToggle && (
            <div className="flex items-center justify-center gap-4 mb-12">
              <span
                className={`text-sm ${!isYearly ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isYearly ? 'bg-primary' : 'bg-muted'
                }`}
                role="switch"
                aria-checked={isYearly}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isYearly ? 'text-foreground' : 'text-muted-foreground'}`}>
                Yearly
                <Badge variant="secondary" className="ml-2">
                  Save 20%
                </Badge>
              </span>
            </div>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 mb-20">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative ${
                plan.popular
                  ? 'border-primary bg-card text-card-foreground shadow-lg scale-105'
                  : 'bg-card text-card-foreground'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <h3 className="text-2xl font-bold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground mb-4">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span data-editable={`plans[${idx}].features[${featureIdx}]`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  size="lg"
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid gap-8 md:grid-cols-3">
          {config.features.map((feature, idx) => (
            <div key={idx} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg mb-4">
                {getIcon(feature.icon)}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                <span data-editable={`features[${idx}].title`}>{feature.title}</span>
              </h3>
              <p className="text-muted-foreground">
                <span data-editable={`features[${idx}].description`}>{feature.description}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
