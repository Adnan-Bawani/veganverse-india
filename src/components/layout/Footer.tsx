import Link from 'next/link';
import { Leaf, ShieldCheck, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-charcoal text-sand/80 pt-16 pb-12 border-t border-sand/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-sand/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-forest text-ivory flex items-center justify-center font-serif font-bold text-lg">
                V
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-ivory">
                VeganVerse India
              </span>
            </div>
            <p className="text-sm text-sand/70 max-w-sm leading-relaxed">
              India&apos;s premier curated multi-vendor ethical marketplace. Discover independent, cruelty-free makers of food, beauty, fashion, and lifestyle products, verified with absolute transparency.
            </p>
            <div className="flex items-center gap-2 text-xs text-sand/60">
              <ShieldCheck className="w-4 h-4 text-earth" />
              <span>100% Animal-Free • No Fake Reviews • Cured Makers</span>
            </div>
          </div>

          {/* Catalogue Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ivory font-sans">
              Discover
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="hover:text-ivory transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-ivory transition-colors">
                  Product Categories
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-ivory transition-colors">
                  Verified Brands
                </Link>
              </li>
              <li>
                <Link href="/category/food-and-beverages" className="hover:text-ivory transition-colors">
                  Plant Pantry & Cheeses
                </Link>
              </li>
              <li>
                <Link href="/category/beauty-and-personal-care" className="hover:text-ivory transition-colors">
                  Cruelty-Free Skincare
                </Link>
              </li>
            </ul>
          </div>

          {/* Seller & Platform Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ivory font-sans">
              Ecosystem
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sell" className="hover:text-ivory transition-colors">
                  Sell with Us
                </Link>
              </li>
              <li>
                <Link href="/seller/apply" className="hover:text-ivory transition-colors">
                  Seller Application
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-ivory transition-colors">
                  Verification Standards
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-ivory transition-colors">
                  Ethical Journal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-ivory text-earth font-medium transition-colors">
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Policies */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ivory font-sans">
              Trust & Legal
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/policies/privacy" className="hover:text-ivory transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-ivory transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-ivory transition-colors">
                  Returns & Disputes
                </Link>
              </li>
              <li>
                <Link href="/policies/seller-agreement" className="hover:text-ivory transition-colors">
                  Seller Agreement
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ivory transition-colors">
                  Grievance Officer & Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclosures */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-sand/50 gap-4">
          <p>
            © {new Date().getFullYear()} VeganVerse India. All rights reserved. Registered under Indian E-Commerce Marketplace Regulations.
          </p>
          <div className="flex items-center gap-6">
            <span>Marketplace Model • Direct Maker Dispatch</span>
            <span>Made with Care in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
