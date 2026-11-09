'use server';

import { sellerModerationSchema, productModerationSchema, enquiryStatusSchema } from '@/lib/validations/moderation';
import { memoryApplications, memoryAuditLogs, memoryEnquiries, SEED_PRODUCTS, SEED_STORES } from '@/lib/data-service';
import { revalidatePath } from 'next/cache';

export async function moderateSellerAction(formData: { applicationId: string; action: 'approve' | 'reject' | 'request_changes' | 'suspend'; notes: string }) {
  const result = sellerModerationSchema.safeParse(formData);
  if (!result.success) {
    return { success: false, message: 'Invalid moderation payload' };
  }

  const { applicationId, action, notes } = result.data;
  const app = memoryApplications.find((a) => a.id === applicationId);

  if (!app) {
    return { success: false, message: 'Application not found' };
  }

  if (action === 'approve') {
    app.status = 'approved';
    app.moderation_notes = notes;

    // Check if store already exists or add to SEED_STORES
    const existingStore = SEED_STORES.find((s) => s.business_email === app.contact_email);
    if (!existingStore) {
      SEED_STORES.push({
        id: `s-${Date.now()}`,
        business_legal_name: app.legal_name,
        brand_name: app.trading_name,
        slug: app.trading_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: app.vegan_claim_declaration,
        business_email: app.contact_email,
        business_phone: app.contact_phone,
        country_of_registration: app.country,
        shipping_policy: app.shipping_returns_summary,
        status: 'approved',
        created_at: new Date().toISOString(),
      });
    }
  } else if (action === 'reject') {
    app.status = 'rejected';
    app.moderation_notes = notes;
  } else if (action === 'request_changes') {
    app.status = 'changes_requested';
    app.moderation_notes = notes;
  } else if (action === 'suspend') {
    app.status = 'suspended';
    app.moderation_notes = notes;
  }

  memoryAuditLogs.unshift({
    id: `aud-${Date.now()}`,
    actor_name: 'Lead Compliance Officer',
    action: `seller_${action}`,
    target_entity: 'seller_application',
    target_id: applicationId,
    metadata: { notes, brand_name: app.trading_name },
    created_at: new Date().toISOString(),
  });

  revalidatePath('/admin');
  revalidatePath('/admin/sellers');
  revalidatePath('/brands');

  return { success: true, message: `Application status updated to ${app.status}.` };
}

export async function moderateProductAction(formData: {
  productId: string;
  action: 'approve' | 'reject' | 'unpublish';
  trustStatus?: 'seller_declared' | 'evidence_reviewed' | 'third_party_certified';
  trustExplanation?: string;
  moderationReason: string;
}) {
  const result = productModerationSchema.safeParse(formData);
  if (!result.success) {
    return { success: false, message: 'Validation failed on product moderation input.' };
  }

  const { productId, action, trustStatus, trustExplanation, moderationReason } = result.data;
  const product = SEED_PRODUCTS.find((p) => p.id === productId);

  if (!product) {
    return { success: false, message: 'Product listing not found.' };
  }

  if (action === 'approve') {
    product.status = 'approved';
    if (trustStatus) product.vegan_status = trustStatus;
    if (trustExplanation) product.vegan_status_explanation = trustExplanation;
    product.moderation_reason = moderationReason;
  } else if (action === 'reject') {
    product.status = 'rejected';
    product.moderation_reason = moderationReason;
  } else if (action === 'unpublish') {
    product.status = 'suspended';
    product.moderation_reason = moderationReason;
  }

  memoryAuditLogs.unshift({
    id: `aud-${Date.now()}`,
    actor_name: 'Moderation Officer',
    action: `product_${action}`,
    target_entity: 'product',
    target_id: productId,
    metadata: { product_name: product.name, reason: moderationReason, trust_tier: product.vegan_status },
    created_at: new Date().toISOString(),
  });

  revalidatePath('/admin/products');
  revalidatePath('/shop');
  revalidatePath(`/product/${product.slug}`);

  return { success: true, message: `Product "${product.name}" updated to ${product.status}.` };
}

export async function updateEnquiryStatusAction(formData: {
  enquiryId: string;
  status: 'new' | 'forwarded_to_seller' | 'resolved' | 'closed';
  adminNotes?: string;
}) {
  const result = enquiryStatusSchema.safeParse(formData);
  if (!result.success) {
    return { success: false, message: 'Invalid enquiry payload.' };
  }

  const { enquiryId, status, adminNotes } = result.data;
  const enquiry = memoryEnquiries.find((e) => e.id === enquiryId);

  if (!enquiry) {
    return { success: false, message: 'Enquiry record not found.' };
  }

  enquiry.status = status;
  if (adminNotes) enquiry.admin_notes = adminNotes;

  memoryAuditLogs.unshift({
    id: `aud-${Date.now()}`,
    actor_name: 'Support Admin',
    action: 'enquiry_status_updated',
    target_entity: 'enquiry',
    target_id: enquiryId,
    metadata: { status, adminNotes },
    created_at: new Date().toISOString(),
  });

  revalidatePath('/admin/enquiries');

  return { success: true, message: `Enquiry #${enquiryId} status updated to ${status}.` };
}
