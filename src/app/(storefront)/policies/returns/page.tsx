import React from 'react';

export const metadata = {
  title: 'Returns, Replacements & Disputes',
  description: 'Policy governing seller returns, cold-chain food replacements, and dispute escalations.',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-lg border border-sand">
        <div className="space-y-2 border-b border-sand pb-4">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-earth">Customer Protection</span>
          <h1 className="font-serif text-3xl font-bold text-forest">Returns & Dispute Policy</h1>
          <p className="text-xs text-charcoal-muted">Last updated: February 2026</p>
        </div>

        <div className="prose prose-sm text-xs sm:text-sm text-charcoal space-y-4 leading-relaxed">
          <h2 className="font-serif font-bold text-base text-forest">1. Seller-Specific Return Standards</h2>
          <p>
            Because VeganVerse hosts diverse makers across food, cosmetics, footwear, and bio-leather, return terms are categorized by product perishability:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Perishable Plant Foods & Fermented Cheeses:</strong> Due to hygiene and cold-chain integrity, returns are not accepted for opened foodstuffs. In the event of temperature abuse during courier transit, package leakage, or transit damage, sellers provide immediate batch replacements or refunds upon receipt of unboxing photos.
            </li>
            <li>
              <strong>Fashion, Footwear & Non-Perishable Goods:</strong> Eligible for size exchange or return within 7–14 days of receipt, provided the item is in pristine, unworn condition with original tags intact.
            </li>
          </ul>

          <h2 className="font-serif font-bold text-base text-forest pt-2">2. Dispute Escalation</h2>
          <p>
            If a customer experiences difficulty resolving an issue with an independent brand, our platform Grievance Officer will intervene to mediate and ensure compliance with statutory e-commerce consumer guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}
