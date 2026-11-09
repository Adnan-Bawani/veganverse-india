import React from 'react';
import Link from 'next/link';
import { getCategories } from '@/lib/data-service';
import { SellerApplicationWizard } from '@/components/seller/SellerApplicationWizard';

export const metadata = {
  title: 'Apply to Partner as a Seller',
  description: 'Submit your brand credentials and vegan product evidence to join VeganVerse India.',
};

export default async function SellerApplyPage() {
  const categories = await getCategories();

  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs text-charcoal-muted flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-forest">Home</Link>
            <span>/</span>
            <Link href="/sell" className="hover:text-forest">Sell with Us</Link>
            <span>/</span>
            <span className="text-forest font-semibold">Application</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
            Founding Seller Onboarding Application
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto leading-relaxed">
            Please provide your legal business details and product declarations. Our curation team will review your application within 2 business days.
          </p>
        </div>

        <SellerApplicationWizard categories={categories} />
      </div>
    </div>
  );
}
