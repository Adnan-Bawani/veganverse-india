import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProducts } from '@/lib/data-service';
import { ProductCard } from '@/components/product/ProductCard';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const cat = await getCategoryBySlug(params.slug);
  if (!cat) return { title: 'Category Not Found' };

  return {
    title: `${cat.name} — Verified Vegan Products`,
    description: cat.description || `Browse verified vegan ${cat.name} from independent Indian brands.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const { products } = await getProducts({ category: category.slug });

  return (
    <div className="py-10 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb & Title */}
        <div className="space-y-2">
          <div className="text-xs text-charcoal-muted flex items-center gap-2">
            <Link href="/" className="hover:text-forest">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-forest">Categories</Link>
            <span>/</span>
            <span className="text-forest font-semibold">{category.name}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-xs sm:text-sm text-charcoal-muted mt-1 max-w-2xl leading-relaxed">
                  {category.description}
                </p>
              )}
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-white border border-sand rounded-full text-forest">
              {products.length} Products Available
            </span>
          </div>
        </div>

        {/* Listings Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-lg border border-sand p-12 text-center space-y-3">
            <h3 className="font-serif text-xl font-bold text-forest">No listings currently in this category</h3>
            <p className="text-xs text-charcoal-muted">
              We are currently onboarding new independent founding makers in this category.
            </p>
            <Link href="/shop" className="inline-block mt-2 text-xs font-semibold text-white bg-forest px-4 py-2 rounded">
              Explore All Products
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
