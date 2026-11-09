import React from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/data-service';
import { ProductDetailView } from '@/components/product/ProductDetailView';
import { Metadata } from 'next';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.name} | ${product.seller?.brand_name || 'VeganVerse'}`,
    description: product.short_description || `Buy 100% verified vegan ${product.name} crafted in India.`,
    openGraph: {
      title: product.name,
      description: product.short_description || undefined,
      images: product.images?.[0]?.image_url ? [{ url: product.images[0].image_url }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-10 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductDetailView product={product} />
      </div>
    </div>
  );
}

