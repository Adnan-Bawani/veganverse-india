import React from 'react';
import Link from 'next/link';
import { getProducts } from '@/lib/data-service';
import { ProductCard } from '@/components/product/ProductCard';
import { Search } from 'lucide-react';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export const metadata = {
  title: 'Search Vegan Products',
  description: 'Search across 100% cruelty-free, animal-free listings in India.',
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const { products } = await getProducts({ query });

  return (
    <div className="py-10 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <div className="text-xs text-charcoal-muted flex items-center gap-2">
            <Link href="/" className="hover:text-forest">Home</Link>
            <span>/</span>
            <span className="text-forest font-semibold">Search Results</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-sand pb-4">
            <h1 className="font-serif text-3xl font-bold text-forest">
              {query ? `Search results for "${query}"` : 'All Products'}
            </h1>
            <span className="text-xs text-charcoal-muted">
              {products.length} {products.length === 1 ? 'item found' : 'items found'}
            </span>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-lg border border-sand p-12 text-center space-y-4">
            <Search className="w-10 h-10 text-charcoal-light mx-auto" />
            <h3 className="font-serif text-xl font-bold text-forest">No matching products found</h3>
            <p className="text-xs text-charcoal-muted max-w-sm mx-auto">
              We couldn&apos;t find any listings matching &quot;{query}&quot;. Try searching for &quot;cashew&quot;, &quot;elixir&quot;, &quot;leather&quot;, or &quot;sneakers&quot;.
            </p>
            <Link
              href="/shop"
              className="inline-block mt-2 text-xs font-semibold text-white bg-forest px-4 py-2 rounded"
            >
              View Entire Catalogue
            </Link>
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
  );
}
