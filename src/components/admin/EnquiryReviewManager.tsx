'use client';

import React, { useState } from 'react';
import { CustomerEnquiry, EnquiryStatusType } from '@/types';
import { Button } from '@/components/ui/Button';
import { updateEnquiryStatusAction } from '@/actions/admin-moderation';
import { formatDate } from '@/lib/utils';
import { MessageSquare, Mail, Phone, CheckCircle2, ArrowRight } from 'lucide-react';

interface EnquiryReviewManagerProps {
  initialEnquiries: CustomerEnquiry[];
}

export function EnquiryReviewManager({ initialEnquiries }: EnquiryReviewManagerProps) {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [selectedEnquiry, setSelectedEnquiry] = useState<CustomerEnquiry | null>(null);
  const [newStatus, setNewStatus] = useState<EnquiryStatusType>('new');
  const [adminNotes, setAdminNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSelect = (e: CustomerEnquiry) => {
    setSelectedEnquiry(e);
    setNewStatus(e.status);
    setAdminNotes(e.admin_notes || '');
  };

  const handleUpdate = async () => {
    if (!selectedEnquiry) return;
    setIsUpdating(true);

    const res = await updateEnquiryStatusAction({
      enquiryId: selectedEnquiry.id,
      status: newStatus,
      adminNotes,
    });

    setIsUpdating(false);

    if (res.success) {
      setEnquiries((prev) =>
        prev.map((e) =>
          e.id === selectedEnquiry.id
            ? { ...e, status: newStatus, admin_notes: adminNotes }
            : e
        )
      );
      setSelectedEnquiry(null);
    } else {
      alert(res.message);
    }
  };

  const statusConfigs: Record<EnquiryStatusType, { label: string; classes: string }> = {
    new: { label: 'New Lead', classes: 'bg-blue-50 text-blue-700 border-blue-200' },
    forwarded_to_seller: { label: 'With Maker', classes: 'bg-amber-50 text-amber-800 border-amber-200' },
    resolved: { label: 'Resolved', classes: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    closed: { label: 'Closed', classes: 'bg-gray-100 text-gray-700 border-gray-200' },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Enquiries List */}
      <div className="lg:col-span-2 bg-white rounded-lg border border-sand shadow-sm overflow-hidden">
        <div className="p-4 border-b border-sand bg-sand/20 font-serif font-bold text-sm text-forest">
          Customer Product Inquiries ({enquiries.length})
        </div>
        <div className="divide-y divide-sand">
          {enquiries.map((enq) => {
            const config = statusConfigs[enq.status];
            const isSelected = selectedEnquiry?.id === enq.id;

            return (
              <div
                key={enq.id}
                onClick={() => handleSelect(enq)}
                className={`p-4 cursor-pointer transition-colors space-y-2 ${
                  isSelected ? 'bg-sand/30 border-l-4 border-l-forest' : 'hover:bg-sand/10'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-serif font-bold text-forest text-sm">
                    {enq.customer_name}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${config.classes}`}>
                    {config.label}
                  </span>
                </div>

                <div className="text-xs text-charcoal">
                  <strong>Listing:</strong> {enq.product?.name || 'Artisanal Product'} •{' '}
                  <span className="text-earth font-medium">{enq.seller?.brand_name}</span>
                </div>

                <p className="text-xs text-charcoal-muted line-clamp-2 italic bg-sand/20 p-2 rounded">
                  &quot;{enq.message}&quot;
                </p>

                <div className="flex items-center justify-between text-[11px] text-charcoal-light pt-1">
                  <span>{enq.customer_email} {enq.customer_phone ? `• ${enq.customer_phone}` : ''}</span>
                  <span>{formatDate(enq.created_at)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Enquiry Detail & Status Panel */}
      <div className="bg-white rounded-lg border border-sand p-6 shadow-sm space-y-5">
        <h3 className="font-serif text-lg font-bold text-forest pb-2 border-b border-sand">
          Enquiry Detail & Management
        </h3>

        {selectedEnquiry ? (
          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <span className="font-semibold text-charcoal-muted uppercase tracking-wider block">Customer:</span>
              <p className="font-bold text-sm text-charcoal">{selectedEnquiry.customer_name}</p>
              <div className="flex items-center gap-1.5 text-charcoal-muted">
                <Mail className="w-3.5 h-3.5 text-forest" />
                <a href={`mailto:${selectedEnquiry.customer_email}`} className="hover:underline">
                  {selectedEnquiry.customer_email}
                </a>
              </div>
              {selectedEnquiry.customer_phone && (
                <div className="flex items-center gap-1.5 text-charcoal-muted">
                  <Phone className="w-3.5 h-3.5 text-forest" />
                  <span>{selectedEnquiry.customer_phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-1 pt-2 border-t border-sand">
              <span className="font-semibold text-charcoal-muted uppercase tracking-wider block">Inquiry Message:</span>
              <p className="text-charcoal bg-sand/30 p-3 rounded leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-sand">
              <label className="block font-semibold uppercase tracking-wider text-charcoal">
                Update Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-white border border-sand rounded text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
              >
                <option value="new">New Lead</option>
                <option value="forwarded_to_seller">Forwarded to Maker</option>
                <option value="resolved">Resolved / Answered</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block font-semibold uppercase tracking-wider text-charcoal">
                Internal Administrative Notes
              </label>
              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Log internal follow-up notes..."
                className="w-full px-3 py-2 text-xs bg-white border border-sand rounded text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>

            <Button
              size="sm"
              onClick={handleUpdate}
              isLoading={isUpdating}
              className="w-full text-xs font-semibold"
            >
              Save Enquiry Status
            </Button>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-charcoal-muted">
            Select an enquiry from the list to view complete buyer details, seller notes, and status controls.
          </div>
        )}
      </div>
    </div>
  );
}

