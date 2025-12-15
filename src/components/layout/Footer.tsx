'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  companyName: 'RoboTech Solutions',
  tagline:
    'Revolutionizing Industries Through Advanced Robotic Intelligence and Automation Solutions',
  description:
    'Leading the future of automation with cutting-edge robotic solutions designed to transform manufacturing, logistics, and service industries.',

  // Company Links
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
  ],

  // Legal Links
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],

  // Social Media
  socialLinks: [
    { platform: 'GitHub', href: 'https://github.com', icon: 'github' },
    { platform: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
    { platform: 'Twitter', href: 'https://twitter.com', icon: 'twitter' },
  ],

  // Contact Info
  email: 'contact@robotechsolutions.com',
  phone: '+1 (555) 123-4567',
  address: '123 Innovation Drive, Tech Valley, CA 94025',

  // Copyright
  copyrightYear: '2024',
  copyrightText: 'All rights reserved.',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      navigate(href);
    }
  };

  const renderSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'github':
        return <Github className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <footer id="footer" className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-primary mb-2">
                <span data-editable="companyName">{config.companyName}</span>
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                <span data-editable="tagline">{config.tagline}</span>
              </p>
              <p className="text-sm text-muted-foreground max-w-md">
                <span data-editable="description">{config.description}</span>
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>
                <span data-editable="email">{config.email}</span>
              </div>
              <div>
                <span data-editable="phone">{config.phone}</span>
              </div>
              <div>
                <span data-editable="address">{config.address}</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {config.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`companyLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {config.legalLinks.map((link, idx) => (
                <li key={idx}>
                  <Button
                    variant="ghost"
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                    onClick={() => handleLinkClick(link.href)}
                    data-editable-href={`legalLinks[${idx}].href`}
                    data-href={link.href}
                  >
                    <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © <span data-editable="copyrightYear">{config.copyrightYear}</span>{' '}
            <span data-editable="companyName">{config.companyName}</span>.{' '}
            <span data-editable="copyrightText">{config.copyrightText}</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {config.socialLinks.map((social, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-muted-foreground hover:text-foreground hover:bg-accent"
                onClick={() => handleLinkClick(social.href)}
                data-editable-href={`socialLinks[${idx}].href`}
                data-href={social.href}
                aria-label={`Visit our ${social.platform} page`}
              >
                {renderSocialIcon(social.icon)}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
