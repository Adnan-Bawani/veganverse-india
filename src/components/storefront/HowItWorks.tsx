import React from 'react';
import { Search, MessageSquare, Truck } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: '1. Discover Verified Makers',
      description: 'Explore independent Indian brands crafting plant-based foods, bio-materials, and clean beauty products.',
    },
    {
      icon: MessageSquare,
      title: '2. Enquire & Consult',
      description: 'Connect directly with brand founders to confirm custom ingredients, bulk orders, or seasonal availability.',
    },
    {
      icon: Truck,
      title: '3. Direct Maker Fulfilment',
      description: 'Orders are freshly made and dispatched directly by the independent brand under plastic-free packaging.',
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-earth block">
            Simple & Transparent
          </span>
          <h2 className="font-serif text-3xl font-bold text-forest">How the Marketplace Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="p-6 rounded-lg bg-ivory/50 border border-sand space-y-3">
                <div className="w-12 h-12 rounded-full bg-forest text-ivory flex items-center justify-center mx-auto">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-lg text-forest">{s.title}</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

