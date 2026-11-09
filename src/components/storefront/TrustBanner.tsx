import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileCheck, Award, ArrowRight } from 'lucide-react';

export function TrustBanner() {
  return (
    <section className="py-16 bg-forest text-ivory border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl text-center mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-earth-light block">
            Our Verification Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            How We Guarantee Authentic Vegan Products
          </h2>
          <p className="text-sand/80 text-sm leading-relaxed">
            We never rely on marketing claims. Every product published on VeganVerse is audited through our three-tier evidence verification model.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-forest-dark/40 border border-ivory/10 rounded-lg p-6 space-y-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-ivory">1. Seller Declaration</h3>
            <p className="text-xs text-sand/70 leading-relaxed">
              Brand founders legally declare their complete ingredient supply chains, ensuring 100% absence of animal bone-char, dairy, beeswax, or animal fats.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-forest-dark/40 border border-ivory/10 rounded-lg p-6 space-y-3">
            <div className="w-10 h-10 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-ivory">2. Evidence Audit</h3>
            <p className="text-xs text-sand/70 leading-relaxed">
              Our moderation board reviews laboratory certificates, supplier disclosures, and formulation data. Unapproved items are strictly blocked from public view.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-forest-dark/40 border border-ivory/10 rounded-lg p-6 space-y-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-ivory">3. Accredited Certification</h3>
            <p className="text-xs text-sand/70 leading-relaxed">
              Third-party seals (Vegan Society, PeTA, FSSAI vegan endorsement) are verified directly with issuing regulatory registries. No fake badges allowed.
            </p>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-earth-light hover:text-ivory transition-colors"
          >
            Read Our Full Verification Policy
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
