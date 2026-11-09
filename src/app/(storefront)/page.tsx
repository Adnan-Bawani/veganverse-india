import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories, getProducts, getStores } from '@/lib/data-service';
import { HeroSection } from '@/components/storefront/HeroSection';
import { CategoryGrid } from '@/components/storefront/CategoryGrid';
import { TrustBanner } from '@/components/storefront/TrustBanner';
import { HowItWorks } from '@/components/storefront/HowItWorks';
import { NewsletterSection } from '@/components/storefront/NewsletterSection';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowUpRight, Sparkles, Store } from 'lucide-react';

export default async function HomePage() {
  const [categories, { products }, stores] = await Promise.all([
    getCategories(),
    getProducts(),
    getStores(),
  ]);

  const featuredProducts = products.slice(0, 4);
  const featuredStores = stores.slice(0, 3);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Categories Grid */}
      <CategoryGrid categories={categories} />

      {/* 3. Featured Vegan Products */}
      <section className="py-16 bg-ivory border-b border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-earth" />
                <span className="text-xs font-semibold uppercase tracking-widest text-earth">
                  Curated Selections
                </span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-forest">
                Featured Ethical Discoveries
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-wider text-forest hover:text-earth inline-flex items-center gap-1 transition-colors"
            >
              Explore Full Catalogue ({products.length} Items)
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Independent Makers & Brands Spotlight */}
      <section className="py-16 bg-white border-b border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Store className="w-4 h-4 text-earth" />
                <span className="text-xs font-semibold uppercase tracking-widest text-earth">
                  Meet The Makers
                </span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-forest">
                Founding Independent Brands
              </h2>
            </div>
            <Link
              href="/brands"
              className="text-xs font-semibold uppercase tracking-wider text-forest hover:text-earth inline-flex items-center gap-1 transition-colors"
            >
              View All Brands
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredStores.map((s) => (
              <Link
                key={s.id}
                href={`/brand/${s.slug}`}
                className="group p-6 rounded-lg bg-ivory/60 border border-sand hover:border-forest/50 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-sand border border-sand flex-shrink-0">
                      <Image
                        src={s.logo_url || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80'}
                        alt={s.brand_name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-forest group-hover:text-forest-light transition-colors">
                        {s.brand_name}
                      </h3>
                      <span className="text-[11px] text-earth font-medium">Verified Independent Maker</span>
                    </div>
                  </div>
                  <p className="text-xs text-charcoal-muted line-clamp-3 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-sand flex items-center justify-between text-xs font-semibold text-forest">
                  <span>Visit Storefront</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Trust & Verification Banner */}
      <TrustBanner />

      {/* 6. How it Works */}
      <HowItWorks />

      {/* 7. Newsletter Section */}
      <NewsletterSection />
    </div>
  );
}
