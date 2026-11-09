import React from 'react';
import { getProducts } from '@/lib/data-service';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProductModerationManager } from '@/components/admin/ProductModerationManager';

export const metadata = {
  title: 'Product Moderation & Vegan Evidence Review',
};

export default async function AdminProductsPage() {
  const { products } = await getProducts();

  return (
    <div>
      <AdminHeader
        title="Product Moderation & Vegan Trust Curation"
        description="Inspect declared ingredients, verify raw material supplier evidence, and assign public trust badges."
      />

      <div className="p-8 max-w-7xl">
        <ProductModerationManager initialProducts={products} />
      </div>
    </div>
  );
}

