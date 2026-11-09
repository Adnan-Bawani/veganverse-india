import React from 'react';
import { cn } from '@/lib/utils';
import { VeganVerificationType, EntityStatusType } from '@/types';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

interface VeganBadgeProps {
  status: VeganVerificationType;
  showIcon?: boolean;
  className?: string;
}

export function VeganBadge({ status, showIcon = true, className }: VeganBadgeProps) {
  const configs = {
    seller_declared: {
      label: 'Seller Declared',
      classes: 'bg-amber-50 text-amber-800 border-amber-300',
      icon: AlertCircle,
    },
    evidence_reviewed: {
      label: 'Evidence Reviewed',
      classes: 'bg-teal-50 text-teal-800 border-teal-300',
      icon: CheckCircle2,
    },
    third_party_certified: {
      label: '3rd-Party Certified',
      classes: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      icon: ShieldCheck,
    },
  };

  const current = configs[status] || configs.seller_declared;
  const Icon = current.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide uppercase',
        current.classes,
        className
      )}
    >
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      {current.label}
    </span>
  );
}

interface StatusBadgeProps {
  status: EntityStatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const configs: Record<EntityStatusType, { label: string; classes: string }> = {
    approved: { label: 'Approved', classes: 'bg-emerald-50 text-emerald-700 border-emerald-300' },
    under_review: { label: 'Under Review', classes: 'bg-blue-50 text-blue-700 border-blue-300' },
    changes_requested: { label: 'Changes Requested', classes: 'bg-amber-50 text-amber-700 border-amber-300' },
    draft: { label: 'Draft', classes: 'bg-gray-100 text-gray-700 border-gray-300' },
    rejected: { label: 'Rejected', classes: 'bg-red-50 text-red-700 border-red-300' },
    suspended: { label: 'Suspended', classes: 'bg-zinc-100 text-zinc-800 border-zinc-400' },
  };

  const current = configs[status] || { label: status, classes: 'bg-gray-100 text-gray-700' };

  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border', current.classes, className)}>
      {current.label}
    </span>
  );
}

