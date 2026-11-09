import React from 'react';
import { ShieldCheck, Bell } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  description?: string;
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <div className="bg-white border-b border-sand px-8 py-5 flex items-center justify-between">
      <div>
        <h1 className="font-serif text-2xl font-bold text-forest">{title}</h1>
        {description && <p className="text-xs text-charcoal-muted mt-1">{description}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Super-Admin Session</span>
        </div>

        <button
          type="button"
          className="p-2 text-charcoal-muted hover:text-charcoal hover:bg-sand/30 rounded-full transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-earth absolute top-1.5 right-1.5" />
        </button>
      </div>
    </div>
  );
}

