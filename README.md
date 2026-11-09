# Global Vegan Marketplace — Phase 1 Catalogue MVP

> **A curated, premium multi-vendor vegan marketplace platform connecting independent ethical makers with conscious consumers.**

---

## 🌿 Overview

The **Global Vegan Marketplace** (working brand: **VeganVerse India**) is a production-grade web application built to discover, audit, and showcase 100% cruelty-free, animal-free products. Operating on a multi-vendor discovery model, independent sellers hold inventory and fulfill orders directly, while the platform operates curation, seller onboarding, product moderation, trust verification, and marketplace administration.

### Phase 1 Strategic Scope (Catalogue & Enquiry Pilot)
- **Zero payment gateway / cart risk**: Avoids premature licensing and regulatory exposure under the *Consumer Protection (E-Commerce) Rules 2020* while validating buyer demand and seller supply.
- **Direct High-Intent Customer Enquiries**: Buyers submit structured product enquiries routed directly to independent makers.
- **Three-Tier Vegan Verification Framework**: Transparently labeling products as `seller_declared` (Amber), `evidence_reviewed` (Teal), or `third_party_certified` (Green).
- **Automated Rollback Guarantee**: Any post-approval edit to a product's description or formulation automatically reverts it to `under_review`, preventing unauthorized modifications.
- **Confidential Document Vault**: Sensitive seller identifiers (PAN, GSTIN, proprietary lab certificates) are protected in private storage with expiring signed tokens.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React Server Components, Server Actions)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict typing across schemas, views, and actions)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) (Custom brand tokens: Forest Green `#344C3D`, Warm Ivory `#F4F0E7`, Earth Brown `#815A37`, Charcoal `#242824`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL 15+ with Row Level Security)
- **Validation**: [Zod](https://zod.dev/) (Form input sanitization and boundary validation)
- **Hosting & Edge**: [Vercel](https://vercel.com/) (Zero server management, sub-1.5s mobile LCP)

---

## 🚀 Quick Start & Development

### 1. Prerequisites
- Node.js `18.17` or `20.x` or `22.x`
- npm (or pnpm / yarn)
- Git

### 2. Installation
```bash
git clone <repository-url>
cd global-vegan-marketplace
npm install
```

### 3. Environment Setup
Copy the sample environment file:
```bash
cp .env.example .env.local
```

Configure your environment variables in `.env.local`:
```env
NEXT_PUBLIC_APP_NAME="VeganVerse India"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_SUPPORT_EMAIL="support@veganverse.in"

# Supabase Credentials (optional for local mock testing; required for live DB)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Email Integration
RESEND_API_KEY="re_..."
EMAIL_FROM_ADDRESS="VeganVerse Notifications <notifications@veganverse.in>"
ADMIN_NOTIFICATION_EMAIL="admin@veganverse.in"
```

*Note: The application includes an intelligent local fallback service. Even without live Supabase credentials configured, the entire product catalogue, filters, seller applications, product detail pages, and admin dashboards run immediately out-of-the-box!*

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🗄️ Database Schema & Migrations

The database schema is fully defined in `supabase/migrations/01_initial_schema.sql` and seeded with `supabase/seed.sql`:

1. **`profiles`** & **`user_roles`**: Strict role separation (`customer`, `seller`, `admin`).
2. **`categories`**: Six core verified taxonomy hubs (Food & Beverages, Fashion, Beauty, Footwear, Home & Living, Lifestyle).
3. **`seller_stores`**: Public store identity, policies, and country of registration.
4. **`seller_applications`**: Onboarding submissions with legal entity and contact data.
5. **`seller_documents`**: Pointers to private encrypted storage for PAN/GSTIN and certificates.
6. **`products`**: Public listings with strict RLS (`status = 'approved' AND seller.status = 'approved'`).
7. **`product_variants`**: Relational structured variants (size, color, pack, price override).
8. **`product_images`**: High-resolution gallery images with accessible alt-text.
9. **`enquiries`**: Customer product enquiries routed to independent makers.
10. **`audit_logs`**: Append-only administrative log of all moderation and status decisions.

---

## 📂 Project Architecture

```
global-vegan-marketplace/
├── src/
│   ├── app/
│   │   ├── (storefront)/          # Public marketplace routes
│   │   │   ├── page.tsx           # Premium Homepage
│   │   │   ├── shop/page.tsx      # Full Catalogue with Faceted Filters
│   │   │   ├── categories/page.tsx# Category Directory
│   │   │   ├── category/[slug]/   # Category landing pages
│   │   │   ├── product/[slug]/    # Product Detail Page (PDP)
│   │   │   ├── brands/page.tsx    # Independent Makers Directory
│   │   │   ├── brand/[slug]/      # Individual Brand Storefront
│   │   │   ├── search/page.tsx    # Faceted Search Results
│   │   │   ├── sell/page.tsx      # Seller Recruitment Landing
│   │   │   ├── seller/apply/      # Multi-step Seller Application Wizard
│   │   │   ├── about/             # Mission & Ethos
│   │   │   ├── how-it-works/      # Verification Standards
│   │   │   ├── journal/           # Ethical Living Articles
│   │   │   ├── contact/           # Customer Support & Grievance Officer
│   │   │   ├── faq/               # Frequently Asked Questions
│   │   │   └── policies/          # Privacy, Terms, Returns, Seller Agreement
│   │   ├── admin/                 # Role-guarded Admin Portal
│   │   │   ├── page.tsx           # Overview metrics & triage queues
│   │   │   ├── sellers/           # Seller review & application audit
│   │   │   ├── products/          # Product moderation & trust tier assigner
│   │   │   ├── enquiries/         # Customer enquiry triage & follow-up
│   │   │   ├── categories/        # Category manager
│   │   │   └── audit-logs/        # System audit trail
│   │   ├── sitemap.ts             # Dynamic XML sitemap
│   │   └── robots.ts              # SEO robots configuration
│   ├── components/
│   │   ├── layout/                # AnnouncementBar, Header, Footer
│   │   ├── ui/                    # Button, Badge, Modal, Input
│   │   ├── storefront/            # Hero, CategoryGrid, TrustBanner, HowItWorks
│   │   ├── product/               # ProductCard, Gallery, VariantPicker, EnquiryModal
│   │   ├── seller/                # SellerApplicationWizard
│   │   └── admin/                 # AdminSidebar, AdminHeader, ReviewManagers
│   ├── lib/
│   │   ├── supabase/              # client.ts, server.ts, admin.ts
│   │   ├── validations/           # Zod schemas (enquiry, seller application, moderation)
│   │   ├── data-service.ts        # Data layer with seed fallbacks
│   │   └── utils.ts               # Formatting and currency utilities
│   └── actions/                   # Server Actions (mutations & moderation)
├── supabase/
│   ├── migrations/                # Versioned SQL migration scripts
│   └── seed.sql                   # Initial taxonomy & demonstration seed data
└── tailwind.config.ts             # Design tokens & color palette
```

---

## 🔒 Security & Statutory Compliance

- **Consumer Protection (E-Commerce) Rules, 2020**: Clear disclosures of independent seller legal identities, explicit "Made in India" country of origin labels, and statutory Grievance Redressal officer contact.
- **FSSAI Vegan Food Regulations, 2022**: Mandatory verification of ingredient chains and official license numbers prior to granting third-party certified trust badges.
- **Truth in Advertising**: Zero fake ratings, zero placeholder reviews, and zero unverified certifications.
- **Data Protection**: Strict separation of confidential seller tax records (PAN, GSTIN) in private storage with expiring signed tokens.

---

## 📄 License & Attribution

Designed and developed for the **Global Vegan Marketplace**.  
Proprietary & Confidential • Phase 1 Execution Blueprint.
