'use client';

import React from 'react';
import { ProductVariant } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface VariantSelectorProps {
  variants?: ProductVariant[];
  selectedVariantId: string;
  onSelectVariant: (variant: ProductVariant) => void;
}

export function VariantSelector({ variants = [], selectedVariantId, onSelectVariant }: VariantSelectorProps) {
  if (variants.length <= 1) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold uppercase tracking-wider text-charcoal">Available Options / Sizes</span>
        <span className="text-charcoal-muted">Choose your preferred variant</span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {variants.map((v) => {
          const isSelected = v.id === selectedVariantId;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onSelectVariant(v)}
              className={`px-3.5 py-2 rounded border text-xs font-medium transition-all text-left ${
                isSelected
                  ? 'border-forest bg-forest text-white shadow-sm'
                  : 'border-sand bg-white text-charcoal hover:border-forest/60'
              }`}
            >
              <div className="font-semibold">{v.title}</div>
              {v.price_override && (
                <div className={`text-[10px] ${isSelected ? 'text-ivory' : 'text-charcoal-muted'}`}>
                  {formatCurrency(v.price_override)}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

