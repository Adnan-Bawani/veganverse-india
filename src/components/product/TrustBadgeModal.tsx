'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { ShieldCheck, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { VeganVerificationType } from '@/types';

interface TrustBadgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus?: VeganVerificationType;
  explanation?: string | null;
}

export function TrustBadgeModal({ isOpen, onClose, currentStatus, explanation }: TrustBadgeModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Our Vegan Trust & Verification Standards"
      description="We believe in absolute transparency. Here is how we verify ethical declarations before listings appear."
      maxWidth="lg"
    >
      <div className="space-y-6 text-sm">
        {/* Active Product Explanation */}
        {explanation && (
          <div className="bg-sand/30 border border-sand p-4 rounded-md">
            <span className="text-xs font-bold uppercase tracking-wider text-forest block mb-1">
              Verification Note for This Product:
            </span>
            <p className="text-charcoal leading-relaxed">{explanation}</p>
          </div>
        )}

        {/* The 3 Tiers Explained */}
        <div className="space-y-4">
          {/* Tier 1 */}
          <div className={`p-4 rounded-lg border transition-all ${currentStatus === 'seller_declared' ? 'border-amber-400 bg-amber-50/50' : 'border-sand bg-white'}`}>
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <h4 className="font-bold text-amber-900">1. Seller-Declared (Amber)</h4>
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              The independent maker has submitted a legal declaration confirming zero animal derivatives and no animal testing. Platform review of raw material certificates is currently in queue.
            </p>
          </div>

          {/* Tier 2 */}
          <div className={`p-4 rounded-lg border transition-all ${currentStatus === 'evidence_reviewed' ? 'border-teal-400 bg-teal-50/50' : 'border-sand bg-white'}`}>
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle2 className="w-4 h-4 text-teal-700" />
              <h4 className="font-bold text-teal-900">2. Evidence-Reviewed (Teal)</h4>
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Our curation team has independently inspected complete ingredient disclosures, manufacturer declarations, and laboratory test reports against our category-specific non-animal compliance guidelines.
            </p>
          </div>

          {/* Tier 3 */}
          <div className={`p-4 rounded-lg border transition-all ${currentStatus === 'third_party_certified' ? 'border-emerald-500 bg-emerald-50/50' : 'border-sand bg-white'}`}>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <h4 className="font-bold text-emerald-900">3. 3rd-Party Certified (Green)</h4>
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Verified with an authentic, audited certificate issued by an accredited international or national body (such as The Vegan Society, PeTA-Approved Vegan, or FSSAI Vegan Logo with confirmed endorsement number).
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-sand flex items-center justify-between text-xs text-charcoal-muted">
          <span>Notice an inaccuracy?</span>
          <a href="/contact" className="text-forest underline font-medium">
            Report a Listing to Compliance
          </a>
        </div>
      </div>
    </Modal>
  );
}

