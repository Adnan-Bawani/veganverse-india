'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertCircle, RotateCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6 bg-white p-8 sm:p-10 rounded-lg border border-sand shadow-sm">
        <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h2 className="font-serif text-2xl font-bold text-forest">Application Notice</h2>
          <p className="text-xs text-charcoal-muted leading-relaxed">
            An unexpected error occurred while rendering this module. Our logging system has flagged the event.
          </p>
        </div>
        <div className="pt-2">
          <Button onClick={() => reset()} variant="outline" className="gap-2 text-xs">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
