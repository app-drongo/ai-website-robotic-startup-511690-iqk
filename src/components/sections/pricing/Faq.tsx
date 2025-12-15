'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, MessageCircle, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FAQ = {
  title: 'Frequently Asked Questions',
  subtitle: 'Everything you need to know about our pricing and plans',
  faqs: [
    {
      question: "What's included in the free plan?",
      answer:
        'Our free plan includes up to 3 projects, 5GB storage, basic analytics, and community support. Perfect for getting started with your tech projects.',
    },
    {
      question: 'Can I upgrade or downgrade my plan anytime?',
      answer:
        'Yes! You can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle. No hidden fees or penalties.',
    },
    {
      question: 'Do you offer refunds?',
      answer:
        "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund within 30 days of purchase.",
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise plans. All payments are processed securely.',
    },
    {
      question: 'Is there a setup fee?',
      answer:
        'No setup fees ever! You only pay the monthly or annual subscription fee. We believe in transparent pricing with no hidden costs or surprise charges.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Absolutely. You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of your current billing period.',
    },
  ],
  contactTitle: 'Still have questions?',
  contactDescription: 'Our support team is here to help you find the perfect plan for your needs.',
  contactButtonText: 'Contact Support',
  contactButtonHref: '/contact',
} as const;

type FaqProps = Partial<typeof DEFAULT_FAQ>;

export default function Faq(props: FaqProps) {
  const config = { ...DEFAULT_FAQ, ...props };
  const navigate = useSmartNavigation();
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]));
  };

  const handleContactClick = () => {
    navigate(config.contactButtonHref);
  };

  return (
    <section id="faq" className="bg-background text-foreground py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12 lg:mb-16">
          {config.faqs.map((faq, index) => {
            const isOpen = openItems.includes(index);
            return (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full text-left p-6 hover:bg-accent/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
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
                      <div className="border-t border-border pt-4">
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

        {/* Contact Section */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8 sm:p-10">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-6">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">
                <span data-editable="contactTitle">{config.contactTitle}</span>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                <span data-editable="contactDescription">{config.contactDescription}</span>
              </p>
              <Button
                onClick={handleContactClick}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3"
                data-editable-href="contactButtonHref"
                data-href={config.contactButtonHref}
              >
                <span data-editable="contactButtonText">{config.contactButtonText}</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
