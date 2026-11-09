'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types';

interface ProductGalleryProps {
  images?: ProductImage[];
  fallbackUrl?: string;
  productName: string;
}

export function ProductGallery({ images = [], fallbackUrl, productName }: ProductGalleryProps) {
  const displayImages = images.length > 0
    ? images
    : [{ id: 'default', image_url: fallbackUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', alt_text: productName, display_order: 0, is_primary: true, product_id: '', created_at: '' }];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Viewport */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-sand/30 border border-sand">
        <Image
          src={displayImages[activeIndex].image_url}
          alt={displayImages[activeIndex].alt_text || productName}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-opacity duration-300"
        />
      </div>

      {/* Thumbnails Row */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {displayImages.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 aspect-square rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                activeIndex === idx ? 'border-forest ring-2 ring-forest/20' : 'border-sand hover:border-forest/40'
              }`}
            >
              <Image src={img.image_url} alt={img.alt_text} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

