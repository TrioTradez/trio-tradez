import React from 'react';
import { Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const navigationLinks = [{
    label: 'Home',
    path: '/'
  }, {
    label: 'About',
    path: '/about'
  }, {
    label: 'Services',
    path: '/services'
  }, {
    label: 'Blog',
    path: '/blog'
  }, {
    label: 'Contact',
    path: '/contact'
  }];
  const socialLinks = [{
    icon: Twitter,
    href: 'https://x.com/triotradez?s=21',
    label: 'X'
  }, {
    icon: Instagram,
    href: 'https://www.instagram.com/trio_tradez?igsh=dGh4ZWp0anVsMGh0&utm_source=qr',
    label: 'Instagram'
  }];
  return <footer className="bg-card/80 backdrop-blur-sm border-t border-border mt-16">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">TrioTradez Academy</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering traders worldwide with proven strategies, comprehensive education, 
              and personalized mentorship to achieve consistent profitability in the markets.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return <a key={index} href={social.href} className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors" aria-label={social.label}>
                    <Icon className="w-5 h-5" />
                  </a>;
            })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigationLinks.map(link => <li key={link.path}>
                  <button onClick={() => navigate(link.path)} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </button>
                </li>)}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span className="text-sm"><a href="mailto:">triotradez@gmail.com</a></span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span className="text-sm"><a href="tel:+233598268790">+233 (59) 826-8790</a></span> 
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Accra, Ghana</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 TrioTradez. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="https://drive.google.com/file/d/1V3W_n5-iaedVuQMvHyozmn92KU1XrOlx/view?usp=drive_link" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="https://drive.google.com/file/d/1ft7KsebX-r1a9FlKtTe_tQEfh7mGncN8/view?usp=drive_link" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>;
};