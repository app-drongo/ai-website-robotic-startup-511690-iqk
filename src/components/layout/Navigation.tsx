'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X, Zap, Settings, Bot, Star, Shield, Rocket } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'PurpleTech',
  brandTagline: 'Advanced Technology Solutions with Intelligent Features and Seamless Integration',
  logoIcon: 'Bot',
  navItems: [
    { label: 'Home', href: '/', id: 'home' },
    { label: 'Pricing', href: '/pricing', id: 'pricing' },
  ],
  features: [
    { icon: 'Star', title: 'AI-Powered', description: 'Advanced machine learning algorithms' },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-grade encryption & compliance',
    },
    { icon: 'Rocket', title: 'Lightning Fast', description: 'Optimized for peak performance' },
  ],
  ctaText: 'Get Started',
  ctaHref: '/contact',
  mobileMenuLabel: 'Open navigation menu',
  closeMenuLabel: 'Close navigation menu',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  const handleCTAClick = () => {
    navigate(config.ctaHref);
    setIsMobileMenuOpen(false);
  };

  const IconComponent =
    config.logoIcon === 'Bot'
      ? Bot
      : config.logoIcon === 'Zap'
        ? Zap
        : config.logoIcon === 'Settings'
          ? Settings
          : Bot;

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Star':
        return Star;
      case 'Shield':
        return Shield;
      case 'Rocket':
        return Rocket;
      default:
        return Star;
    }
  };

  return (
    <section
      id="navigation"
      className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50"
    >
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg">
              <IconComponent className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground" data-editable="brandName">
                {config.brandName}
              </span>
              <span
                className="text-xs text-muted-foreground hidden sm:block max-w-xs truncate"
                data-editable="brandTagline"
              >
                {config.brandTagline}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-6" role="menubar">
              {config.navItems.map((item, idx) => (
                <li key={item.id} role="none">
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-foreground hover:text-primary transition-colors duration-200 font-medium px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground"
                    data-editable-href={`navItems[${idx}].href`}
                    data-href={item.href}
                    role="menuitem"
                  >
                    <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <Button
              onClick={handleCTAClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-accent hover:text-accent-foreground"
                  aria-label={config.mobileMenuLabel}
                >
                  <Menu className="w-6 h-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-card text-card-foreground">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-md">
                        <IconComponent className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <span className="font-bold text-card-foreground" data-editable="brandName">
                        {config.brandName}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-card-foreground hover:bg-accent hover:text-accent-foreground"
                      aria-label={config.closeMenuLabel}
                    >
                      <X className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 py-6">
                    <nav role="navigation" aria-label="Mobile navigation">
                      <ul className="space-y-2" role="menu">
                        {config.navItems.map((item, idx) => (
                          <li key={item.id} role="none">
                            <button
                              onClick={() => handleNavClick(item.href)}
                              className="w-full text-left px-4 py-3 text-card-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors duration-200 font-medium"
                              data-editable-href={`navItems[${idx}].href`}
                              data-href={item.href}
                              role="menuitem"
                            >
                              <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    {/* Mobile Features Preview */}
                    <div className="mt-8 pt-6 border-t border-border">
                      <h3 className="text-sm font-semibold text-card-foreground mb-4">
                        Key Features
                      </h3>
                      <div className="space-y-3">
                        {config.features.map((feature, idx) => {
                          const FeatureIcon = getFeatureIcon(feature.icon);
                          return (
                            <div key={idx} className="flex items-start space-x-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary rounded-md flex-shrink-0">
                                <FeatureIcon className="w-4 h-4" aria-hidden="true" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4
                                  className="text-sm font-medium text-card-foreground"
                                  data-editable={`features[${idx}].title`}
                                >
                                  {feature.title}
                                </h4>
                                <p
                                  className="text-xs text-muted-foreground mt-1"
                                  data-editable={`features[${idx}].description`}
                                >
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Mobile CTA */}
                  <div className="pt-6 border-t border-border">
                    <Button
                      onClick={handleCTAClick}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                      data-editable-href="ctaHref"
                      data-href={config.ctaHref}
                    >
                      <span data-editable="ctaText">{config.ctaText}</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </section>
  );
}
