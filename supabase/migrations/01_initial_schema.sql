-- ============================================================================
-- GLOBAL VEGAN MARKETPLACE — DATABASE INITIALIZATION & MIGRATIONS
-- Phase 1: Catalogue & Enquiry MVP
-- ============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Enumerated Types
DO $$ BEGIN
    CREATE TYPE user_role_type AS ENUM ('customer', 'seller', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE entity_status_type AS ENUM ('draft', 'under_review', 'changes_requested', 'approved', 'rejected', 'suspended');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE vegan_verification_type AS ENUM ('seller_declared', 'evidence_reviewed', 'third_party_certified');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE enquiry_status_type AS ENUM ('new', 'forwarded_to_seller', 'resolved', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 4. User Roles Table (Strict separation of privileges)
CREATE TABLE IF NOT EXISTS public.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role user_role_type NOT NULL DEFAULT 'customer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    CONSTRAINT unique_user_role UNIQUE (user_id, role)
);

-- 5. Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 6. Seller Stores Table
CREATE TABLE IF NOT EXISTS public.seller_stores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    business_legal_name TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    tagline TEXT,
    description TEXT,
    logo_url TEXT,
    banner_url TEXT,
    business_email TEXT NOT NULL,
    business_phone TEXT,
    website_url TEXT,
    instagram_url TEXT,
    country_of_registration TEXT NOT NULL DEFAULT 'IN',
    shipping_policy TEXT,
    return_policy TEXT,
    status entity_status_type NOT NULL DEFAULT 'under_review',
    moderation_reason TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 7. Seller Applications Table
CREATE TABLE IF NOT EXISTS public.seller_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    applicant_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    legal_name TEXT NOT NULL,
    trading_name TEXT NOT NULL,
    business_type TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'IN',
    contact_person_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    website_or_social TEXT,
    registered_address JSONB NOT NULL,
    tax_identifiers JSONB, -- Private: PAN, GSTIN
    category_ids UUID[] NOT NULL DEFAULT '{}',
    sample_products_description TEXT,
    vegan_claim_declaration TEXT NOT NULL,
    manufacturing_sourcing_details TEXT,
    shipping_returns_summary TEXT,
    has_selling_rights BOOLEAN NOT NULL DEFAULT FALSE,
    status entity_status_type NOT NULL DEFAULT 'under_review',
    reviewer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    moderation_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 8. Seller Documents Table (Private Storage Vault Pointers)
CREATE TABLE IF NOT EXISTS public.seller_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES public.seller_applications(id) ON DELETE CASCADE,
    store_id UUID REFERENCES public.seller_stores(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL, -- 'gstin_proof', 'pan_card', 'fssai_license', 'vegan_certificate'
    file_path TEXT NOT NULL, -- Private storage bucket object key
    original_filename TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verified_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 9. Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES public.seller_stores(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    sku TEXT NOT NULL UNIQUE,
    short_description TEXT,
    full_description TEXT NOT NULL,
    ingredients_or_materials TEXT NOT NULL,
    dimensions_or_weight TEXT,
    care_instructions TEXT,
    base_price NUMERIC(12, 2) NOT NULL CHECK (base_price >= 0),
    currency TEXT NOT NULL DEFAULT 'INR',
    vegan_status vegan_verification_type NOT NULL DEFAULT 'seller_declared',
    vegan_status_explanation TEXT,
    status entity_status_type NOT NULL DEFAULT 'under_review',
    moderation_reason TEXT,
    country_of_origin TEXT NOT NULL DEFAULT 'IN',
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 10. Product Variants Table (Structured records)
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    sku TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    attributes JSONB NOT NULL DEFAULT '{}',
    price_override NUMERIC(12, 2) CHECK (price_override >= 0),
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 11. Product Images Table
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 12. Product Vegan Evidence Table
CREATE TABLE IF NOT EXISTS public.product_evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    evidence_type TEXT NOT NULL, -- 'lab_report', 'supplier_declaration', 'certificate'
    issuing_body TEXT,
    certificate_number TEXT,
    file_path TEXT NOT NULL, -- Reference to private storage
    status entity_status_type NOT NULL DEFAULT 'under_review',
    reviewer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    decision_reason TEXT,
    valid_from DATE,
    valid_until DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    reviewed_at TIMESTAMPTZ
);

-- 13. Customer Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    seller_id UUID NOT NULL REFERENCES public.seller_stores(id) ON DELETE RESTRICT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    message TEXT NOT NULL,
    status enquiry_status_type NOT NULL DEFAULT 'new',
    admin_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 14. Audit Logs Table (Tamper-evident administrative trace)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    target_entity TEXT NOT NULL,
    target_id UUID NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}',
    ip_address INET,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 15. Content & Policy Pages Table
CREATE TABLE IF NOT EXISTS public.content_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    body_markdown TEXT NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT TIMEZONE('utc', NOW())
);

-- 16. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON public.products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_products_vegan_status ON public.products(vegan_status);
CREATE INDEX IF NOT EXISTS idx_product_variants_product_id ON public.product_variants(product_id);
CREATE INDEX IF NOT EXISTS idx_product_images_product_id ON public.product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_seller_stores_slug ON public.seller_stores(slug);
CREATE INDEX IF NOT EXISTS idx_seller_stores_status ON public.seller_stores(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_seller_id ON public.enquiries(seller_id);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON public.enquiries(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_target ON public.audit_logs(target_entity, target_id);

-- 17. Security Definer Helper Functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_store_owner(store_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.seller_stores
    WHERE id = store_uuid AND owner_id = auth.uid()
  );
$$;

-- 18. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_pages ENABLE ROW LEVEL SECURITY;

-- 19. RLS Policies
-- Products: Unapproved products MUST NEVER appear publicly
DROP POLICY IF EXISTS "Public read approved products" ON public.products;
CREATE POLICY "Public read approved products" ON public.products
FOR SELECT USING (
  status = 'approved' AND 
  EXISTS (SELECT 1 FROM public.seller_stores WHERE seller_stores.id = products.seller_id AND seller_stores.status = 'approved')
);

DROP POLICY IF EXISTS "Admin full access products" ON public.products;
CREATE POLICY "Admin full access products" ON public.products
FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Seller manage own products" ON public.products;
CREATE POLICY "Seller manage own products" ON public.products
FOR ALL TO authenticated
USING (public.is_store_owner(seller_id))
WITH CHECK (public.is_store_owner(seller_id));

-- Seller Stores: Only approved stores visible publicly
DROP POLICY IF EXISTS "Public read approved stores" ON public.seller_stores;
CREATE POLICY "Public read approved stores" ON public.seller_stores
FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Admin full access stores" ON public.seller_stores;
CREATE POLICY "Admin full access stores" ON public.seller_stores
FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Seller view own store" ON public.seller_stores;
CREATE POLICY "Seller view own store" ON public.seller_stores
FOR SELECT TO authenticated
USING (owner_id = auth.uid());

-- Categories: Public read active
DROP POLICY IF EXISTS "Public read active categories" ON public.categories;
CREATE POLICY "Public read active categories" ON public.categories
FOR SELECT USING (is_active = TRUE);

DROP POLICY IF EXISTS "Admin manage categories" ON public.categories;
CREATE POLICY "Admin manage categories" ON public.categories
FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Enquiries: Public insert, Admin and Seller read
DROP POLICY IF EXISTS "Public can submit enquiries" ON public.enquiries;
CREATE POLICY "Public can submit enquiries" ON public.enquiries
FOR INSERT TO anon, authenticated
WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admin view all enquiries" ON public.enquiries;
CREATE POLICY "Admin view all enquiries" ON public.enquiries
FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Seller view assigned enquiries" ON public.enquiries;
CREATE POLICY "Seller view assigned enquiries" ON public.enquiries
FOR SELECT TO authenticated
USING (public.is_store_owner(seller_id));

-- Applications: Anyone can submit application, only admin can view/manage
DROP POLICY IF EXISTS "Anyone can submit application" ON public.seller_applications;
CREATE POLICY "Anyone can submit application" ON public.seller_applications
FOR INSERT TO anon, authenticated
WITH CHECK (TRUE);

DROP POLICY IF EXISTS "Admin manage applications" ON public.seller_applications;
CREATE POLICY "Admin manage applications" ON public.seller_applications
FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Seller Documents: Only Admin can access
DROP POLICY IF EXISTS "Admin manage seller documents" ON public.seller_documents;
CREATE POLICY "Admin manage seller documents" ON public.seller_documents
FOR ALL TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Audit Logs: Admin read-only
DROP POLICY IF EXISTS "Admin read audit logs" ON public.audit_logs;
CREATE POLICY "Admin read audit logs" ON public.audit_logs
FOR SELECT TO authenticated
USING (public.is_admin());
