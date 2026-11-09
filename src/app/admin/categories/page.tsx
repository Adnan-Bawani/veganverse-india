import React from 'react';
import { getCategories } from '@/lib/data-service';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { CheckCircle2, Tags } from 'lucide-react';

export const metadata = {
  title: 'Category Taxonomy Management',
};

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div>
      <AdminHeader
        title="Category Taxonomy & Navigation"
        description="Configure marketplace category hierarchies, slugs, and display order."
      />

      <div className="p-8 max-w-7xl space-y-6">
        <div className="bg-white rounded-lg border border-sand shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sand/30 border-b border-sand text-charcoal-muted uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Order</th>
                  <th className="p-4">Category Name</th>
                  <th className="p-4">URL Slug</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-sand/10 transition-colors">
                    <td className="p-4 font-mono font-bold text-forest">#{c.display_order}</td>
                    <td className="p-4">
                      <div className="font-serif font-bold text-sm text-forest">{c.name}</div>
                    </td>
                    <td className="p-4 font-mono text-charcoal-muted">/category/{c.slug}</td>
                    <td className="p-4 max-w-xs text-charcoal-muted line-clamp-1">{c.description}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" />
                        Active
                      </span>
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
