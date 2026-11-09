import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'VeganVerse India — Curated Multi-Vendor Vegan Marketplace',
    template: '%s | VeganVerse India',
  },
  description: 'India\'s premier multi-vendor discovery platform for 100% cruelty-free, animal-free verified products from independent ethical makers.',
  keywords: ['vegan marketplace', 'cruelty-free products india', 'vegan food online', 'plant-based skincare', 'ethical vegan fashion', 'peta approved'],
  authors: [{ name: 'VeganVerse India' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'VeganVerse India',
    title: 'VeganVerse India — Curated Multi-Vendor Vegan Marketplace',
    description: 'Discover thoughtfully selected vegan products from verified independent brands.',
  },
};

export const viewport: Viewport = {
  themeColor: '#344C3D',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col selection:bg-forest selection:text-ivory">
        {children}
      </body>
    </html>
  );
}
