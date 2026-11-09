import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Customer Support & Grievance Redressal',
  description: 'Official customer support and statutory Grievance Officer contacts for VeganVerse India.',
};

export default function ContactPage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-earth block">
            We Are Here to Help
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
            Customer Support & Grievance Redressal
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-lg mx-auto leading-relaxed">
            Have questions regarding a product enquiry, seller application, or verification standard? Reach our team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* General Customer Support */}
          <div className="bg-white rounded-lg border border-sand p-6 space-y-4">
            <h2 className="font-serif text-lg font-bold text-forest pb-2 border-b border-sand">
              General Customer Support
            </h2>
            <div className="space-y-3 text-xs text-charcoal">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Email Desk:</strong>
                  <p className="text-charcoal-muted">support@veganverse.in</p>
                  <span className="text-[10px] text-charcoal-light">Replies typically within 24 hours</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Support Hours:</strong>
                  <p className="text-charcoal-muted">Monday – Friday: 9:30 AM – 6:30 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Registered Office:</strong>
                  <p className="text-charcoal-muted">Bengaluru, Karnataka 560001, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statutory Grievance Redressal */}
          <div className="bg-white rounded-lg border border-sand p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-sand">
              <ShieldCheck className="w-4 h-4 text-earth" />
              <h2 className="font-serif text-lg font-bold text-forest">
                Statutory Grievance Officer
              </h2>
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Designated under Rule 5(9) of the Consumer Protection (E-Commerce) Rules, 2020:
            </p>
            <div className="space-y-2 text-xs text-charcoal bg-sand/30 p-4 rounded">
              <p><strong>Officer Name:</strong> Lead Compliance & Grievance Officer</p>
              <p><strong>Designation:</strong> Head of Trust & Moderation</p>
              <p><strong>Direct Grievance Email:</strong> grievance@veganverse.in</p>
              <p><strong>Ticket Resolution SLA:</strong> Acknowledged within 48 hours; redressed within 30 days.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
