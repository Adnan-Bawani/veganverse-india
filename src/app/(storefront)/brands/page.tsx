import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStores } from '@/lib/data-service';
import { Store, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Verified Independent Vegan Brands & Makers',
  description: 'Discover independent cruelty-free creators across India.',
};

export default async function BrandsPage() {
  const stores = await getStores();

  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs text-charcoal-muted flex items-center gap-2">
            <Link href="/" className="hover:text-forest">Home</Link>
            <span>/</span>
            <span className="text-forest font-semibold">Brands</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
            Independent Vegan Makers & Brands
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Support authentic Indian businesses dedicated to 100% plant-based craft and ethical manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((s) => (
            <Link
              key={s.id}
              href={`/brand/${s.slug}`}
              className="group bg-white rounded-lg border border-sand hover:border-forest/50 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Brand Banner */}
              <div className="relative aspect-[16/7] w-full overflow-hidden bg-sand/40">
                <Image
                  src={s.banner_url || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'}
                  alt={s.brand_name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Brand Info */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-sand bg-sand/30 flex-shrink-0 -mt-10 ring-4 ring-white shadow-sm">
                      <Image
                        src={s.logo_url || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80'}
                        alt={s.brand_name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-serif font-bold text-lg text-forest group-hover:text-forest-light transition-colors">
                        {s.brand_name}
                      </h2>
                      <div className="flex items-center gap-1 text-[11px] text-earth font-medium">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verified Independent Maker</span>
                      </div>
                    </div>
                  </div>

                  {s.tagline && (
                    <p className="text-xs font-semibold text-charcoal italic">{s.tagline}</p>
                  )}

                  {s.description && (
                    <p className="text-xs text-charcoal-muted line-clamp-3 leading-relaxed">
                      {s.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-sand flex items-center justify-between text-xs font-semibold text-forest">
                  <span>Explore Brand Storefront</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
