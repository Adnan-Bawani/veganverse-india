import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories } from '@/lib/data-service';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Explore All Vegan Categories',
  description: 'Browse our ethical lifestyle catalogue across Food, Fashion, Beauty, Footwear, Home & Lifestyle.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="py-12 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs text-charcoal-muted flex items-center gap-2">
            <Link href="/" className="hover:text-forest">Home</Link>
            <span>/</span>
            <span className="text-forest font-semibold">Categories</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest">
            Product Category Directory
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            Every category strictly curated for plant-based ingredients, non-animal materials, and zero animal cruelty.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/category/${c.slug}`}
              className="group bg-white rounded-lg border border-sand hover:border-forest/50 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-sand/30">
                <Image
                  src={c.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-serif font-bold text-xl text-forest group-hover:text-forest-light transition-colors">
                    {c.name}
                  </h2>
                  {c.description && (
                    <p className="text-xs text-charcoal-muted line-clamp-2 mt-1 leading-relaxed">
                      {c.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-sand flex items-center justify-between text-xs font-semibold text-forest">
                  <span>Browse Products</span>
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

