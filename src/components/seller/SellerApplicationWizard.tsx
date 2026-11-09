'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Category } from '@/types';
import { submitSellerApplicationAction } from '@/actions/seller-application';
import { CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft, UploadCloud } from 'lucide-react';

interface SellerApplicationWizardProps {
  categories: Category[];
}

export function SellerApplicationWizard({ categories }: SellerApplicationWizardProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Form State
  const [formData, setFormData] = useState({
    legalName: '',
    tradingName: '',
    businessType: 'Private Limited' as const,
    country: 'IN',
    contactPersonName: '',
    contactEmail: '',
    contactPhone: '',
    websiteOrSocial: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    panNumber: '',
    gstinNumber: '',
    categoryIds: [] as string[],
    sampleProductsDescription: '',
    veganClaimDeclaration: '',
    manufacturingSourcingDetails: '',
    shippingReturnsSummary: '',
    hasSellingRights: true as const,
    acceptsTerms: true as const,
  });

  const toggleCategory = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(id)
        ? prev.categoryIds.filter((c) => c !== id)
        : [...prev.categoryIds, id],
    }));
  };

  const handleNext = () => {
    // Validate current step
    setErrors({});
    if (step === 1) {
      if (!formData.legalName || !formData.tradingName || !formData.contactPersonName || !formData.contactEmail || !formData.contactPhone) {
        setErrors({ general: ['Please fill in all mandatory business identity fields.'] });
        return;
      }
    } else if (step === 2) {
      if (!formData.street || !formData.city || !formData.state || !formData.postalCode) {
        setErrors({ general: ['Please fill in your complete registered address.'] });
        return;
      }
    } else if (step === 3) {
      if (formData.categoryIds.length === 0 || !formData.sampleProductsDescription) {
        setErrors({ general: ['Please select at least one category and describe your sample products.'] });
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const res = await submitSellerApplicationAction(formData);
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

  if (successMessage) {
    return (
      <div className="bg-white rounded-lg border border-sand p-8 text-center space-y-6 max-w-xl mx-auto shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-forest">Application Received</h2>
        <p className="text-sm text-charcoal-muted leading-relaxed">{successMessage}</p>
        <div className="pt-4 border-t border-sand flex justify-center">
          <a href="/shop" className="text-xs font-semibold text-forest underline uppercase tracking-wider">
            Explore Current Marketplace Catalogue
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-sand shadow-sm overflow-hidden max-w-3xl mx-auto">
      {/* Progress Header */}
      <div className="bg-ivory border-b border-sand px-6 py-4">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-forest mb-2">
          <span>Step {step} of 4</span>
          <span>
            {step === 1 && '1. Business Identity'}
            {step === 2 && '2. Address & Compliance'}
            {step === 3 && '3. Category & Samples'}
            {step === 4 && '4. Vegan Claims & Review'}
          </span>
        </div>
        <div className="w-full bg-sand h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-forest h-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
        {errors.general && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
            {errors.general.join(', ')}
          </div>
        )}

        {/* STEP 1: BUSINESS IDENTITY */}
        {step === 1 && (
          <div className="space-y-5">
            <h3 className="font-serif text-lg font-bold text-forest pb-2 border-b border-sand">
              Business & Maker Identity
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Legal Registered Business Name"
                required
                value={formData.legalName}
                onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                placeholder="e.g. Pure Flora Botanicals LLP"
                error={errors.legalName?.[0]}
              />

              <Input
                label="Brand / Trading Name"
                required
                value={formData.tradingName}
                onChange={(e) => setFormData({ ...formData, tradingName: e.target.value })}
                placeholder="e.g. Flora & Roots"
                error={errors.tradingName?.[0]}
                helperText="This name will appear on your public storefront."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                  Business Structure
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-sand rounded-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
                >
                  <option value="Proprietorship">Sole Proprietorship</option>
                  <option value="Partnership">Partnership Firm</option>
                  <option value="LLP">Limited Liability Partnership (LLP)</option>
                  <option value="Private Limited">Private Limited Company</option>
                  <option value="Other">Other Ethical Enterprise</option>
                </select>
              </div>

              <Input
                label="Country of Registration"
                disabled
                value="India (IN)"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Primary Contact Person"
                required
                value={formData.contactPersonName}
                onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
                placeholder="Founder / Business Lead"
                error={errors.contactPersonName?.[0]}
              />

              <Input
                label="Official Business Email"
                type="email"
                required
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                placeholder="founders@yourbrand.in"
                error={errors.contactEmail?.[0]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Business Contact Phone"
                type="tel"
                required
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                placeholder="+91 98450 12345"
                error={errors.contactPhone?.[0]}
              />

              <Input
                label="Website or Instagram Profile (Optional)"
                value={formData.websiteOrSocial}
                onChange={(e) => setFormData({ ...formData, websiteOrSocial: e.target.value })}
                placeholder="https://yourbrand.in or https://instagram.com/..."
                error={errors.websiteOrSocial?.[0]}
              />
            </div>
          </div>
        )}

        {/* STEP 2: ADDRESS & TAX COMPLIANCE */}
        {step === 2 && (
          <div className="space-y-5">
            <h3 className="font-serif text-lg font-bold text-forest pb-2 border-b border-sand">
              Registered Office & Regulatory Compliance
            </h3>

            <div className="bg-sand/30 border border-sand p-3.5 rounded text-xs text-charcoal-muted flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
              <p>
                <strong>Confidentiality Notice:</strong> Your PAN and GSTIN numbers are encrypted and stored in our private vault. They are accessible exclusively to platform compliance officers and are never disclosed publicly.
              </p>
            </div>

            <Input
              label="Registered Street Address"
              required
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              placeholder="Building No., Street, Industrial Area / locality"
              error={errors.street?.[0]}
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="City"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Bengaluru"
                error={errors.city?.[0]}
              />

              <Input
                label="State"
                required
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="e.g. Karnataka"
                error={errors.state?.[0]}
              />

              <Input
                label="PIN Code"
                required
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                placeholder="560001"
                error={errors.postalCode?.[0]}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Input
                label="Business PAN (Permanent Account Number)"
                value={formData.panNumber}
                onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                placeholder="ABCDE1234F"
                error={errors.panNumber?.[0]}
                helperText="Required for business verification in India."
              />

              <Input
                label="GSTIN Identifier (If Registered)"
                value={formData.gstinNumber}
                onChange={(e) => setFormData({ ...formData, gstinNumber: e.target.value.toUpperCase() })}
                placeholder="29ABCDE1234F1Z5"
                error={errors.gstinNumber?.[0]}
                helperText="Required once transactions are enabled in Phase 3."
              />
            </div>
          </div>
        )}

        {/* STEP 3: CATEGORIES & SAMPLES */}
        {step === 3 && (
          <div className="space-y-5">
            <h3 className="font-serif text-lg font-bold text-forest pb-2 border-b border-sand">
              Product Categories & Initial Listings
            </h3>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                Select Your Product Categories <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {categories.map((c) => {
                  const isChecked = formData.categoryIds.includes(c.id);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => toggleCategory(c.id)}
                      className={`p-3 text-left border rounded text-xs font-medium transition-all flex items-center justify-between ${
                        isChecked
                          ? 'border-forest bg-forest text-white shadow-sm'
                          : 'border-sand bg-white text-charcoal hover:border-forest/50'
                      }`}
                    >
                      <span>{c.name}</span>
                      {isChecked && <CheckCircle2 className="w-4 h-4 text-ivory" />}
                    </button>
                  );
                })}
              </div>
              {errors.categoryIds && <p className="text-xs text-red-600 mt-1">{errors.categoryIds[0]}</p>}
            </div>

            <div className="space-y-1.5 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                Sample Products Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={formData.sampleProductsDescription}
                onChange={(e) => setFormData({ ...formData, sampleProductsDescription: e.target.value })}
                placeholder="Briefly describe 2-3 sample products, their retail prices (INR), and packaging..."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-sand rounded-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
              />
              {errors.sampleProductsDescription && (
                <p className="text-xs text-red-600">{errors.sampleProductsDescription[0]}</p>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: VEGAN DECLARATIONS & REVIEW */}
        {step === 4 && (
          <div className="space-y-5">
            <h3 className="font-serif text-lg font-bold text-forest pb-2 border-b border-sand">
              Vegan Verification & Operational Disclosures
            </h3>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                Vegan Standard Declaration <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={formData.veganClaimDeclaration}
                onChange={(e) => setFormData({ ...formData, veganClaimDeclaration: e.target.value })}
                placeholder="Confirm that all raw materials, additives, manufacturing processes, and final products are completely free of animal testing and animal-derived ingredients..."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-sand rounded-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
              />
              {errors.veganClaimDeclaration && (
                <p className="text-xs text-red-600">{errors.veganClaimDeclaration[0]}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                Manufacturing & Sourcing Details (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.manufacturingSourcingDetails}
                onChange={(e) => setFormData({ ...formData, manufacturingSourcingDetails: e.target.value })}
                placeholder="Do you manufacture in-house or via a certified contract facility? Note relevant FSSAI, ISO, or GMP standards."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-sand rounded-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
                Shipping Dispatch & Returns Policy <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={2}
                value={formData.shippingReturnsSummary}
                onChange={(e) => setFormData({ ...formData, shippingReturnsSummary: e.target.value })}
                placeholder="e.g. Dispatches within 24-48 business hours pan-India. 7-day returns for damaged or incorrect deliveries."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-sand rounded-sm text-charcoal focus:outline-none focus:ring-1 focus:ring-forest"
              />
              {errors.shippingReturnsSummary && (
                <p className="text-xs text-red-600">{errors.shippingReturnsSummary[0]}</p>
              )}
            </div>

            <div className="pt-3 border-t border-sand space-y-3">
              <label className="flex items-start gap-2.5 text-xs text-charcoal cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.hasSellingRights}
                  onChange={(e) => setFormData({ ...formData, hasSellingRights: e.target.checked as any })}
                  className="mt-0.5 rounded border-sand text-forest focus:ring-forest"
                />
                <span>
                  <strong>Legal Right to Sell:</strong> I confirm that our business holds the complete legal authority, trademarks, and statutory licenses to manufacture and sell these goods.
                </span>
              </label>

              <label className="flex items-start gap-2.5 text-xs text-charcoal cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.acceptsTerms}
                  onChange={(e) => setFormData({ ...formData, acceptsTerms: e.target.checked as any })}
                  className="mt-0.5 rounded border-sand text-forest focus:ring-forest"
                />
                <span>
                  <strong>Marketplace Terms:</strong> I accept the{' '}
                  <a href="/policies/seller-agreement" target="_blank" className="text-forest underline">
                    Seller Agreement
                  </a>{' '}
                  and understand that listings will only appear publicly after compliance evidence review.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Wizard Navigation Controls */}
        <div className="pt-6 border-t border-sand flex items-center justify-between">
          {step > 1 ? (
            <Button type="button" variant="outline" onClick={() => setStep((prev) => prev - 1)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button type="button" variant="primary" onClick={handleNext} className="gap-2">
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button type="submit" variant="primary" isLoading={isLoading} className="gap-2">
              <UploadCloud className="w-4 h-4" />
              Submit Application
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
