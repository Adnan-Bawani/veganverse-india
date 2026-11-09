'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, ProductVariant } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { ProductGallery } from './ProductGallery';
import { VariantSelector } from './VariantSelector';
import { TrustBadgeModal } from './TrustBadgeModal';
import { EnquiryModal } from './EnquiryModal';
import { VeganBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  MessageSquare, 
  Info, 
  AlertTriangle,
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants?.find((v) => v.is_default) || product.variants?.[0] || {
      id: 'default',
      product_id: product.id,
      sku: product.sku,
      title: 'Standard',
      attributes: {},
      price_override: product.base_price,
      is_default: true,
      stock_quantity: 10,
      is_available: true,
      created_at: '',
    }
  );

  const [isTrustModalOpen, setIsTrustModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Accordion toggles
  const [showIngredients, setShowIngredients] = useState(true);
  const [showShipping, setShowShipping] = useState(false);
  const [showReturns, setShowReturns] = useState(false);

  const activePrice = selectedVariant.price_override || product.base_price;

  return (
    <div className="space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-charcoal-muted flex items-center gap-2">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-forest">Catalogue</Link>
        {product.category && (
          <>
            <span>/</span>
            <Link href={`/category/${product.category.slug}`} className="hover:text-forest">
              {product.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-forest font-semibold line-clamp-1">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Product Images Gallery */}
        <div>
          <ProductGallery
            images={product.images}
            fallbackUrl={product.images?.[0]?.image_url}
            productName={product.name}
          />
        </div>

        {/* Right: Product Details & Enquiry Actions */}
        <div className="space-y-6">
          {/* Brand Attribution & Vegan Trust Badge */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {product.seller && (
              <Link
                href={`/brand/${product.seller.slug}`}
                className="text-xs font-semibold uppercase tracking-wider text-earth hover:text-earth-dark transition-colors inline-flex items-center gap-1.5"
              >
                <span>Crafted by {product.seller.brand_name}</span>
                <span className="text-sand">•</span>
                <span className="text-[11px] text-charcoal-light">Verified Maker</span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => setIsTrustModalOpen(true)}
              className="inline-flex items-center gap-1 group"
              title="Click to view full verification credentials"
            >
              <VeganBadge status={product.vegan_status} />
              <Info className="w-3.5 h-3.5 text-charcoal-muted group-hover:text-forest transition-colors" />
            </button>
          </div>

          {/* Product Title */}
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest leading-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 text-xs text-charcoal-light mt-1">
              <span>SKU: {selectedVariant.sku || product.sku}</span>
              <span>•</span>
              <span className="text-forest font-medium">{product.country_of_origin}</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 bg-sand/30 border border-sand rounded-lg flex items-baseline justify-between">
            <div>
              <span className="text-xs text-charcoal-light block">Direct Independent Maker Price</span>
              <span className="font-serif text-3xl font-bold text-charcoal">
                {formatCurrency(activePrice, product.currency)}
              </span>
            </div>
            <div className="text-right text-xs">
              <span className="text-emerald-700 font-semibold block">In Stock & Verified</span>
              <span className="text-charcoal-muted">Dispatched directly by maker</span>
            </div>
          </div>

          {/* Short Description */}
          {product.short_description && (
            <p className="text-sm text-charcoal/90 leading-relaxed font-sans">
              {product.short_description}
            </p>
          )}

          {/* Variant Selector */}
          {product.variants && product.variants.length > 1 && (
            <div className="pt-2 border-t border-sand">
              <VariantSelector
                variants={product.variants}
                selectedVariantId={selectedVariant.id}
                onSelectVariant={(v) => setSelectedVariant(v)}
              />
            </div>
          )}

          {/* Primary Action Button (Enquiry CTA in Phase 1) */}
          <div className="pt-4 space-y-3">
            <Button
              size="lg"
              onClick={() => setIsEnquiryModalOpen(true)}
              className="w-full gap-2 text-base shadow-sm font-semibold"
            >
              <MessageSquare className="w-5 h-5" />
              Enquire About This Product
            </Button>
            <p className="text-[11px] text-center text-charcoal-muted">
              Connect directly with {product.seller?.brand_name || 'the brand'} for purchase, ingredients, or custom dispatch.
            </p>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-sand text-xs text-charcoal-muted">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-forest flex-shrink-0" />
              <span>Zero Animal Byproducts</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-forest flex-shrink-0" />
              <span>Direct Maker Dispatch</span>
            </div>
          </div>

          {/* Expandable Accordions */}
          <div className="pt-4 border-t border-sand space-y-3">
            {/* Ingredients / Materials Accordion */}
            <div className="border border-sand rounded-lg overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setShowIngredients(!showIngredients)}
                className="w-full p-4 text-left flex items-center justify-between font-serif font-bold text-sm text-forest"
              >
                <span>Full Ingredients & Formulation Disclosures</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showIngredients ? 'rotate-180' : ''}`} />
              </button>
              {showIngredients && (
                <div className="p-4 pt-0 text-xs text-charcoal space-y-2 border-t border-sand/40 leading-relaxed">
                  <p className="font-mono bg-sand/20 p-2.5 rounded text-[11px]">
                    {product.ingredients_or_materials}
                  </p>
                  {product.dimensions_or_weight && (
                    <p><strong>Net Content / Weight:</strong> {product.dimensions_or_weight}</p>
                  )}
                  {product.care_instructions && (
                    <p><strong>Storage & Care:</strong> {product.care_instructions}</p>
                  )}
                </div>
              )}
            </div>

            {/* Shipping & Delivery Accordion */}
            <div className="border border-sand rounded-lg overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setShowShipping(!showShipping)}
                className="w-full p-4 text-left flex items-center justify-between font-serif font-bold text-sm text-forest"
              >
                <span>Shipping, Dispatch & Packaging</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showShipping ? 'rotate-180' : ''}`} />
              </button>
              {showShipping && (
                <div className="p-4 pt-0 text-xs text-charcoal-muted border-t border-sand/40 leading-relaxed">
                  {product.seller?.shipping_policy || 'Dispatched via carbon-neutral ground courier within 2 business days. Packed plastic-free with compostable cushioning.'}
                </div>
              )}
            </div>

            {/* Return Policy Accordion */}
            <div className="border border-sand rounded-lg overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setShowReturns(!showReturns)}
                className="w-full p-4 text-left flex items-center justify-between font-serif font-bold text-sm text-forest"
              >
                <span>Returns & Exchanges</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showReturns ? 'rotate-180' : ''}`} />
              </button>
              {showReturns && (
                <div className="p-4 pt-0 text-xs text-charcoal-muted border-t border-sand/40 leading-relaxed">
                  {product.seller?.return_policy || 'Perishable foods cannot be returned once unsealed. Non-perishable lifestyle goods are eligible for return/replacement within 7 days if defective.'}
                </div>
              )}
            </div>
          </div>

          {/* Report Listing */}
          <div className="pt-2 text-center">
            <Link
              href="/contact"
              className="text-[11px] text-charcoal-light hover:text-earth transition-colors inline-flex items-center gap-1"
            >
              <AlertTriangle className="w-3 h-3" />
              Report listing inaccuracy to compliance officer
            </Link>
          </div>
        </div>
      </div>

      {/* Full Description & Brand Story Section */}
      <div className="pt-12 border-t border-sand space-y-6">
        <h2 className="font-serif text-2xl font-bold text-forest">Product Story & Craftsmanship</h2>
        <div className="prose prose-sm max-w-none text-charcoal leading-relaxed whitespace-pre-line bg-white p-6 sm:p-8 rounded-lg border border-sand">
          {product.full_description}
        </div>
      </div>

      {/* Modals */}
      <TrustBadgeModal
        isOpen={isTrustModalOpen}
        onClose={() => setIsTrustModalOpen(false)}
        currentStatus={product.vegan_status}
        explanation={product.vegan_status_explanation}
      />

      <EnquiryModal
        product={product}
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
      />
    </div>
  );
}
