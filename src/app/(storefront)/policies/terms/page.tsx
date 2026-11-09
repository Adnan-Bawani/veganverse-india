import React from 'react';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions governing the use of the VeganVerse marketplace.',
};

export default function TermsPage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-lg border border-sand">
        <div className="space-y-2 border-b border-sand pb-4">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-earth">Legal Agreement</span>
          <h1 className="font-serif text-3xl font-bold text-forest">Terms of Service</h1>
          <p className="text-xs text-charcoal-muted">Last updated: February 2026</p>
        </div>

        <div className="prose prose-sm text-xs sm:text-sm text-charcoal space-y-4 leading-relaxed">
          <h2 className="font-serif font-bold text-base text-forest">1. Platform Role & Multi-Vendor Model</h2>
          <p>
            VeganVerse operates as an online marketplace intermediary under the Consumer Protection (E-Commerce) Rules, 2020. Products listed on the platform are crafted, owned, priced, and dispatched directly by independent third-party sellers. VeganVerse is not a manufacturer or direct distributor.
          </p>

          <h2 className="font-serif font-bold text-base text-forest pt-2">2. Phase 1 Pilot Scope (Enquiries Only)</h2>
          <p>
            During the Phase 1 Pilot, the website serves as a catalogue discovery and customer enquiry conduit. Real payment gateways and automated cart transactions are intentionally not active. Enquiries do not constitute a guaranteed commercial transaction until mutually confirmed between the buyer and the seller.
          </p>

          <h2 className="font-serif font-bold text-base text-forest pt-2">3. Accuracy of Vegan Claims</h2>
          <p>
            While VeganVerse audits seller declarations and raw material evidence, individual sellers are legally accountable under Indian consumer protection and food safety laws for the authentic composition and compliance of their goods.
          </p>
        </div>
      </div>
    </div>
  );
}
