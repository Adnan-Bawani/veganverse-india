export type UserRoleType = 'customer' | 'seller' | 'admin';
export type EntityStatusType = 'draft' | 'under_review' | 'changes_requested' | 'approved' | 'rejected' | 'suspended';
export type VeganVerificationType = 'seller_declared' | 'evidence_reviewed' | 'third_party_certified';
export type EnquiryStatusType = 'new' | 'forwarded_to_seller' | 'resolved' | 'closed';

export interface Category {
  id: string;
  parent_id?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface SellerStore {
  id: string;
  owner_id?: string | null;
  business_legal_name: string;
  brand_name: string;
  slug: string;
  tagline?: string | null;
  description?: string | null;
  logo_url?: string | null;
  banner_url?: string | null;
  business_email: string;
  business_phone?: string | null;
  website_url?: string | null;
  instagram_url?: string | null;
  country_of_registration: string;
  shipping_policy?: string | null;
  return_policy?: string | null;
  status: EntityStatusType;
  moderation_reason?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  title: string;
  attributes: Record<string, string>;
  price_override?: number | null;
  is_default: boolean;
  stock_quantity: number;
  is_available: boolean;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  is_primary: boolean;
  created_at: string;
}

export interface ProductEvidence {
  id: string;
  product_id: string;
  evidence_type: string;
  issuing_body?: string | null;
  certificate_number?: string | null;
  file_path: string;
  status: EntityStatusType;
  reviewer_id?: string | null;
  decision_reason?: string | null;
  valid_from?: string | null;
  valid_until?: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  seller_id: string;
  category_id: string;
  name: string;
  slug: string;
  sku: string;
  short_description?: string | null;
  full_description: string;
  ingredients_or_materials: string;
  dimensions_or_weight?: string | null;
  care_instructions?: string | null;
  base_price: number;
  currency: string;
  vegan_status: VeganVerificationType;
  vegan_status_explanation?: string | null;
  status: EntityStatusType;
  moderation_reason?: string | null;
  country_of_origin: string;
  created_at: string;
  updated_at?: string;

  // Joined relationships
  seller?: SellerStore;
  category?: Category;
  variants?: ProductVariant[];
  images?: ProductImage[];
  evidence?: ProductEvidence[];
}

export interface SellerApplication {
  id: string;
  applicant_id?: string | null;
  legal_name: string;
  trading_name: string;
  business_type: string;
  country: string;
  contact_person_name: string;
  contact_email: string;
  contact_phone: string;
  website_or_social?: string | null;
  registered_address: {
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  tax_identifiers?: {
    pan?: string;
    gstin?: string;
  } | null;
  category_ids: string[];
  sample_products_description?: string | null;
  vegan_claim_declaration: string;
  manufacturing_sourcing_details?: string | null;
  shipping_returns_summary?: string | null;
  has_selling_rights: boolean;
  status: EntityStatusType;
  reviewer_id?: string | null;
  moderation_notes?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface CustomerEnquiry {
  id: string;
  product_id: string;
  seller_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  message: string;
  status: EnquiryStatusType;
  admin_notes?: string | null;
  created_at: string;
  updated_at?: string;

  // Joined fields
  product?: {
    id: string;
    name: string;
    slug: string;
  };
  seller?: {
    id: string;
    brand_name: string;
    business_email: string;
  };
}

export interface AuditLog {
  id: string;
  actor_id?: string | null;
  actor_name?: string | null;
  action: string;
  target_entity: string;
  target_id: string;
  metadata: Record<string, any>;
  created_at: string;
}
