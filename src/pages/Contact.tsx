import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission is handled by Formspree
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: <a href="mailto:triotradez@gmail.com">triotradez@gmail.com</a>,
      description: 'Get in touch for any questions or support'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: <a href="tel:+233598268790">+233 59 826 8790</a>,
      description: 'Available Monday to Friday, 9 AM - 6 PM'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: <a href="https://goo.gl/maps/123TradingStreet">Accra, Ghana</a>,
      description: 'Accra, Ghana'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon - Fri: 9 AM - 6 PM',
      description: 'Weekend support via email only'
    }
  ];

  return (
    <div className="container mx-auto px-6 py-16 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Contact <span className="text-yellow-400">Us</span>
        </h1>
        <p className="text-xl text-muted-foreground">
          Have questions about our trading courses or need support? We're here to help you 
          succeed in your trading journey.
        </p>
      </div>

      {/* Contact Info Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <div key={index} className="glass-card rounded-xl p-6 text-center">
              <div className="p-3 rounded-lg bg-yellow-500/20 w-fit mx-auto mb-4">
                <Icon className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="font-bold mb-2">{info.title}</h3>
              <p className="text-yellow-400 font-medium mb-1">{info.details}</p>
              <p className="text-sm text-muted-foreground">{info.description}</p>
            </div>
          );
        })}
      </div>

      {/* Contact Form & FAQ */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="glass-card rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
          <form 
            action="https://formspree.io/f/manjwvpz" 
            method="POST"
            className="space-y-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  name="firstName"
                  placeholder="First Name" 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  name="lastName"
                  placeholder="Last Name" 
                  required 
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                placeholder="Email" 
                required 
              />
            </div>
            
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                name="subject"
                placeholder="Subject" 
                required 
              />
            </div>
            
            <div>
              <Label htmlFor="message">Message</Label>
              <textarea 
                id="message"
                name="message"
                placeholder="Tell us more about your inquiry..."
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
              Send Message
            </Button>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="glass-card rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">How do I access the course materials?</h3>
              <p className="text-muted-foreground">Once you sign up and log in, you'll have instant access to all course materials in your personal dashboard.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Can I get a refund if I'm not satisfied?</h3>
              <p className="text-muted-foreground">Yes, we offer a 30-day money-back guarantee if you're not completely satisfied with our courses.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Do you offer 1-on-1 mentorship?</h3>
              <p className="text-muted-foreground">Yes, we offer personalized mentorship sessions. Contact us to learn more about our mentorship programs.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">How long do I have access to the courses?</h3>
              <p className="text-muted-foreground">All course purchases include lifetime access, so you can learn at your own pace and revisit materials anytime.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Are the courses suitable for beginners?</h3>
              <p className="text-muted-foreground">Absolutely! Our courses are designed for all skill levels, from complete beginners to advanced traders.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
