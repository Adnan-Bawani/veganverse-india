import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-ivory to-sand/40 border-b border-sand py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-6">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/10 border border-forest/20 text-forest text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-earth" />
            <span>India&apos;s Dedicated Multi-Vendor Vegan Marketplace</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-forest tracking-tight leading-[1.15]">
            Curated Vegan Living, <br />
            <span className="text-earth italic font-normal">Thoughtfully Crafted.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed max-w-2xl">
            Discover thoughtfully selected vegan products from independent brands committed to ethical living. Every listing is audited for genuine plant-based ingredients with zero animal testing.
          </p>

          {/* Twin CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link href="/shop">
              <Button size="lg" className="gap-2 text-sm shadow-md">
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/sell">
              <Button variant="outline" size="lg" className="text-sm">
                Become a Seller
              </Button>
            </Link>
          </div>

          {/* Value Badges */}
          <div className="pt-8 border-t border-sand/60 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-charcoal-muted">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-forest flex-shrink-0" />
              <span>100% Verified Vegan Standards</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-forest flex-shrink-0" />
              <span>Direct Independent Makers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-earth flex-shrink-0" />
              <span>Cruelty-Free Pan-India Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
