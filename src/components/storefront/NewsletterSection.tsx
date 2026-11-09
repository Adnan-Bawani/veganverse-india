'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Mail, CheckCircle2 } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [consented, setConsented] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && consented) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="py-16 bg-ivory border-b border-sand">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="w-10 h-10 rounded-full bg-forest text-ivory flex items-center justify-center mx-auto">
          <Mail className="w-5 h-5 text-sand" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-earth block">
            Ethical Living Journal
          </span>
          <h2 className="font-serif text-3xl font-bold text-forest">
            Join Our Conscious Living Community
          </h2>
          <p className="text-sm text-charcoal-muted max-w-lg mx-auto">
            Receive monthly curation dispatches, spotlight profiles of founding makers, and practical guides on cruelty-free living.
          </p>
        </div>

        {isSubmitted ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md inline-flex items-center gap-2 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Thank you for subscribing! Check your inbox for our curated welcome guide.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm bg-white border border-sand rounded-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
              />
              <Button type="submit" disabled={!consented}>
                Subscribe
              </Button>
            </div>

            <label className="flex items-start gap-2 text-left text-xs text-charcoal-muted cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={consented}
                onChange={(e) => setConsented(e.target.checked)}
                className="mt-0.5 rounded border-sand text-forest focus:ring-forest"
              />
              <span>
                I consent to receive monthly email updates from VeganVerse India. I can unsubscribe anytime in accordance with the{' '}
                <a href="/policies/privacy" className="text-forest underline">Privacy Policy</a>.
              </span>
            </label>
          </form>
        )}
      </div>
    </section>
  );
}
