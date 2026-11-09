import Link from 'next/link';
import { ArrowRight, Leaf } from 'lucide-react';

export function AnnouncementBar() {
  return (
    <div className="bg-forest text-ivory text-xs py-2 px-4 border-b border-forest-dark">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Leaf className="w-3.5 h-3.5 text-earth-light" />
          <span className="font-medium tracking-wide">
            India Pilot Launch: 100% Verified Cruelty-Free & Plant-Based Products
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-[11px] uppercase tracking-wider">
          <span className="text-sand/70">Independent Brands • Zero Animal Testing</span>
          <Link
            href="/sell"
            className="text-ivory font-semibold hover:text-earth-light transition-colors inline-flex items-center gap-1"
          >
            Become a Founding Seller
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
