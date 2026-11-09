import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { VeganBadge } from '@/components/ui/Badge';
import { MessageSquare } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onEnquireClick?: (product: Product) => void;
}

export function ProductCard({ product, onEnquireClick }: ProductCardProps) {
  const primaryImage = product.images?.[0]?.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="group bg-white rounded-lg border border-sand hover:border-forest/40 hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden">
      {/* Product Image Frame */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square overflow-hidden bg-sand/30 block">
        <Image
          src={primaryImage}
          alt={product.images?.[0]?.alt_text || product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2.5 left-2.5">
          <VeganBadge status={product.vegan_status} />
        </div>
      </Link>

      {/* Card Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand Attribution */}
          {product.seller && (
            <Link
              href={`/brand/${product.seller.slug}`}
              className="text-[11px] font-semibold uppercase tracking-wider text-earth hover:text-earth-dark transition-colors block mb-1"
            >
              {product.seller.brand_name}
            </Link>
          )}

          {/* Product Title */}
          <h3 className="font-serif font-bold text-base text-forest group-hover:text-forest-light transition-colors line-clamp-1">
            <Link href={`/product/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Short description */}
          {product.short_description && (
            <p className="text-xs text-charcoal-muted line-clamp-2 mt-1 leading-relaxed">
              {product.short_description}
            </p>
          )}
        </div>

        {/* Price & Action */}
        <div className="pt-2 border-t border-sand/50 flex items-center justify-between">
          <div>
            <span className="text-xs text-charcoal-light block">Direct Maker Price</span>
            <span className="font-serif font-bold text-lg text-charcoal">
              {formatCurrency(product.base_price, product.currency)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onEnquireClick && (
              <button
                type="button"
                onClick={() => onEnquireClick(product)}
                className="p-2 text-forest hover:bg-forest/10 rounded-md transition-colors"
                title="Enquire about this product"
                aria-label="Enquire about this product"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            )}

            <Link
              href={`/product/${product.slug}`}
              className="text-xs font-semibold px-3 py-1.5 bg-ivory text-forest hover:bg-forest hover:text-white rounded transition-colors border border-sand"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
