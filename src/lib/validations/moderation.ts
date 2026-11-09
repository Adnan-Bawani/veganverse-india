import { z } from 'zod';

export const sellerModerationSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required'),
  action: z.enum(['approve', 'reject', 'request_changes', 'suspend']),
  notes: z.string().min(5, 'Mandatory audit notes required for any status modification'),
});

export const productModerationSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  action: z.enum(['approve', 'reject', 'unpublish']),
  trustStatus: z.enum(['seller_declared', 'evidence_reviewed', 'third_party_certified']).optional(),
  trustExplanation: z.string().optional(),
  moderationReason: z.string().min(5, 'Moderation justification is required'),
});

export const enquiryStatusSchema = z.object({
  enquiryId: z.string().min(1, 'Enquiry ID is required'),
  status: z.enum(['new', 'forwarded_to_seller', 'resolved', 'closed']),
  adminNotes: z.string().optional(),
});

