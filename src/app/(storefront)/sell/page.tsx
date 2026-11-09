import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { 
  Store, 
  ShieldCheck, 
  TrendingUp, 
  Truck, 
  ArrowRight, 
  FileCheck2, 
  CheckCircle2 
} from 'lucide-react';

export const metadata = {
  title: 'Sell with VeganVerse India — Partner as a Founding Brand',
  description: 'Join India\'s premier curated marketplace for ethical, cruelty-free and 100% plant-based makers.',
};

export default function SellPage() {
  return (
    <div className="bg-ivory min-h-screen">
      {/* Hero Banner */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-forest to-forest-dark text-ivory">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-light border border-ivory/20 text-xs font-semibold text-sand">
            <Store className="w-3.5 h-3.5 text-earth-light" />
            <span>Founding Seller Pilot Program</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Connect Directly With Discerning Ethical Consumers Across India
          </h1>

          <p className="text-base sm:text-lg text-sand/80 max-w-2xl mx-auto leading-relaxed">
            VeganVerse provides independent ethical producers with an authoritative, curated storefront. You maintain 100% ownership of your pricing and fulfillment.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link href="/seller/apply">
              <Button size="lg" className="bg-earth hover:bg-earth-light text-white shadow-lg gap-2 text-sm font-semibold">
                Apply as a Founding Seller
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-earth block">
            Why Partner With Us
          </span>
          <h2 className="font-serif text-3xl font-bold text-forest">
            Built Exclusively For True Ethical Brands
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg border border-sand p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-forest text-ivory flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-forest">Trust & Zero Greenwashing</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Every seller is verified. Customers visit VeganVerse because they know that animal byproducts and false claims are strictly prohibited.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-sand p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-forest text-ivory flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-forest">Direct Brand Fulfilment</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Retain total control over your batch production and packaging. Ship directly from your workshop without expensive intermediary warehouses.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-sand p-6 space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-forest text-ivory flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-lg text-forest">Zero Upfront Listing Fees</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              No mandatory setup fees for founding pilot brands. Receive qualified customer enquiries and build direct buyer relationships.
            </p>
          </div>
        </div>
      </section>

      {/* Onboarding Requirements */}
      <section className="py-16 bg-white border-y border-sand">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
              What We Look For in Founding Sellers
            </h2>
            <p className="text-xs text-charcoal-muted">
              We uphold strict curation standards to protect consumer trust.
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-charcoal">
            <div className="flex items-start gap-3 p-3.5 rounded bg-ivory/60 border border-sand">
              <CheckCircle2 className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
              <span><strong>100% Animal-Free Formulations:</strong> Zero dairy, honey, beeswax, carmine, gelatin, bone-char, or animal leather.</span>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded bg-ivory/60 border border-sand">
              <CheckCircle2 className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
              <span><strong>Documented Cruelty-Free Status:</strong> Formal confirmation that neither raw materials nor finished formulations undergo animal testing.</span>
            </div>
            <div className="flex items-start gap-3 p-3.5 rounded bg-ivory/60 border border-sand">
              <CheckCircle2 className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
              <span><strong>Statutory Compliance in India:</strong> Valid business registration, FSSAI licenses for food products, and reliable pan-India dispatch.</span>
            </div>
          </div>

          <div className="pt-4">
            <Link href="/seller/apply">
              <Button size="lg" className="w-full sm:w-auto">
                Begin Seller Application
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
