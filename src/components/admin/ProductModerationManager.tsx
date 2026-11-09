'use client';

import React, { useState } from 'react';
import { Product, VeganVerificationType } from '@/types';
import { StatusBadge, VeganBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, formatDate } from '@/lib/utils';
import { moderateProductAction } from '@/actions/admin-moderation';
import { ShieldCheck, AlertCircle, Eye, CheckCircle2, XCircle } from 'lucide-react';

interface ProductModerationManagerProps {
  initialProducts: Product[];
}

export function ProductModerationManager({ initialProducts }: ProductModerationManagerProps) {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Moderation state
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'unpublish' | null>(null);
  const [trustTier, setTrustTier] = useState<VeganVerificationType>('evidence_reviewed');
  const [trustExplanation, setTrustExplanation] = useState('');
  const [moderationReason, setModerationReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleOpenAction = (product: Product, action: 'approve' | 'reject' | 'unpublish') => {
    setSelectedProduct(product);
    setActionType(action);
    setTrustTier(product.vegan_status || 'evidence_reviewed');
    setTrustExplanation(product.vegan_status_explanation || 'Platform reviewed non-animal ingredient chain and supplier declarations.');
    setModerationReason(action === 'approve' ? 'Compliance criteria met; approved for public catalogue.' : '');
  };

  const handleExecuteAction = async () => {
    if (!selectedProduct || !actionType) return;
    setIsSubmitting(true);

    const res = await moderateProductAction({
      productId: selectedProduct.id,
      action: actionType,
      trustStatus: trustTier,
      trustExplanation,
      moderationReason,
    });

    setIsSubmitting(false);

    if (res.success) {
      setFeedback(res.message);
      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                status: actionType === 'approve' ? 'approved' : actionType === 'reject' ? 'rejected' : 'suspended',
                vegan_status: trustTier,
                vegan_status_explanation: trustExplanation,
              }
            : p
        )
      );
      setTimeout(() => {
        setActionType(null);
        setSelectedProduct(null);
        setFeedback(null);
      }, 1500);
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-sand shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-sand/30 border-b border-sand text-charcoal-muted uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Product / SKU</th>
                <th className="p-4">Maker Brand</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Vegan Trust Tier</th>
                <th className="p-4">Listing Status</th>
                <th className="p-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-sand/10 transition-colors">
                  <td className="p-4 max-w-xs">
                    <div className="font-serif font-bold text-sm text-forest line-clamp-1">{p.name}</div>
                    <div className="text-[11px] font-mono text-charcoal-muted">SKU: {p.sku}</div>
                    <div className="text-[10px] text-charcoal-light mt-0.5">{p.country_of_origin}</div>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-charcoal">{p.seller?.brand_name || 'Independent Maker'}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-charcoal-muted">{p.category?.name || 'General'}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-serif font-bold text-charcoal">{formatCurrency(p.base_price, p.currency)}</span>
                  </td>
                  <td className="p-4">
                    <VeganBadge status={p.vegan_status} />
                  </td>
                  <td className="p-4">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleOpenAction(p, 'approve')}
                        className="text-[11px] h-7 px-2.5 bg-emerald-700 hover:bg-emerald-800"
                      >
                        Approve / Tier
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleOpenAction(p, 'unpublish')}
                        className="text-[11px] h-7 px-2.5"
                      >
                        Unpublish
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Moderation Decision Modal */}
      {selectedProduct && actionType && (
        <Modal
          isOpen={true}
          onClose={() => {
            setActionType(null);
            setSelectedProduct(null);
          }}
          title={`Moderate Product: ${selectedProduct.name}`}
          description="Assign the verified vegan tier and record administrative justification."
          maxWidth="lg"
        >
          {feedback ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded text-center font-medium text-sm">
              {feedback}
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-sand/30 rounded border border-sand space-y-1">
                <strong>Declared Formulation:</strong>
                <p className="font-mono text-[11px] text-charcoal leading-relaxed">
                  {selectedProduct.ingredients_or_materials}
                </p>
              </div>

              {actionType === 'approve' && (
                <div className="space-y-1.5">
                  <label className="block font-semibold uppercase tracking-wider text-charcoal">
                    Assign Verified Vegan Trust Tier
                  </label>
                  <select
                    value={trustTier}
                    onChange={(e) => setTrustTier(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-white border border-sand rounded text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
                  >
                    <option value="seller_declared">1. Seller-Declared (Amber) — Lab review pending</option>
                    <option value="evidence_reviewed">2. Evidence-Reviewed (Teal) — Lab & supply chain audited</option>
                    <option value="third_party_certified">3. 3rd-Party Certified (Green) — Verified with issuing body</option>
                  </select>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block font-semibold uppercase tracking-wider text-charcoal">
                  Public Explanation for Trust Badge
                </label>
                <input
                  type="text"
                  value={trustExplanation}
                  onChange={(e) => setTrustExplanation(e.target.value)}
                  placeholder="e.g. Platform inspected lab tests confirming non-animal origin of enzymes..."
                  className="w-full px-3 py-2 text-xs bg-white border border-sand rounded text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block font-semibold uppercase tracking-wider text-charcoal">
                  Moderation Justification (Audit Log) <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={moderationReason}
                  onChange={(e) => setModerationReason(e.target.value)}
                  placeholder="Record verification decision details..."
                  className="w-full px-3 py-2 text-xs bg-white border border-sand rounded text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-sand">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setActionType(null);
                    setSelectedProduct(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant={actionType === 'approve' ? 'primary' : 'danger'}
                  isLoading={isSubmitting}
                  onClick={handleExecuteAction}
                  disabled={moderationReason.trim().length < 5}
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
