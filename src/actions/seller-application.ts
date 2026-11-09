'use server';

import { sellerApplicationSchema, SellerApplicationInput } from '@/lib/validations/seller-application';
import { memoryApplications, memoryAuditLogs } from '@/lib/data-service';
import { SellerApplication } from '@/types';
import { revalidatePath } from 'next/cache';

export interface ApplicationActionResult {
  success: boolean;
  message: string;
  applicationId?: string;
  errors?: Record<string, string[]>;
}

export async function submitSellerApplicationAction(data: SellerApplicationInput): Promise<ApplicationActionResult> {
  const result = sellerApplicationSchema.safeParse(data);

  if (!result.success) {
    const formattedErrors: Record<string, string[]> = {};
    for (const [key, issues] of Object.entries(result.error.flatten().fieldErrors)) {
      if (issues) formattedErrors[key] = issues;
    }
    return {
      success: false,
      message: 'Please resolve the highlighted validation errors.',
      errors: formattedErrors,
    };
  }

  const validated = result.data;

  const newApplication: SellerApplication = {
    id: `app-${Date.now()}`,
    legal_name: validated.legalName,
    trading_name: validated.tradingName,
    business_type: validated.businessType,
    country: validated.country,
    contact_person_name: validated.contactPersonName,
    contact_email: validated.contactEmail,
    contact_phone: validated.contactPhone,
    website_or_social: validated.websiteOrSocial || null,
    registered_address: {
      street: validated.street,
      city: validated.city,
      state: validated.state,
      postal_code: validated.postalCode,
      country: validated.country,
    },
    tax_identifiers: {
      pan: validated.panNumber || undefined,
      gstin: validated.gstinNumber || undefined,
    },
    category_ids: validated.categoryIds,
    sample_products_description: validated.sampleProductsDescription,
    vegan_claim_declaration: validated.veganClaimDeclaration,
    manufacturing_sourcing_details: validated.manufacturingSourcingDetails || null,
    shipping_returns_summary: validated.shippingReturnsSummary,
    has_selling_rights: validated.hasSellingRights,
    status: 'under_review',
    created_at: new Date().toISOString(),
  };

  memoryApplications.unshift(newApplication);

  // Record audit log
  memoryAuditLogs.unshift({
    id: `aud-${Date.now()}`,
    actor_name: validated.contactPersonName,
    action: 'seller_application_submitted',
    target_entity: 'seller_application',
    target_id: newApplication.id,
    metadata: {
      legal_name: validated.legalName,
      trading_name: validated.tradingName,
      contact_email: validated.contactEmail,
    },
    created_at: new Date().toISOString(),
  });

  revalidatePath('/admin/sellers');

  return {
    success: true,
    message: `Thank you for applying to partner with VeganVerse! Your application (#${newApplication.id}) is now in our curation queue. Our verification team will review your vegan declarations and business credentials within 2 business days.`,
    applicationId: newApplication.id,
  };
}
