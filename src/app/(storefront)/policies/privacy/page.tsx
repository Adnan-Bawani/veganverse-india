import React from 'react';

export const metadata = {
  title: 'Privacy Policy & Data Protection',
  description: 'How VeganVerse India collects, stores, and protects customer and seller confidential information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-white p-8 sm:p-12 rounded-lg border border-sand">
        <div className="space-y-2 border-b border-sand pb-4">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-earth">Compliance & Security</span>
          <h1 className="font-serif text-3xl font-bold text-forest">Privacy Policy</h1>
          <p className="text-xs text-charcoal-muted">Last updated: February 2026</p>
        </div>

        <div className="prose prose-sm text-xs sm:text-sm text-charcoal space-y-4 leading-relaxed">
          <p>
            VeganVerse India (&quot;Platform&quot;, &quot;we&quot;, &quot;our&quot;) is committed to protecting your personal and confidential business information in compliance with the Digital Personal Data Protection Act (DPDP) and applicable Indian information technology regulations.
          </p>

          <h2 className="font-serif font-bold text-base text-forest pt-2">1. Information We Collect</h2>
          <p>
            - <strong>Customer Enquiries:</strong> When submitting an enquiry on a product, we collect your name, email address, optional contact number, and message. This information is shared exclusively with the respective independent seller and platform moderation staff.
          </p>
          <p>
            - <strong>Seller Onboarding:</strong> We collect legal business details, brand names, registered addresses, contact details, product declarations, and regulatory tax identifiers (PAN, GSTIN) and certificates.
          </p>

          <h2 className="font-serif font-bold text-base text-forest pt-2">2. Confidential Document Vault</h2>
          <p>
            Seller PAN cards, GSTIN certificates, and proprietary laboratory formulations are stored in encrypted private storage buckets. Public access is structurally disabled by database Row Level Security (RLS). Access is restricted solely to authorized compliance reviewers through short-lived (300-second) signed tokens.
          </p>

          <h2 className="font-serif font-bold text-base text-forest pt-2">3. Zero Selling of Data</h2>
          <p>
            We do not sell, rent, or monetize personal user information or seller commercial records with third-party advertising brokers.
          </p>

          <h2 className="font-serif font-bold text-base text-forest pt-2">4. Your Data Rights</h2>
          <p>
            You have the right to request access to, correction of, or permanent erasure of your personal details by contacting our Grievance Officer at <a href="mailto:grievance@veganverse.in" className="text-forest underline">grievance@veganverse.in</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

