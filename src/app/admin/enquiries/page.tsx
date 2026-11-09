import React from 'react';
import { getAdminEnquiries } from '@/lib/data-service';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { EnquiryReviewManager } from '@/components/admin/EnquiryReviewManager';

export const metadata = {
  title: 'Customer Product Inquiries & Lead Triage',
};

export default async function AdminEnquiriesPage() {
  const enquiries = await getAdminEnquiries();

  return (
    <div>
      <AdminHeader
        title="Customer Product Inquiries Triage"
        description="Monitor buyer product questions, track seller response latency, and manage customer service resolutions."
      />

      <div className="p-8 max-w-7xl">
        <EnquiryReviewManager initialEnquiries={enquiries} />
      </div>
    </div>
  );
}
