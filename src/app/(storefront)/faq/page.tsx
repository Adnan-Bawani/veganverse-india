import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions on purchasing, vegan standards, seller fulfillment and enquiries.',
};

const FAQS = [
  {
    q: 'How does VeganVerse verify that products are truly 100% vegan?',
    a: 'We implement a strict 3-tier trust model. Sellers must submit legal ingredient chain declarations. For our "Evidence-Reviewed" and "3rd-Party Certified" tiers, our compliance team reviews lab tests, supplier non-animal declarations, and accredited certifying credentials (e.g. FSSAI vegan endorsements, Vegan Society certifications).',
  },
  {
    q: 'Why is there an enquiry button instead of direct checkout?',
    a: 'During our Phase 1 Pilot launch, VeganVerse operates as an authentic discovery platform. The enquiry system allows customers to connect directly with the maker to ask detailed questions about fresh batch dates, bespoke sizes, or cold-chain delivery before placing orders.',
  },
  {
    q: 'Who ships my order when I make an enquiry?',
    a: 'Each product is crafted and dispatched directly by the independent brand. This ensures maximum freshness for plant cheeses and artisan cosmetics, shipped in eco-friendly packaging without warehouse storage delays.',
  },
  {
    q: 'Are there fake reviews or sponsored ratings on VeganVerse?',
    a: 'Strictly zero. As a matter of policy, we do not fabricate star ratings, placeholder reviews, or false certification badges. Listings reflect genuine product attributes verified by our moderation team.',
  },
  {
    q: 'How can an independent ethical brand join as a seller?',
    a: 'You can apply via our online Seller Application wizard. We require your registered business details, ingredient declarations, sample product descriptions, and proof of non-animal sourcing.',
  },
];

export default function FAQPage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-earth block">
            Common Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-lg border border-sand p-6 space-y-2 shadow-sm">
              <h3 className="font-serif font-bold text-base text-forest">
                {faq.q}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-charcoal-muted">
            Still have questions? Reach out to us via our{' '}
            <Link href="/contact" className="text-forest underline font-semibold">
              Contact Desk
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

