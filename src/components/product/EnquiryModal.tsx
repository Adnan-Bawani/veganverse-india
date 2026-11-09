'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Product } from '@/types';
import { submitEnquiryAction } from '@/actions/enquiry';
import { CheckCircle2, MessageSquare } from 'lucide-react';

interface EnquiryModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function EnquiryModal({ product, isOpen, onClose }: EnquiryModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const res = await submitEnquiryAction({
      productId: product.id,
      sellerId: product.seller_id,
      customerName,
      customerEmail,
      customerPhone,
      message,
      honeypot,
    });

    setIsLoading(false);

    if (res.success) {
      setSuccessMessage(res.message);
    } else {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        setErrors({ general: [res.message] });
      }
    }
  };

  const handleReset = () => {
    setSuccessMessage(null);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setMessage('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleReset}
      title={`Enquire about ${product.name}`}
      description={
        product.seller
          ? `Direct enquiry to maker: ${product.seller.brand_name}`
          : 'Send your purchase or wholesale questions directly to the brand.'
      }
      maxWidth="md"
    >
      {successMessage ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-forest">Enquiry Sent Successfully</h3>
          <p className="text-sm text-charcoal-muted max-w-sm mx-auto leading-relaxed">{successMessage}</p>
          <Button variant="outline" onClick={handleReset} className="mt-4">
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
              {errors.general.join(', ')}
            </div>
          )}

          {/* Anti-spam honeypot */}
          <input
            type="text"
            name="honeypot"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <Input
            label="Your Full Name"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="e.g. Radhika Sharma"
            error={errors.customerName?.[0]}
          />

          <Input
            label="Your Email Address"
            type="email"
            required
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="radhika@example.com"
            error={errors.customerEmail?.[0]}
            helperText="The seller will reply directly to this email."
          />

          <Input
            label="Mobile / WhatsApp Number (Optional)"
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            placeholder="+91 98765 43210"
            error={errors.customerPhone?.[0]}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
              Message or Specific Requirements <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Inquire about ingredients, custom sizes, bulk orders, or dispatch timelines..."
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-sand rounded-sm text-charcoal placeholder:text-charcoal-light focus:outline-none focus:ring-2 focus:ring-forest"
            />
            {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message[0]}</p>}
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-sand">
            <Button type="button" variant="ghost" onClick={handleReset}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isLoading} className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Send Enquiry
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
