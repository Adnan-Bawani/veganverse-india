import Link from 'next/link';
import { Leaf, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6 bg-white p-8 sm:p-10 rounded-lg border border-sand shadow-sm">
        <div className="w-12 h-12 rounded-full bg-sand/60 text-forest flex items-center justify-center mx-auto">
          <Leaf className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-forest">Page Not Found</h1>
          <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
            The listing, category, or page you were looking for could not be found or may have been unlisted under compliance review.
          </p>
        </div>
        <div className="pt-2">
          <Link href="/">
            <Button variant="primary" className="gap-2 text-xs">
              <ArrowLeft className="w-4 h-4" />
              Return to Storefront
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

