import React from 'react';
import Link from 'next/link';
import { 
  getAdminMetrics, 
  getAdminApplications, 
  getAdminEnquiries, 
  getAdminAuditLogs 
} from '@/lib/data-service';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatusBadge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { 
  Store, 
  Package, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';

export default async function AdminDashboardOverview() {
  const [metrics, applications, enquiries, auditLogs] = await Promise.all([
    getAdminMetrics(),
    getAdminApplications(),
    getAdminEnquiries(),
    getAdminAuditLogs(),
  ]);

  const pendingApps = applications.filter((a) => a.status === 'under_review');
  const recentEnquiries = enquiries.slice(0, 5);

  const metricCards = [
    {
      title: 'Total Sellers',
      value: metrics.totalSellers,
      sub: `${metrics.approvedSellers} Verified Active`,
      icon: Store,
      color: 'text-forest',
      bg: 'bg-forest/10',
      href: '/admin/sellers',
    },
    {
      title: 'Pending Applications',
      value: metrics.pendingApplications,
      sub: 'Awaiting Compliance Audit',
      icon: Clock,
      color: 'text-amber-700',
      bg: 'bg-amber-100',
      href: '/admin/sellers',
    },
    {
      title: 'Approved Sellers',
      value: metrics.approvedSellers,
      sub: 'Founding Indian Makers',
      icon: CheckCircle2,
      color: 'text-emerald-700',
      bg: 'bg-emerald-100',
      href: '/admin/sellers',
    },
    {
      title: 'Awaiting Product Review',
      value: metrics.totalProducts - metrics.approvedProducts,
      sub: 'Evidence Inspection Queue',
      icon: AlertCircle,
      color: 'text-blue-700',
      bg: 'bg-blue-100',
      href: '/admin/products',
    },
    {
      title: 'Approved Products',
      value: metrics.approvedProducts,
      sub: 'Live on Public Catalogue',
      icon: Package,
      color: 'text-forest',
      bg: 'bg-forest/10',
      href: '/admin/products',
    },
    {
      title: 'Open Enquiries',
      value: metrics.openEnquiries,
      sub: 'Buyer Leads Awaiting Reply',
      icon: MessageSquare,
      color: 'text-earth',
      bg: 'bg-earth/10',
      href: '/admin/enquiries',
    },
  ];

  return (
    <div>
      <AdminHeader
        title="Marketplace Operations Overview"
        description="Phase 1 Catalogue Pilot metrics, seller compliance status, and product moderation queues."
      />

      <div className="p-8 space-y-8 max-w-7xl">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {metricCards.map((m, idx) => {
            const Icon = m.icon;
            return (
              <Link
                key={idx}
                href={m.href}
                className="bg-white rounded-lg border border-sand p-6 shadow-sm hover:border-forest/40 transition-all flex items-start justify-between group"
              >
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted">
                    {m.title}
                  </span>
                  <div className="font-serif text-3xl font-bold text-charcoal">{m.value}</div>
                  <span className="text-xs text-charcoal-light block">{m.sub}</span>
                </div>
                <div className={`p-3 rounded-lg ${m.bg} ${m.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Triage Queues Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Applications Triage */}
          <div className="bg-white rounded-lg border border-sand shadow-sm overflow-hidden">
            <div className="p-5 border-b border-sand flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg font-bold text-forest">
                  Pending Seller Applications
                </h2>
                <p className="text-xs text-charcoal-muted">
                  Requires identity and non-animal declaration verification
                </p>
              </div>
              <Link
                href="/admin/sellers"
                className="text-xs font-semibold text-forest hover:text-earth inline-flex items-center gap-1"
              >
                View All ({applications.length})
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-sand">
              {pendingApps.length === 0 ? (
                <div className="p-6 text-center text-xs text-charcoal-muted">
                  Zero pending seller applications in the curation queue.
                </div>
              ) : (
                pendingApps.map((app) => (
                  <div key={app.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-sm text-forest">
                          {app.trading_name}
                        </span>
                        <StatusBadge status={app.status} />
                      </div>
                      <p className="text-xs text-charcoal-muted line-clamp-1">
                        {app.legal_name} • {app.contact_person_name} ({app.contact_email})
                      </p>
                    </div>

                    <Link
                      href="/admin/sellers"
                      className="px-3 py-1.5 text-xs font-semibold rounded bg-ivory border border-sand text-forest hover:bg-forest hover:text-white transition-colors"
                    >
                      Audit
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Customer Enquiries */}
          <div className="bg-white rounded-lg border border-sand shadow-sm overflow-hidden">
            <div className="p-5 border-b border-sand flex items-center justify-between">
              <div>
                <h2 className="font-serif text-lg font-bold text-forest">
                  Recent Product Enquiries
                </h2>
                <p className="text-xs text-charcoal-muted">
                  High-intent buyer questions routed to independent sellers
                </p>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs font-semibold text-forest hover:text-earth inline-flex items-center gap-1"
              >
                View All ({enquiries.length})
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-sand">
              {recentEnquiries.length === 0 ? (
                <div className="p-6 text-center text-xs text-charcoal-muted">
                  No enquiries received yet.
                </div>
              ) : (
                recentEnquiries.map((enq) => (
                  <div key={enq.id} className="p-4 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-forest">
                        {enq.customer_name} ({enq.customer_email})
                      </span>
                      <span className="text-charcoal-light text-[11px]">{formatDate(enq.created_at)}</span>
                    </div>
                    <p className="text-xs text-charcoal font-medium line-clamp-1">
                      Product: {enq.product?.name || 'Artisanal Listing'}
                    </p>
                    <p className="text-xs text-charcoal-muted line-clamp-1 italic">
                      &quot;{enq.message}&quot;
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Audit Trail Snapshot */}
        <div className="bg-white rounded-lg border border-sand p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-sand pb-3">
            <h2 className="font-serif text-lg font-bold text-forest">
              Administrative Audit Log (Recent System Events)
            </h2>
            <Link href="/admin/audit-logs" className="text-xs font-semibold text-forest hover:underline">
              Full Log
            </Link>
          </div>

          <div className="space-y-2.5 text-xs">
            {auditLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="flex items-center justify-between py-1.5 border-b border-sand/40">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-forest font-mono">{log.action}</span>
                  <span className="text-charcoal-muted">
                    {log.target_entity} #{log.target_id} • by {log.actor_name || 'System'}
                  </span>
                </div>
                <span className="text-[11px] text-charcoal-light">{formatDate(log.created_at)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

