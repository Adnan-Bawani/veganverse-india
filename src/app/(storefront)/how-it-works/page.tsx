import React from 'react';
import Link from 'next/link';
import { TrustBanner } from '@/components/storefront/TrustBanner';
import { HowItWorks } from '@/components/storefront/HowItWorks';
import { ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'How It Works & Vegan Verification Standards',
  description: 'Understand the multi-tier review criteria governing every listing on VeganVerse.',
};

export default function HowItWorksPage() {
  return (
    <div className="bg-ivory min-h-screen space-y-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 space-y-4 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-earth block">
          Platform Architecture & Quality Assurance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
          Our Rigorous Verification Standards
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto leading-relaxed">
          How independent makers are onboarded, how products are inspected, and how ethical consumers are protected against deceptive marketing.
        </p>
      </div>

      <HowItWorks />

      <TrustBanner />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="bg-white rounded-lg border border-sand p-6 sm:p-8 space-y-4">
          <h2 className="font-serif text-xl font-bold text-forest">
            The Rollback Guarantee: Post-Approval Modification Protection
          </h2>
          <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
            In many generic marketplaces, a seller can receive approval for an innocent product and subsequently alter the description, ingredients, or formulation to include non-vegan additives.
          </p>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Automated Rollback Safeguard:</strong> Any subsequent edit made to an approved product&apos;s title, ingredients, or description automatically reverts the product to <code className="bg-amber-100 px-1 py-0.5 rounded font-bold">under_review</code> status, immediately removing it from public search and category pages until re-audited by a human compliance officer.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/seller/apply"
            className="text-xs font-semibold uppercase tracking-wider text-forest hover:text-earth underline"
          >
            Are you an ethical producer? Apply to list your brand
          </Link>
        </div>
      </div>
    </div>
  );
}
