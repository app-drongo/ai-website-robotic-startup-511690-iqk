'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Star, ArrowRight } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { useState } from 'react';

const DEFAULT_PRICING = {
  title: 'Simple, Transparent Pricing',
  subtitle: 'Choose the perfect plan for your startup journey',
  billingToggle: {
    monthly: 'Monthly',
    yearly: 'Yearly',
    yearlyDiscount: 'Save 20%',
  },
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for early-stage startups',
      monthlyPrice: 29,
      yearlyPrice: 23,
      currency: '$',
      period: 'month',
      features: ['Up to 5 team members', '10GB storage', 'Basic analytics', 'Email support'],
      ctaText: 'Start Free Trial',
      ctaHref: '/signup?plan=starter',
      popular: false,
    },
    {
      name: 'Growth',
      description: 'For scaling teams and growing businesses',
      monthlyPrice: 79,
      yearlyPrice: 63,
      currency: '$',
      period: 'month',
      features: [
        'Up to 25 team members',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'API access',
        'Custom integrations',
      ],
      ctaText: 'Get Started',
      ctaHref: '/signup?plan=growth',
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      monthlyPrice: 199,
      yearlyPrice: 159,
      currency: '$',
      period: 'month',
      features: [
        'Unlimited team members',
        'Unlimited storage',
        'Custom analytics',
        '24/7 phone support',
        'Custom API limits',
        'Dedicated account manager',
        'SSO integration',
      ],
      ctaText: 'Contact Sales',
      ctaHref: '/contact?plan=enterprise',
      popular: false,
    },
  ],
  faq: {
    title: 'Frequently Asked Questions',
    items: [
      {
        question: 'Can I change plans anytime?',
        answer:
          'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
      },
      {
        question: 'Is there a free trial?',
        answer: 'We offer a 14-day free trial for all plans. No credit card required to start.',
      },
    ],
  },
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isYearly, setIsYearly] = useState(false);

  const handlePlanSelect = (href: string) => {
    navigate(href);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !isYearly
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span data-editable="billingToggle.monthly">{config.billingToggle.monthly}</span>
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                isYearly
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span data-editable="billingToggle.yearly">{config.billingToggle.yearly}</span>
              <Badge variant="secondary" className="text-xs">
                <span data-editable="billingToggle.yearlyDiscount">
                  {config.billingToggle.yearlyDiscount}
                </span>
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 mb-20">
          {config.plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`relative ${
                plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <h3 className="text-2xl font-bold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground mb-6">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">
                      <span data-editable={`plans[${idx}].currency`}>{plan.currency}</span>
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground ml-2">
                      /<span data-editable={`plans[${idx}].period`}>{plan.period}</span>
                    </span>
                  </div>
                  {isYearly && (
                    <p className="text-sm text-muted-foreground mt-1">Billed annually</p>
                  )}
                </div>

                <Button
                  onClick={() => handlePlanSelect(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                  className={
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 w-full'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full'
                  }
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardHeader>

              <CardContent>
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span data-editable={`plans[${idx}].features[${featureIdx}]`}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span data-editable="faq.title">{config.faq.title}</span>
          </h2>

          <div className="space-y-6">
            {config.faq.items.map((item, idx) => (
              <Card key={idx} className="bg-card text-card-foreground">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">
                    <span data-editable={`faq.items[${idx}].question`}>{item.question}</span>
                  </h3>
                  <p className="text-muted-foreground">
                    <span data-editable={`faq.items[${idx}].answer`}>{item.answer}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
