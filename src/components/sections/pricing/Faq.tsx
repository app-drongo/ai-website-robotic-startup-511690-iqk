'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FAQ = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our pricing and platform',
  ctaText: 'Still have questions?',
  ctaButtonText: 'Contact Support',
  ctaHref: '/contact',
  faqs: [
    {
      question: "What's included in the free plan?",
      answer:
        'Our free plan includes up to 3 projects, 1GB storage, basic analytics, and community support. Perfect for getting started with small projects and testing our platform.',
    },
    {
      question: 'Can I upgrade or downgrade my plan anytime?',
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing adjustments on your next invoice.",
    },
    {
      question: 'Do you offer refunds?',
      answer:
        "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied within the first 30 days, contact our support team for a full refund.",
    },
    {
      question: 'Is there a setup fee?',
      answer:
        'No setup fees, ever. You only pay for your chosen plan. We believe in transparent pricing with no hidden costs or surprise charges.',
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise plans. All payments are processed securely.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Absolutely. You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of your current billing period.',
    },
  ],
} as const;

type FaqProps = Partial<typeof DEFAULT_FAQ>;

export default function Faq(props: FaqProps) {
  const config = { ...DEFAULT_FAQ, ...props };
  const navigate = useSmartNavigation();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const handleContactClick = () => {
    navigate(config.ctaHref);
  };

  return (
    <section id="faq" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-16">
          {config.faqs.map((faq, index) => {
            const isOpen = openItems.has(index);
            return (
              <Card
                key={index}
                className="bg-card border-border hover:shadow-md transition-shadow duration-200"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-inset"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-card-foreground pr-4">
                        <span data-editable={`faqs[${index}].question`}>{faq.question}</span>
                      </h3>
                      <div className="flex-shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${index}`}
                      className="px-6 pb-6 animate-in slide-in-from-top-2 duration-200"
                    >
                      <div className="pt-2 border-t border-border">
                        <p className="text-muted-foreground leading-relaxed">
                          <span data-editable={`faqs[${index}].answer`}>{faq.answer}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-muted/50 border-border">
            <CardContent className="p-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                <span data-editable="ctaText">{config.ctaText}</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help you with any questions about pricing or features.
              </p>
              <Button
                onClick={handleContactClick}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-editable-href="ctaHref"
                data-href={config.ctaHref}
              >
                <span data-editable="ctaButtonText">{config.ctaButtonText}</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
