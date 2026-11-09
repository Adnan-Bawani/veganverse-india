import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getStoreBySlug, getProducts } from '@/lib/data-service';
import { ProductCard } from '@/components/product/ProductCard';
import { ShieldCheck, Truck, RotateCcw, Globe, Mail } from 'lucide-react';
import { Metadata } from 'next';

interface BrandStorefrontProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BrandStorefrontProps): Promise<Metadata> {
  const store = await getStoreBySlug(params.slug);
  if (!store) return { title: 'Brand Not Found' };

  return {
    title: `${store.brand_name} Storefront`,
    description: store.description || `Discover verified vegan products crafted by ${store.brand_name}.`,
  };
}

export default async function BrandStorefrontPage({ params }: BrandStorefrontProps) {
  const store = await getStoreBySlug(params.slug);

  if (!store) {
    notFound();
  }

  const { products } = await getProducts({ brand: store.slug });

  return (
    <div className="bg-ivory min-h-screen pb-16">
      {/* Brand Hero Banner */}
      <div className="relative aspect-[21/7] sm:aspect-[21/6] w-full bg-sand/50 overflow-hidden border-b border-sand">
        <Image
          src={store.banner_url || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80'}
          alt={store.brand_name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Brand Profile Header Card */}
        <div className="relative -mt-16 sm:-mt-20 bg-white rounded-lg border border-sand p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-forest/20 bg-sand/30 shadow-md flex-shrink-0">
                <Image
                  src={store.logo_url || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80'}
                  alt={store.brand_name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
                    {store.brand_name}
                  </h1>
                  <span className="p-1 rounded-full bg-emerald-100 text-emerald-800" title="Verified Independent Maker">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                </div>
                {store.tagline && (
                  <p className="text-xs sm:text-sm font-semibold text-earth italic mt-0.5">
                    {store.tagline}
                  </p>
                )}
                <p className="text-[11px] text-charcoal-light mt-1">
                  Legal Entity: {store.business_legal_name} • Registered in {store.country_of_registration}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {store.website_url && (
                <a
                  href={store.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-ivory border border-sand text-forest hover:bg-forest hover:text-white transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Website
                </a>
              )}
              <a
                href={`mailto:${store.business_email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-forest text-white hover:bg-forest-light transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact Maker
              </a>
            </div>
          </div>

          {/* Description */}
          {store.description && (
            <p className="text-sm text-charcoal/80 leading-relaxed border-t border-sand/50 pt-4">
              {store.description}
            </p>
          )}

          {/* Policies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-sand/50 text-xs text-charcoal-muted">
            <div className="flex items-start gap-2.5">
              <Truck className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-charcoal block">Dispatch & Packaging:</strong>
                <span>{store.shipping_policy || 'Dispatches within 2 business days via carbon-neutral courier.'}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <RotateCcw className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-charcoal block">Return Policy:</strong>
                <span>{store.return_policy || 'Accepts returns within 7 days for defective or damaged goods.'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Products Catalogue */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-sand pb-4">
            <h2 className="font-serif text-2xl font-bold text-forest">
              Crafted by {store.brand_name} ({products.length})
            </h2>
            <span className="text-xs text-charcoal-muted">Direct dispatch from brand workshop</span>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-lg border border-sand">
              <p className="text-sm text-charcoal-muted">No active listings currently published.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
