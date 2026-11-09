import React from 'react';
import { getAdminApplications, getStores } from '@/lib/data-service';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { SellerReviewManager } from '@/components/admin/SellerReviewManager';

export const metadata = {
  title: 'Seller Application Review & Store Management',
};

export default async function AdminSellersPage() {
  const [applications, stores] = await Promise.all([
    getAdminApplications(),
    getStores(),
  ]);

  return (
    <div>
      <AdminHeader
        title="Seller Onboarding & Store Governance"
        description="Inspect applicant identity, audit vegan declarations, and govern multi-vendor seller statuses."
      />

      <div className="p-8 max-w-7xl">
        <SellerReviewManager initialApplications={applications} stores={stores} />
      </div>
    </div>
  );
}
