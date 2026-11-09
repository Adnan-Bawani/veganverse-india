import React from 'react';

export const metadata = {
  title: 'Seller Agreement & Code of Ethics',
  description: 'Terms and code of conduct for independent brands listing on VeganVerse India.',
};

export default function SellerAgreementPage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-lg border border-sand">
        <div className="space-y-2 border-b border-sand pb-4">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-earth">Maker Governance</span>
          <h1 className="font-serif text-3xl font-bold text-forest">Seller Agreement & Verification Protocol</h1>
          <p className="text-xs text-charcoal-muted">Last updated: February 2026</p>
        </div>

        <div className="prose prose-sm text-xs sm:text-sm text-charcoal space-y-4 leading-relaxed">
          <h2 className="font-serif font-bold text-base text-forest">1. The Vegan Standard Undertaking</h2>
          <p>
            By submitting an application or maintaining a store on VeganVerse, every seller legally covenants and warrants that:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Zero animal byproducts (dairy, whey, gelatin, carmine, honey, beeswax, silk, leather, feathers, or animal fat) are utilized in any listed formulation.</li>
            <li>No animal testing has been conducted or commissioned by the seller, its contract manufacturers, or raw ingredient suppliers.</li>
            <li>All statutory regulatory licenses (including FSSAI for consumables, CDSCO cosmetics registration where applicable) remain current.</li>
          </ul>

          <h2 className="font-serif font-bold text-base text-forest pt-2">2. Unapproved Products & Moderation</h2>
          <p>
            A product listing will never appear publicly until explicitly verified and published by a platform moderation officer. Sellers cannot approve their own listings or self-assign third-party certification tiers.
          </p>

          <h2 className="font-serif font-bold text-base text-forest pt-2">3. Immediate Suspension For Non-Compliance</h2>
          <p>
            Any confirmed misrepresentation of vegan claims or submission of fraudulent certificates results in immediate, irreversible store suspension, public unpublishing, and reporting to relevant statutory authorities.
          </p>
        </div>
      </div>
    </div>
  );
}
