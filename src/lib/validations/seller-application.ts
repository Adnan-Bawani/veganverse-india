import { z } from 'zod';

export const sellerApplicationSchema = z.object({
  legalName: z.string().min(2, 'Legal business name is required').max(150),
  tradingName: z.string().min(2, 'Brand / Trading name is required').max(100),
  businessType: z.enum(['Proprietorship', 'Partnership', 'LLP', 'Private Limited', 'Other'], {
    errorMap: () => ({ message: 'Please select a valid business structure' }),
  }),
  country: z.string().default('IN'),
  contactPersonName: z.string().min(2, 'Contact person name is required').max(100),
  contactEmail: z.string().email('Valid business contact email is required'),
  contactPhone: z
    .string()
    .min(10, 'Valid 10-digit phone number is required')
    .regex(/^[+]?[\d\s-]{10,15}$/, 'Invalid phone number format'),
  websiteOrSocial: z.string().url('Must be a valid URL (http:// or https://)').optional().or(z.literal('')),
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().min(4, 'Postal PIN code is required').max(10),
  panNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(val.trim()), {
      message: 'Invalid Indian PAN format (e.g. ABCDE1234F)',
    }),
  gstinNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(val.trim()), {
      message: 'Invalid Indian GSTIN format (15 characters)',
    }),
  categoryIds: z.array(z.string()).min(1, 'Please select at least one product category'),
  sampleProductsDescription: z.string().min(20, 'Please briefly describe 2-3 sample products you plan to list'),
  veganClaimDeclaration: z
    .string()
    .min(30, 'Please detail how your products, raw materials and processes are 100% animal-free and cruelty-free'),
  manufacturingSourcingDetails: z.string().optional(),
  shippingReturnsSummary: z.string().min(20, 'Please summarize your dispatch timeline and returns policy'),
  hasSellingRights: z.literal(true, {
    errorMap: () => ({ message: 'You must confirm that you hold the legal right to list and sell these products' }),
  }),
  acceptsTerms: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the Marketplace Seller Agreement & Verification Policy' }),
  }),
});

export type SellerApplicationInput = z.infer<typeof sellerApplicationSchema>;
