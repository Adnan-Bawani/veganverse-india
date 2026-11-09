'use server';

import { enquirySchema, EnquiryInput } from '@/lib/validations/enquiry';
import { memoryEnquiries, memoryAuditLogs, SEED_PRODUCTS, SEED_STORES } from '@/lib/data-service';
import { CustomerEnquiry } from '@/types';
import { revalidatePath } from 'next/cache';

export interface ActionResult {
  success: boolean;
  message: string;
  enquiryId?: string;
  errors?: Record<string, string[]>;
}

export async function submitEnquiryAction(data: EnquiryInput): Promise<ActionResult> {
  const result = enquirySchema.safeParse(data);

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

  const { productId, sellerId, customerName, customerEmail, customerPhone, message } = result.data;

  // Retrieve product and seller context
  const product = SEED_PRODUCTS.find((p) => p.id === productId);
  const seller = SEED_STORES.find((s) => s.id === sellerId);

  const newEnquiry: CustomerEnquiry = {
    id: `enq-${Date.now()}`,
    product_id: productId,
    seller_id: sellerId,
    customer_name: customerName,
    customer_email: customerEmail,
    customer_phone: customerPhone || null,
    message,
    status: 'new',
    created_at: new Date().toISOString(),
    product: product ? { id: product.id, name: product.name, slug: product.slug } : undefined,
    seller: seller ? { id: seller.id, brand_name: seller.brand_name, business_email: seller.business_email } : undefined,
  };

  memoryEnquiries.unshift(newEnquiry);

  // Record audit log
  memoryAuditLogs.unshift({
    id: `aud-${Date.now()}`,
    actor_name: 'Customer System',
    action: 'enquiry_submitted',
    target_entity: 'enquiry',
    target_id: newEnquiry.id,
    metadata: {
      product_name: product?.name || productId,
      seller_brand: seller?.brand_name || sellerId,
      customer_email: customerEmail,
    },
    created_at: new Date().toISOString(),
  });

  revalidatePath('/admin/enquiries');

  return {
    success: true,
    message: `Thank you, ${customerName}! Your enquiry has been received and forwarded directly to ${seller?.brand_name || 'the brand'}. They typically reply within 24 hours.`,
    enquiryId: newEnquiry.id,
  };
}
