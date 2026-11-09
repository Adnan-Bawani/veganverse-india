'use client';

import React, { useState } from 'react';
import { SellerApplication, SellerStore } from '@/types';
import { StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { moderateSellerAction } from '@/actions/admin-moderation';
import { formatDate } from '@/lib/utils';
import { 
  ShieldCheck, 
  Store, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  Lock 
} from 'lucide-react';

interface SellerReviewManagerProps {
  initialApplications: SellerApplication[];
  stores: SellerStore[];
}

export function SellerReviewManager({ initialApplications, stores }: SellerReviewManagerProps) {
  const [applications, setApplications] = useState(initialApplications);
  const [activeTab, setActiveTab] = useState<'applications' | 'stores'>('applications');
  const [selectedApp, setSelectedApp] = useState<SellerApplication | null>(null);

  // Moderation action modal state
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'request_changes' | 'suspend' | null>(null);
  const [moderationNotes, setModerationNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  const handleOpenAction = (app: SellerApplication, action: 'approve' | 'reject' | 'request_changes' | 'suspend') => {
    setSelectedApp(app);
    setActionType(action);
    setModerationNotes(
      action === 'approve'
        ? 'Business credentials verified; non-animal ingredient declarations audited and confirmed.'
        : ''
    );
  };

  const handleExecuteAction = async () => {
    if (!selectedApp || !actionType) return;
    setIsSubmitting(true);

    const res = await moderateSellerAction({
      applicationId: selectedApp.id,
      action: actionType,
      notes: moderationNotes,
    });

    setIsSubmitting(false);

    if (res.success) {
      setStatusFeedback(res.message);
      setApplications((prev) =>
        prev.map((a) => (a.id === selectedApp.id ? { ...a, status: actionType === 'approve' ? 'approved' : actionType === 'reject' ? 'rejected' : actionType === 'suspend' ? 'suspended' : 'changes_requested' } : a))
      );
      setTimeout(() => {
        setActionType(null);
        setSelectedApp(null);
        setStatusFeedback(null);
      }, 1500);
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-sand text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('applications')}
          className={`py-3 px-6 border-b-2 transition-all ${
            activeTab === 'applications'
              ? 'border-forest text-forest bg-white'
              : 'border-transparent text-charcoal-muted hover:text-charcoal'
          }`}
        >
          Seller Applications ({applications.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('stores')}
          className={`py-3 px-6 border-b-2 transition-all ${
            activeTab === 'stores'
              ? 'border-forest text-forest bg-white'
              : 'border-transparent text-charcoal-muted hover:text-charcoal'
          }`}
        >
          Active Stores ({stores.length})
        </button>
      </div>

      {/* Applications View */}
      {activeTab === 'applications' && (
        <div className="bg-white rounded-lg border border-sand shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sand/30 border-b border-sand text-charcoal-muted uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Brand / Legal Entity</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Tax & Private Vault</th>
                  <th className="p-4">Vegan Declaration</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-sand/10 transition-colors">
                    <td className="p-4">
                      <div className="font-serif font-bold text-sm text-forest">{app.trading_name}</div>
                      <div className="text-[11px] text-charcoal-light">{app.legal_name}</div>
                      <div className="text-[10px] text-charcoal-muted mt-0.5">{app.business_type} • {app.registered_address.city}, {app.registered_address.state}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-charcoal">{app.contact_person_name}</div>
                      <div className="text-charcoal-muted">{app.contact_email}</div>
                      <div className="text-charcoal-light">{app.contact_phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-mono">
                        <Lock className="w-3 h-3 text-amber-700" />
                        <span>PAN: {app.tax_identifiers?.pan || 'Encrypted'}</span>
                      </div>
                      {app.tax_identifiers?.gstin && (
                        <div className="text-[10px] font-mono text-charcoal-muted mt-1">
                          GSTIN: {app.tax_identifiers.gstin}
                        </div>
                      )}
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="line-clamp-2 text-charcoal-muted leading-relaxed" title={app.vegan_claim_declaration}>
                        {app.vegan_claim_declaration}
                      </p>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {app.status === 'under_review' && (
                          <>
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => handleOpenAction(app, 'approve')}
                              className="text-[11px] h-7 px-2.5 bg-emerald-700 hover:bg-emerald-800"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleOpenAction(app, 'request_changes')}
                              className="text-[11px] h-7 px-2.5 text-amber-800 border-amber-300 hover:bg-amber-50"
                            >
                              Changes
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleOpenAction(app, 'reject')}
                              className="text-[11px] h-7 px-2.5"
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {app.status === 'approved' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOpenAction(app, 'suspend')}
                            className="text-[11px] h-7 px-2.5 text-red-700 border-red-300 hover:bg-red-50"
                          >
                            Suspend Store
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Active Stores View */}
      {activeTab === 'stores' && (
        <div className="bg-white rounded-lg border border-sand shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sand/30 border-b border-sand text-charcoal-muted uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Store Identity</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4">Country</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Storefront Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {stores.map((s) => (
                  <tr key={s.id} className="hover:bg-sand/10 transition-colors">
                    <td className="p-4">
                      <div className="font-serif font-bold text-sm text-forest">{s.brand_name}</div>
                      <div className="text-[11px] text-charcoal-light">{s.business_legal_name}</div>
                    </td>
                    <td className="p-4 text-charcoal-muted">
                      {s.business_email}
                      {s.business_phone && <div className="text-charcoal-light">{s.business_phone}</div>}
                    </td>
                    <td className="p-4 font-medium text-charcoal">{s.country_of_registration}</td>
                    <td className="p-4">
                      <StatusBadge status={s.status} />
                    </td>
                    <td className="p-4">
                      <a
                        href={`/brand/${s.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-forest hover:underline font-semibold"
                      >
                        /brand/{s.slug} ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Moderation Decision Modal */}
      {selectedApp && actionType && (
        <Modal
          isOpen={true}
          onClose={() => {
            setActionType(null);
            setSelectedApp(null);
          }}
          title={`Confirm Action: ${actionType.toUpperCase().replace('_', ' ')}`}
          description={`Applying administrative decision to "${selectedApp.trading_name}" (#${selectedApp.id}).`}
        >
          {statusFeedback ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded text-center font-medium text-sm">
              {statusFeedback}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Mandatory Audit Log Note & Compliance Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={moderationNotes}
                  onChange={(e) => setModerationNotes(e.target.value)}
                  placeholder="Record justification, inspected certificates, or missing information required from seller..."
                  className="w-full px-3 py-2 text-xs bg-white border border-sand rounded text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-sand">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setActionType(null);
                    setSelectedApp(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant={actionType === 'approve' ? 'primary' : 'danger'}
                  isLoading={isSubmitting}
                  onClick={handleExecuteAction}
                  disabled={moderationNotes.trim().length < 5}
                >
                  Confirm Decision
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
