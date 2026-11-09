'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Store, 
  Package, 
  Tags, 
  MessageSquare, 
  FileText, 
  ArrowLeft,
  ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Overview Metrics', icon: LayoutDashboard, exact: true },
    { href: '/admin/sellers', label: 'Seller Onboarding', icon: Store },
    { href: '/admin/products', label: 'Product Moderation', icon: Package },
    { href: '/admin/enquiries', label: 'Customer Enquiries', icon: MessageSquare },
    { href: '/admin/categories', label: 'Category Taxonomy', icon: Tags },
    { href: '/admin/audit-logs', label: 'Audit Trail', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-charcoal text-sand/80 flex flex-col min-h-screen border-r border-sand/10">
      {/* Brand Header */}
      <div className="p-6 border-b border-sand/10 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-forest text-ivory flex items-center justify-center font-serif font-bold text-base">
            V
          </div>
          <div>
            <span className="font-serif font-bold text-lg text-ivory block leading-none">
              Admin Portal
            </span>
            <span className="text-[10px] uppercase tracking-widest text-earth block mt-0.5">
              Curation & Trust
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1.5 text-xs font-medium">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-md transition-colors',
                isActive
                  ? 'bg-forest text-ivory font-semibold shadow-sm'
                  : 'hover:bg-sand/10 hover:text-ivory text-sand/70'
              )}
            >
              <Icon className={cn('w-4 h-4', isActive ? 'text-ivory' : 'text-sand/50')} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Return to Storefront */}
      <div className="p-4 border-t border-sand/10 space-y-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded bg-amber-500/10 text-amber-300 text-[11px]">
          <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
          <span>RLS & Audit Logging Active</span>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-2 rounded text-xs text-sand/60 hover:text-ivory hover:bg-sand/10 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Public Storefront</span>
        </Link>
      </div>
    </aside>
  );
}

