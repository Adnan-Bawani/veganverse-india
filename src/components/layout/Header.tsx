'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Menu, X, Shield, Store } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-forest text-ivory flex items-center justify-center font-serif font-bold text-xl shadow-sm group-hover:bg-forest-light transition-colors">
                V
              </div>
              <div>
                <span className="font-serif font-bold text-2xl tracking-tight text-forest block leading-none">
                  VeganVerse
                </span>
                <span className="text-[10px] uppercase tracking-widest text-earth font-semibold block mt-0.5">
                  India • Curated Marketplace
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-charcoal">
              <Link href="/shop" className="hover:text-forest transition-colors py-2">
                Catalogue
              </Link>
              <Link href="/categories" className="hover:text-forest transition-colors py-2">
                Categories
              </Link>
              <Link href="/brands" className="hover:text-forest transition-colors py-2">
                Makers & Brands
              </Link>
              <Link href="/how-it-works" className="hover:text-forest transition-colors py-2">
                Verification Standard
              </Link>
              <Link href="/journal" className="hover:text-forest transition-colors py-2">
                Journal
              </Link>
            </nav>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-6">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Search products, ingredients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-sand rounded-full text-charcoal focus:outline-none focus:ring-1 focus:ring-forest transition-all"
              />
              <Search className="w-4 h-4 text-charcoal-light absolute left-3 top-2.5" />
            </form>
          </div>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="gap-1.5 text-xs text-charcoal-muted hover:text-forest">
                <Shield className="w-3.5 h-3.5 text-earth" />
                Admin
              </Button>
            </Link>

            <Link href="/seller/apply">
              <Button variant="primary" size="sm" className="gap-1.5 text-xs">
                <Store className="w-3.5 h-3.5" />
                Partner as Seller
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-forest hover:bg-sand/60 rounded-md"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-sand bg-ivory px-4 pt-3 pb-6 space-y-4">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search vegan products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-sand rounded-full text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
            />
            <Search className="w-4 h-4 text-charcoal-light absolute left-3 top-2.5" />
          </form>

          <nav className="flex flex-col space-y-2 text-sm font-medium text-charcoal">
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sand/60"
            >
              Product Catalogue
            </Link>
            <Link
              href="/categories"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sand/60"
            >
              All Categories
            </Link>
            <Link
              href="/brands"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sand/60"
            >
              Verified Brands
            </Link>
            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sand/60"
            >
              How It Works & Verification
            </Link>
            <Link
              href="/journal"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sand/60"
            >
              Ethical Journal
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-sand/60 text-earth font-semibold"
            >
              Admin Moderation Portal
            </Link>
          </nav>

          <div className="pt-2">
            <Link href="/seller/apply" onClick={() => setMobileMenuOpen(false)} className="w-full block">
              <Button variant="primary" className="w-full">
                Apply as a Founding Seller
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
