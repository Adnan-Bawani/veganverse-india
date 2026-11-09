import { z } from 'zod';

export const enquirySchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  sellerId: z.string().min(1, 'Seller ID is required'),
  customerName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  customerEmail: z.string().email('Please enter a valid email address'),
  customerPhone: z
    .string()
    .optional()
    .refine((val) => !val || /^[+]?[\d\s-]{10,15}$/.test(val), {
      message: 'Please enter a valid phone number (10-15 digits)',
    }),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters long')
    .max(2000, 'Message cannot exceed 2000 characters'),
  honeypot: z.string().max(0, 'Spam bot detected').optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
