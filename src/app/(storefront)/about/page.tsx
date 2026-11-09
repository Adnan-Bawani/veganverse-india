import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Leaf, HeartHandshake, Award } from 'lucide-react';

export const metadata = {
  title: 'About Our Mission & Ethics',
  description: 'Learn about VeganVerse India—connecting conscious consumers with verified independent vegan makers.',
};

export default function AboutPage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-earth block">
            Our Purpose & Ethos
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest leading-tight">
            Building India&apos;s Most Trusted Ethical Marketplace
          </h1>
          <p className="text-sm sm:text-base text-charcoal/80 max-w-2xl mx-auto leading-relaxed">
            We believe that adopting a plant-based, cruelty-free lifestyle should not require hours of deciphering deceptive ingredient labels or second-guessing brand claims.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-sand p-8 sm:p-10 space-y-6 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-forest">The Marketplace Model</h2>
          <p className="text-sm text-charcoal leading-relaxed">
            VeganVerse is not a single-brand warehouse. We are an authentic multi-vendor platform dedicated to empowering independent Indian makers—from artisanal cashew cheesemakers in Bengaluru to coconut bio-leather craftsmen in Kerala.
          </p>
          <p className="text-sm text-charcoal leading-relaxed">
            Sellers formulate, batch-produce, and fulfill their orders directly. VeganVerse acts as the uncompromising curator, trust guarantor, and customer discovery gateway.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-sand">
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-forest text-base">
                <Leaf className="w-5 h-5 text-earth" />
                <span>Zero Animal Byproducts</span>
              </div>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                We strictly disallow hidden animal components such as bone-char refined sugars, dairy whey, carmine insect dyes, or animal leather.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-forest text-base">
                <ShieldCheck className="w-5 h-5 text-earth" />
                <span>Audited Supply Chains</span>
              </div>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Before any product goes live on our catalogue, our moderation officers review supplier affidavits and lab records.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-block bg-forest hover:bg-forest-light text-white font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded transition-colors"
          >
            Explore The Verified Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}
