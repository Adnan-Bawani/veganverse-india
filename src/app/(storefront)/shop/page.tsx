import React from 'react';
import { getProducts, getCategories, getStores } from '@/lib/data-service';
import { ProductCard } from '@/components/product/ProductCard';
import Link from 'next/link';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface ShopPageProps {
  searchParams: {
    category?: string;
    brand?: string;
    veganStatus?: string;
    sort?: 'relevance' | 'newest' | 'price_asc' | 'price_desc';
    minPrice?: string;
    maxPrice?: string;
  };
}

export const metadata = {
  title: 'Curated Vegan Product Catalogue',
  description: 'Explore verified cruelty-free and 100% plant-based products from independent makers across India.',
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category, brand, veganStatus, sort, minPrice, maxPrice } = searchParams;

  const [categories, stores, { products, total }] = await Promise.all([
    getCategories(),
    getStores(),
    getProducts({
      category,
      brand,
      veganStatus,
      sort,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    }),
  ]);

  return (
    <div className="py-10 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-2">
          <div className="text-xs text-charcoal-muted flex items-center gap-2">
            <Link href="/" className="hover:text-forest">Home</Link>
            <span>/</span>
            <span className="text-forest font-semibold">Catalogue</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                All Verified Vegan Listings
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
                Showing {products.length} of {total} verified cruelty-free products
              </p>
            </div>

            {/* Sorting controls */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-charcoal-muted font-medium">Sort by:</span>
              <div className="flex items-center gap-1 bg-white border border-sand rounded p-1">
                <Link
                  href={`/shop?${new URLSearchParams({ ...searchParams, sort: 'newest' }).toString()}`}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    sort === 'newest' ? 'bg-forest text-white' : 'hover:bg-sand/60 text-charcoal'
                  }`}
                >
                  Newest
                </Link>
                <Link
                  href={`/shop?${new URLSearchParams({ ...searchParams, sort: 'price_asc' }).toString()}`}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    sort === 'price_asc' ? 'bg-forest text-white' : 'hover:bg-sand/60 text-charcoal'
                  }`}
                >
                  Price: Low to High
                </Link>
                <Link
                  href={`/shop?${new URLSearchParams({ ...searchParams, sort: 'price_desc' }).toString()}`}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    sort === 'price_desc' ? 'bg-forest text-white' : 'hover:bg-sand/60 text-charcoal'
                  }`}
                >
                  Price: High to Low
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout: Filters Sidebar + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-sand p-5 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-sand">
                <div className="flex items-center gap-2 font-serif font-bold text-base text-forest">
                  <SlidersHorizontal className="w-4 h-4 text-earth" />
                  <span>Filters</span>
                </div>
                {(category || brand || veganStatus || minPrice || maxPrice || sort) && (
                  <Link href="/shop" className="text-xs text-earth hover:underline font-semibold">
                    Reset All
                  </Link>
                )}
              </div>

              {/* Categories */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Categories
                </h4>
                <div className="space-y-1.5 text-xs">
                  <Link
                    href={`/shop?${new URLSearchParams({ ...searchParams, category: '' }).toString()}`}
                    className={`block py-1 px-2 rounded transition-colors ${
                      !category ? 'font-bold bg-sand/60 text-forest' : 'text-charcoal-muted hover:text-forest'
                    }`}
                  >
                    All Categories
                  </Link>
                  {categories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/shop?${new URLSearchParams({ ...searchParams, category: c.slug }).toString()}`}
                      className={`block py-1 px-2 rounded transition-colors ${
                        category === c.slug
                          ? 'font-bold bg-sand/60 text-forest'
                          : 'text-charcoal-muted hover:text-forest'
                      }`}
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Vegan Trust Status */}
              <div className="space-y-2.5 pt-4 border-t border-sand">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Verification Tier
                </h4>
                <div className="space-y-1.5 text-xs">
                  <Link
                    href={`/shop?${new URLSearchParams({ ...searchParams, veganStatus: '' }).toString()}`}
                    className={`block py-1 px-2 rounded transition-colors ${
                      !veganStatus ? 'font-bold bg-sand/60 text-forest' : 'text-charcoal-muted hover:text-forest'
                    }`}
                  >
                    All Tiers
                  </Link>
                  <Link
                    href={`/shop?${new URLSearchParams({ ...searchParams, veganStatus: 'third_party_certified' }).toString()}`}
                    className={`block py-1 px-2 rounded transition-colors ${
                      veganStatus === 'third_party_certified'
                        ? 'font-bold bg-sand/60 text-emerald-800'
                        : 'text-charcoal-muted hover:text-emerald-700'
                    }`}
                  >
                    3rd-Party Certified (Green)
                  </Link>
                  <Link
                    href={`/shop?${new URLSearchParams({ ...searchParams, veganStatus: 'evidence_reviewed' }).toString()}`}
                    className={`block py-1 px-2 rounded transition-colors ${
                      veganStatus === 'evidence_reviewed'
                        ? 'font-bold bg-sand/60 text-teal-800'
                        : 'text-charcoal-muted hover:text-teal-700'
                    }`}
                  >
                    Evidence Reviewed (Teal)
                  </Link>
                  <Link
                    href={`/shop?${new URLSearchParams({ ...searchParams, veganStatus: 'seller_declared' }).toString()}`}
                    className={`block py-1 px-2 rounded transition-colors ${
                      veganStatus === 'seller_declared'
                        ? 'font-bold bg-sand/60 text-amber-800'
                        : 'text-charcoal-muted hover:text-amber-700'
                    }`}
                  >
                    Seller Declared (Amber)
                  </Link>
                </div>
              </div>

              {/* Makers & Brands */}
              <div className="space-y-2.5 pt-4 border-t border-sand">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Independent Makers
                </h4>
                <div className="space-y-1.5 text-xs">
                  <Link
                    href={`/shop?${new URLSearchParams({ ...searchParams, brand: '' }).toString()}`}
                    className={`block py-1 px-2 rounded transition-colors ${
                      !brand ? 'font-bold bg-sand/60 text-forest' : 'text-charcoal-muted hover:text-forest'
                    }`}
                  >
                    All Brands
                  </Link>
                  {stores.map((s) => (
                    <Link
                      key={s.id}
                      href={`/shop?${new URLSearchParams({ ...searchParams, brand: s.slug }).toString()}`}
                      className={`block py-1 px-2 rounded transition-colors ${
                        brand === s.slug ? 'font-bold bg-sand/60 text-forest' : 'text-charcoal-muted hover:text-forest'
                      }`}
                    >
                      {s.brand_name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3 space-y-6">
            {products.length === 0 ? (
              <div className="bg-white rounded-lg border border-sand p-12 text-center space-y-4">
                <Filter className="w-10 h-10 text-charcoal-light mx-auto" />
                <h3 className="font-serif text-xl font-bold text-forest">No listings match your criteria</h3>
                <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
                  Try adjusting or clearing your filters to view other verified ethical products.
                </p>
                <Link
                  href="/shop"
                  className="inline-block mt-2 text-xs font-semibold text-white bg-forest px-4 py-2 rounded"
                >
                  Clear All Filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

