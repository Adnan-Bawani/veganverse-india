import React from 'react';
import { getAdminAuditLogs } from '@/lib/data-service';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { formatDate } from '@/lib/utils';
import { FileText, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Administrative Audit Trail',
};

export default async function AdminAuditLogsPage() {
  const logs = await getAdminAuditLogs();

  return (
    <div>
      <AdminHeader
        title="Administrative Audit Trail & Tamper Log"
        description="Append-only record of all compliance decisions, status changes, and moderation actions."
      />

      <div className="p-8 max-w-7xl space-y-6">
        <div className="bg-white rounded-lg border border-sand shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sand/30 border-b border-sand text-charcoal-muted uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Timestamp</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Target Entity</th>
                  <th className="p-4">Actor</th>
                  <th className="p-4">Decision Metadata</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-sand/10 transition-colors">
                    <td className="p-4 font-mono text-charcoal-muted">
                      {formatDate(log.created_at)}
                    </td>
                    <td className="p-4">
                      <span className="font-mono font-bold text-forest uppercase bg-sand/30 px-2 py-0.5 rounded">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-charcoal">
                      {log.target_entity} #{log.target_id}
                    </td>
                    <td className="p-4 font-medium text-charcoal">
                      {log.actor_name || 'Automated Engine'}
                    </td>
                    <td className="p-4 text-charcoal-muted max-w-sm">
                      <pre className="font-mono text-[10px] bg-sand/20 p-2 rounded overflow-x-auto whitespace-pre-wrap">
                        {JSON.stringify(log.metadata, null, 2)}
                      </pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

