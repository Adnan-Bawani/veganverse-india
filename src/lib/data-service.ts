import { 
  Category, 
  Product, 
  SellerStore, 
  ProductFilters, 
  CustomerEnquiry, 
  SellerApplication, 
  AuditLog 
} from '@/types';
import { createClient } from './supabase/server';

// Initial verified seed data matching database schema & seed.sql
export const SEED_CATEGORIES: Category[] = [
  {
    id: 'c1000000-0000-0000-0000-000000000001',
    name: 'Food & Beverages',
    slug: 'food-and-beverages',
    description: 'Plant-based pantry essentials, dairy-free alternatives, artisanal snacks, and gourmet beverages.',
    image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    display_order: 1,
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c1000000-0000-0000-0000-000000000002',
    name: 'Fashion & Apparel',
    slug: 'fashion-and-apparel',
    description: 'Cruelty-free apparel, vegan leather accessories, and sustainably sourced organic cotton garments.',
    image_url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80',
    display_order: 2,
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c1000000-0000-0000-0000-000000000003',
    name: 'Beauty & Personal Care',
    slug: 'beauty-and-personal-care',
    description: '100% cruelty-free skincare, vegan haircare, and clean botanical cosmetics never tested on animals.',
    image_url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    display_order: 3,
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c1000000-0000-0000-0000-000000000004',
    name: 'Footwear',
    slug: 'footwear',
    description: 'Ethical shoes, sneakers, and casual footwear made with innovative plant-based materials and recycled rubber.',
    image_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
    display_order: 4,
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c1000000-0000-0000-0000-000000000005',
    name: 'Home & Living',
    slug: 'home-and-living',
    description: 'Eco-friendly homeware, soy-wax candles, cruelty-free linens, and zero-waste kitchen essentials.',
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    display_order: 5,
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'c1000000-0000-0000-0000-000000000006',
    name: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Stationery, ethical gifts, wellness items, and conscious everyday accessories.',
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    display_order: 6,
    is_active: true,
    created_at: '2026-01-01T00:00:00Z',
  },
];

export const SEED_STORES: SellerStore[] = [
  {
    id: 's1000000-0000-0000-0000-000000000001',
    business_legal_name: 'Pure Flora Botanicals LLP',
    brand_name: 'Flora & Roots',
    slug: 'flora-and-roots',
    tagline: 'Artisanal plant-based skincare crafted in the Western Ghats.',
    description: 'Flora & Roots is an independent herbal skincare laboratory dedicated to zero-cruelty formulations utilizing wild-harvested cold-pressed botanical oils from Karnataka.',
    logo_url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    banner_url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    business_email: 'orders@floraandroots.in',
    business_phone: '+91-9845012345',
    website_url: 'https://floraandroots.in',
    instagram_url: 'https://instagram.com/floraandroots',
    country_of_registration: 'IN',
    shipping_policy: 'Dispatches within 24-48 business hours via eco-courier. Standard delivery 3-5 days across India.',
    return_policy: 'Returns accepted within 7 days of delivery for unopened sealed items. Eco-friendly refund processed upon receipt.',
    status: 'approved',
    created_at: '2026-01-10T00:00:00Z',
  },
  {
    id: 's1000000-0000-0000-0000-000000000002',
    business_legal_name: 'Verdant Dairy Alternative Foods Pvt Ltd',
    brand_name: 'Nutti Artisanal Foods',
    slug: 'nutti-artisanal-foods',
    tagline: 'Stone-ground organic cashew cheeses & cultured plant butter.',
    description: 'Based in Bengaluru, Nutti specializes in traditional fermentation of organic whole cashews to produce artisanal table cheeses and rich plant butters without palm oil or preservatives.',
    logo_url: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=400&q=80',
    banner_url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
    business_email: 'hello@nuttifoods.com',
    business_phone: '+91-9876543210',
    website_url: 'https://nuttifoods.com',
    country_of_registration: 'IN',
    shipping_policy: 'Chilled express shipping using insulated thermal packaging. Delivered within 48 hours in tier 1 Indian metros.',
    return_policy: 'Perishable cold-chain food product. Replacement guarantee provided for temperature excursions or damaged seals upon unboxing video.',
    status: 'approved',
    created_at: '2026-01-12T00:00:00Z',
  },
  {
    id: 's1000000-0000-0000-0000-000000000003',
    business_legal_name: 'CrueltyFree Threads Studio LLP',
    brand_name: 'Malai Studio',
    slug: 'malai-studio',
    tagline: 'Circular bio-composite materials & coconut leather accessories.',
    description: 'Malai is an award-winning material innovation studio based in Kerala working with coconut farmers to develop durable, flexible bio-composites that substitute animal leather.',
    logo_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
    banner_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    business_email: 'studio@malai.eco',
    business_phone: '+91-9447012345',
    website_url: 'https://malai.eco',
    country_of_registration: 'IN',
    shipping_policy: 'Shipped plastic-free in compostable corrugated mailers. Dispatched within 2 business days.',
    return_policy: '15-day return and exchange policy on unworn accessories in original linen dust bags.',
    status: 'approved',
    created_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 's1000000-0000-0000-0000-000000000004',
    business_legal_name: 'EcoFoot Ethos LLP',
    brand_name: 'Solestep Vegan',
    slug: 'solestep-vegan',
    tagline: 'Zero-cruelty canvas sneakers and pineapple leather loafers.',
    description: 'Solestep designs timeless everyday urban footwear crafted with Piñatex pineapple leaf fibers and recycled tree rubber.',
    logo_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80',
    banner_url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80',
    business_email: 'care@solestep.in',
    country_of_registration: 'IN',
    shipping_policy: 'Free carbon-neutral courier delivery across all Indian PIN codes.',
    return_policy: 'Free size exchanges within 14 days.',
    status: 'approved',
    created_at: '2026-01-18T00:00:00Z',
  },
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'p1000000-0000-0000-0000-000000000001',
    seller_id: 's1000000-0000-0000-0000-000000000002',
    category_id: 'c1000000-0000-0000-0000-000000000001',
    name: 'Cultured Cashew Truffle Spread',
    slug: 'cultured-cashew-truffle-spread',
    sku: 'NUT-TRF-200G',
    short_description: 'Rich artisanal spread fermented with organic cashews and infused with Italian black summer truffle.',
    full_description: 'Our award-winning Cultured Cashew Truffle Spread is slowly stone-ground and cold-cultured over 48 hours with live probiotic strains. Infused with pure cold-pressed extra virgin olive oil and fragrant black truffle shavings. Free from dairy, palm oil, refined starches, and artificial preservatives. Perfect for sourdough toast, charcuterie boards, or tossing with warm pasta.',
    ingredients_or_materials: 'Organic Indian Cashews (72%), Filtered Water, Cold-Pressed Extra Virgin Olive Oil, Black Summer Truffle (Tuber Aestivum), Himalayan Pink Salt, Active Vegan Fermentation Cultures.',
    dimensions_or_weight: 'Net Weight: 200g glass jar',
    care_instructions: 'Refrigerate between 2°C to 6°C. Consume within 14 days of opening.',
    base_price: 490,
    currency: 'INR',
    vegan_status: 'evidence_reviewed',
    vegan_status_explanation: 'Platform reviewed organic ingredient chain disclosures and certified FSSAI manufacturing lab tests.',
    status: 'approved',
    country_of_origin: 'Made in India',
    created_at: '2026-01-20T00:00:00Z',
    seller: SEED_STORES[1],
    category: SEED_CATEGORIES[0],
    images: [
      {
        id: 'i1',
        product_id: 'p1000000-0000-0000-0000-000000000001',
        image_url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
        alt_text: 'Cultured Cashew Truffle Spread on artisanal sourdough toast',
        display_order: 0,
        is_primary: true,
        created_at: '2026-01-20T00:00:00Z',
      },
      {
        id: 'i2',
        product_id: 'p1000000-0000-0000-0000-000000000001',
        image_url: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80',
        alt_text: 'Jar of artisanal cashew cheese spread',
        display_order: 1,
        is_primary: false,
        created_at: '2026-01-20T00:00:00Z',
      },
    ],
    variants: [
      {
        id: 'v1',
        product_id: 'p1000000-0000-0000-0000-000000000001',
        sku: 'NUT-TRF-200G',
        title: '200g Glass Jar',
        attributes: { size: '200g' },
        price_override: 490,
        is_default: true,
        stock_quantity: 45,
        is_available: true,
        created_at: '2026-01-20T00:00:00Z',
      },
      {
        id: 'v2',
        product_id: 'p1000000-0000-0000-0000-000000000001',
        sku: 'NUT-TRF-400G',
        title: '400g Duo Pack (2x 200g)',
        attributes: { size: '400g Duo' },
        price_override: 920,
        is_default: false,
        stock_quantity: 20,
        is_available: true,
        created_at: '2026-01-20T00:00:00Z',
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000002',
    seller_id: 's1000000-0000-0000-0000-000000000001',
    category_id: 'c1000000-0000-0000-0000-000000000003',
    name: 'Bakuchiol & Blue Tansy Youth Elixir',
    slug: 'bakuchiol-blue-tansy-youth-elixir',
    sku: 'FLR-BKT-030M',
    short_description: 'Botanical retinol alternative facial oil designed to calm redness and boost elasticity.',
    full_description: 'A deeply restorative night treatment featuring 2% plant-derived Bakuchiol (a gentle natural alternative to synthetic retinol) suspended in cold-pressed Indian jojoba, rosehip seed, and Moroccan blue tansy oils. Formulated without beeswax, animal squalene, or synthetic dyes. Clinically gentle on sensitive skin.',
    ingredients_or_materials: 'Simmondsia Chinensis (Jojoba) Seed Oil, Rosa Canina (Rosehip) Fruit Oil, Squalane (Olive-Derived), 2% Psoralea Corylifolia (Bakuchiol) Seed Extract, Tanacetum Annuum (Blue Tansy) Flower Oil, Tocopherol (Non-GMO Sunflower Vitamin E).',
    dimensions_or_weight: '30ml amber UV-protected glass dropper bottle',
    care_instructions: 'Store in a cool, dry place away from direct sunlight.',
    base_price: 1250,
    currency: 'INR',
    vegan_status: 'third_party_certified',
    vegan_status_explanation: 'Independently audited & certified 100% Vegan & Cruelty-Free by PETA India Certification #CR-2025-0814.',
    status: 'approved',
    country_of_origin: 'Made in India',
    created_at: '2026-01-22T00:00:00Z',
    seller: SEED_STORES[0],
    category: SEED_CATEGORIES[2],
    images: [
      {
        id: 'i3',
        product_id: 'p1000000-0000-0000-0000-000000000002',
        image_url: 'https://images.unsplash.com/photo-1608248597359-597541e25e2e?auto=format&fit=crop&w=800&q=80',
        alt_text: 'Bakuchiol & Blue Tansy Youth Elixir facial oil dropper bottle',
        display_order: 0,
        is_primary: true,
        created_at: '2026-01-22T00:00:00Z',
      },
    ],
    variants: [
      {
        id: 'v3',
        product_id: 'p1000000-0000-0000-0000-000000000002',
        sku: 'FLR-BKT-030M',
        title: '30ml Dropper Bottle',
        attributes: { volume: '30ml' },
        price_override: 1250,
        is_default: true,
        stock_quantity: 60,
        is_available: true,
        created_at: '2026-01-22T00:00:00Z',
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000003',
    seller_id: 's1000000-0000-0000-0000-000000000003',
    category_id: 'c1000000-0000-0000-0000-000000000002',
    name: 'Coconut Bio-Leather Bifold Wallet',
    slug: 'coconut-bio-leather-bifold-wallet',
    sku: 'MAL-WLT-001E',
    short_description: 'Minimalist sustainable cardholder wallet grown from agricultural coconut bacterial cellulose.',
    full_description: 'Crafted entirely from Malai circular bio-composite—a natural material grown on agricultural coconut water discarded by Kerala food processing units. Naturally water-resistant, durable, and develops a rich patina over time. Completely free from animal hide, toxic chromium tanning, and PVC plastic.',
    ingredients_or_materials: '100% Bacterial Cellulose grown on Coconut Water, Natural Banana Fiber Core, Eco-friendly Natural Resin Coating, Organic Cotton Stitching Thread.',
    dimensions_or_weight: '11cm x 8.5cm x 1.2cm (Holds 8 cards + folded banknotes)',
    care_instructions: 'Wipe with a soft damp cloth. Condition periodically with plant-based wax.',
    base_price: 1850,
    currency: 'INR',
    vegan_status: 'evidence_reviewed',
    vegan_status_explanation: 'Material lifecycle audit and non-animal raw material supply chain audited by platform review committee.',
    status: 'approved',
    country_of_origin: 'Made in India',
    created_at: '2026-01-25T00:00:00Z',
    seller: SEED_STORES[2],
    category: SEED_CATEGORIES[1],
    images: [
      {
        id: 'i4',
        product_id: 'p1000000-0000-0000-0000-000000000003',
        image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
        alt_text: 'Coconut Bio-Leather Bifold Wallet in natural earth brown',
        display_order: 0,
        is_primary: true,
        created_at: '2026-01-25T00:00:00Z',
      },
    ],
    variants: [
      {
        id: 'v4',
        product_id: 'p1000000-0000-0000-0000-000000000003',
        sku: 'MAL-WLT-001E',
        title: 'Natural Earth Brown',
        attributes: { color: 'Earth Brown' },
        price_override: 1850,
        is_default: true,
        stock_quantity: 15,
        is_available: true,
        created_at: '2026-01-25T00:00:00Z',
      },
      {
        id: 'v5',
        product_id: 'p1000000-0000-0000-0000-000000000003',
        sku: 'MAL-WLT-002C',
        title: 'Charcoal Black',
        attributes: { color: 'Charcoal Black' },
        price_override: 1850,
        is_default: false,
        stock_quantity: 12,
        is_available: true,
        created_at: '2026-01-25T00:00:00Z',
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000004',
    seller_id: 's1000000-0000-0000-0000-000000000004',
    category_id: 'c1000000-0000-0000-0000-000000000004',
    name: 'Piñatex Urban Vegan Sneakers',
    slug: 'pinatex-urban-vegan-sneakers',
    sku: 'SLS-PNT-042',
    short_description: 'Breathable, water-resistant everyday sneakers handcrafted from natural pineapple leaf waste.',
    full_description: 'Constructed from innovative Piñatex pineapple leather, recycled organic cotton linings, and vulcanized natural tree rubber outsoles. Extremely lightweight, comfortable for daily city walking, and 100% cruelty-free without toxic animal glues.',
    ingredients_or_materials: 'Piñatex (Pineapple Leaf Fiber Bio-Textile), Recycled Cotton Twill Lining, Natural Tree Hevea Rubber Soles, Water-Based Non-Animal Adhesives.',
    dimensions_or_weight: 'Weight: 680g (Pair)',
    care_instructions: 'Clean with warm water and mild plant soap. Allow to air dry naturally away from radiators.',
    base_price: 3499,
    currency: 'INR',
    vegan_status: 'third_party_certified',
    vegan_status_explanation: 'Certified Vegan by The Vegan Society UK and PeTA-Approved Vegan.',
    status: 'approved',
    country_of_origin: 'Made in India',
    created_at: '2026-01-28T00:00:00Z',
    seller: SEED_STORES[3],
    category: SEED_CATEGORIES[3],
    images: [
      {
        id: 'i5',
        product_id: 'p1000000-0000-0000-0000-000000000004',
        image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
        alt_text: 'Piñatex Urban Vegan Sneakers in ivory and earth contrast',
        display_order: 0,
        is_primary: true,
        created_at: '2026-01-28T00:00:00Z',
      },
    ],
    variants: [
      {
        id: 'v6',
        product_id: 'p1000000-0000-0000-0000-000000000004',
        sku: 'SLS-PNT-042-UK8',
        title: 'Size UK 8 / EU 42',
        attributes: { size: 'UK 8' },
        price_override: 3499,
        is_default: true,
        stock_quantity: 8,
        is_available: true,
        created_at: '2026-01-28T00:00:00Z',
      },
      {
        id: 'v7',
        product_id: 'p1000000-0000-0000-0000-000000000004',
        sku: 'SLS-PNT-042-UK9',
        title: 'Size UK 9 / EU 43',
        attributes: { size: 'UK 9' },
        price_override: 3499,
        is_default: false,
        stock_quantity: 14,
        is_available: true,
        created_at: '2026-01-28T00:00:00Z',
      },
      {
        id: 'v8',
        product_id: 'p1000000-0000-0000-0000-000000000004',
        sku: 'SLS-PNT-042-UK10',
        title: 'Size UK 10 / EU 44',
        attributes: { size: 'UK 10' },
        price_override: 3499,
        is_default: false,
        stock_quantity: 9,
        is_available: true,
        created_at: '2026-01-28T00:00:00Z',
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000005',
    seller_id: 's1000000-0000-0000-0000-000000000001',
    category_id: 'c1000000-0000-0000-0000-000000000005',
    name: 'Wild Jasmine Pure Soy Aromatherapy Candle',
    slug: 'wild-jasmine-pure-soy-aromatherapy-candle',
    sku: 'FLR-CND-JAS',
    short_description: 'Clean-burning 100% soy candle hand-poured with steam-distilled Madurai jasmine essential oil.',
    full_description: 'Crafted without beeswax, paraffin, petroleum derivatives, synthetic phthalates, or lead wicks. Poured into an amber reusable glass vessel with a natural untreated cotton wick. Burns cleanly for 45+ hours, filling your sanctuary with genuine floral notes.',
    ingredients_or_materials: '100% Non-GMO Soy Wax, Jasminum Sambac (Mogra) Flower Essential Oil, Unbleached Cotton Wick.',
    dimensions_or_weight: 'Net Wt: 220g (Burns approx 45 hours)',
    care_instructions: 'Trim wick to 5mm before each lighting. Never burn unattended.',
    base_price: 750,
    currency: 'INR',
    vegan_status: 'seller_declared',
    vegan_status_explanation: 'Seller declared zero beeswax or animal fat. Laboratory fragrance verification currently in queue.',
    status: 'approved',
    country_of_origin: 'Made in India',
    created_at: '2026-02-01T00:00:00Z',
    seller: SEED_STORES[0],
    category: SEED_CATEGORIES[4],
    images: [
      {
        id: 'i6',
        product_id: 'p1000000-0000-0000-0000-000000000005',
        image_url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
        alt_text: 'Wild Jasmine Pure Soy Aromatherapy Candle burning in warm ambient light',
        display_order: 0,
        is_primary: true,
        created_at: '2026-02-01T00:00:00Z',
      },
    ],
    variants: [
      {
        id: 'v9',
        product_id: 'p1000000-0000-0000-0000-000000000005',
        sku: 'FLR-CND-JAS',
        title: '220g Amber Tumbler',
        attributes: { size: '220g' },
        price_override: 750,
        is_default: true,
        stock_quantity: 35,
        is_available: true,
        created_at: '2026-02-01T00:00:00Z',
      },
    ],
  },
  {
    id: 'p1000000-0000-0000-0000-000000000006',
    seller_id: 's1000000-0000-0000-0000-000000000003',
    category_id: 'c1000000-0000-0000-0000-000000000006',
    name: 'Plant-Dyed Organic Hemp Journal & Bamboo Pen',
    slug: 'plant-dyed-organic-hemp-journal-bamboo-pen',
    sku: 'MAL-JRN-001',
    short_description: 'Tree-free recycled cotton rag paper encased in natural indigo plant-dyed Himalayan hemp.',
    full_description: 'An heirloom quality eco-journal crafted using 100% tree-free handmade cotton rag paper made from garment cutting waste. Bound in raw wild hemp dyed with natural indigo leaves. Includes a refillable bamboo rollerball pen.',
    ingredients_or_materials: 'Wild Himalayan Hemp Canvas, Recycled Tree-Free Cotton Rag Paper (120 GSM), Natural Indigo Plant Dye, Raw Jute Binding Cord.',
    dimensions_or_weight: 'A5 (14.8cm x 21cm), 160 unruled pages',
    care_instructions: 'Keep dry. Spot clean fabric cover with gentle damp cloth.',
    base_price: 990,
    currency: 'INR',
    vegan_status: 'evidence_reviewed',
    vegan_status_explanation: 'Audited tree-free non-animal paper sizing and natural plant-dye processes.',
    status: 'approved',
    country_of_origin: 'Made in India',
    created_at: '2026-02-03T00:00:00Z',
    seller: SEED_STORES[2],
    category: SEED_CATEGORIES[5],
    images: [
      {
        id: 'i7',
        product_id: 'p1000000-0000-0000-0000-000000000006',
        image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        alt_text: 'Handcrafted organic hemp journal on a rustic wooden table',
        display_order: 0,
        is_primary: true,
        created_at: '2026-02-03T00:00:00Z',
      },
    ],
    variants: [
      {
        id: 'v10',
        product_id: 'p1000000-0000-0000-0000-000000000006',
        sku: 'MAL-JRN-001',
        title: 'A5 Indigo Blue',
        attributes: { color: 'Indigo Blue', size: 'A5' },
        price_override: 990,
        is_default: true,
        stock_quantity: 25,
        is_available: true,
        created_at: '2026-02-03T00:00:00Z',
      },
    ],
  },
];

// In-Memory store for newly submitted applications & enquiries during pilot
export const memoryApplications: SellerApplication[] = [
  {
    id: 'app-seed-001',
    legal_name: 'Satvik Organics Private Limited',
    trading_name: 'Satvik Milks',
    business_type: 'Private Limited',
    country: 'IN',
    contact_person_name: 'Ananya Sharma',
    contact_email: 'ananya@satvikmilks.in',
    contact_phone: '+91-9811223344',
    website_or_social: 'https://satvikmilks.in',
    registered_address: {
      street: '14 Industrial Green Estate, Okhla Phase 3',
      city: 'New Delhi',
      state: 'Delhi',
      postal_code: '110020',
      country: 'IN',
    },
    category_ids: ['c1000000-0000-0000-0000-000000000001'],
    sample_products_description: 'Sprouted oat milk, almond curd, and dairy-free cold brew latte.',
    vegan_claim_declaration: '100% plant-based dedicated processing facility. Strictly zero milk powder, whey, or animal lactose processed in the plant.',
    shipping_returns_summary: 'Dispatched via cold chain logistics across NCR and major metro cities within 24 hours.',
    has_selling_rights: true,
    status: 'under_review',
    created_at: '2026-02-05T10:30:00Z',
  },
  {
    id: 'app-seed-002',
    legal_name: 'Vanya Herbals LLP',
    trading_name: 'Vanya Roots',
    business_type: 'LLP',
    country: 'IN',
    contact_person_name: 'Vikram Joshi',
    contact_email: 'vikram@vanyaroots.com',
    contact_phone: '+91-9988776655',
    registered_address: {
      street: '88 Hill View Road',
      city: 'Dehradun',
      state: 'Uttarakhand',
      postal_code: '248001',
      country: 'IN',
    },
    category_ids: ['c1000000-0000-0000-0000-000000000003'],
    sample_products_description: 'Herbal hair serums, organic neem face washes, and botanical bath powders.',
    vegan_claim_declaration: 'Certified cruelty-free botanicals. No animal testing, beeswax, honey, or carmine.',
    shipping_returns_summary: 'Shipped pan-India via express surface courier in 3-4 working days.',
    has_selling_rights: true,
    status: 'under_review',
    created_at: '2026-02-06T14:15:00Z',
  },
];

export const memoryEnquiries: CustomerEnquiry[] = [
  {
    id: 'enq-seed-001',
    product_id: 'p1000000-0000-0000-0000-000000000001',
    seller_id: 's1000000-0000-0000-0000-000000000002',
    customer_name: 'Pooja Venkatesh',
    customer_email: 'pooja.v@example.com',
    customer_phone: '+91-9876543210',
    message: 'Hello, does the Truffle Cashew Spread require refrigerated courier delivery to Hyderabad during summer? How long does transit take?',
    status: 'new',
    created_at: '2026-02-07T08:20:00Z',
    product: {
      id: 'p1000000-0000-0000-0000-000000000001',
      name: 'Cultured Cashew Truffle Spread',
      slug: 'cultured-cashew-truffle-spread',
    },
    seller: {
      id: 's1000000-0000-0000-0000-000000000002',
      brand_name: 'Nutti Artisanal Foods',
      business_email: 'hello@nuttifoods.com',
    },
  },
  {
    id: 'enq-seed-002',
    product_id: 'p1000000-0000-0000-0000-000000000003',
    seller_id: 's1000000-0000-0000-0000-000000000003',
    customer_name: 'Rahul Mehta',
    customer_email: 'rahul.mehta@example.com',
    customer_phone: '+91-9920112233',
    message: 'Hi Malai team, does the Coconut Bio-Leather wallet withstand rain exposure or high humidity in Mumbai? Do you provide a gift box?',
    status: 'forwarded_to_seller',
    created_at: '2026-02-07T11:45:00Z',
    product: {
      id: 'p1000000-0000-0000-0000-000000000003',
      name: 'Coconut Bio-Leather Bifold Wallet',
      slug: 'coconut-bio-leather-bifold-wallet',
    },
    seller: {
      id: 's1000000-0000-0000-0000-000000000003',
      brand_name: 'Malai Studio',
      business_email: 'studio@malai.eco',
    },
  },
];

export const memoryAuditLogs: AuditLog[] = [
  {
    id: 'aud-001',
    actor_name: 'Admin System',
    action: 'seller_approved',
    target_entity: 'seller_store',
    target_id: 's1000000-0000-0000-0000-000000000002',
    metadata: { brand_name: 'Nutti Artisanal Foods', reason: 'FSSAI vegan food license and lab test audited' },
    created_at: '2026-01-12T14:00:00Z',
  },
  {
    id: 'aud-002',
    actor_name: 'Admin System',
    action: 'product_approved',
    target_entity: 'product',
    target_id: 'p1000000-0000-0000-0000-000000000001',
    metadata: { product_name: 'Cultured Cashew Truffle Spread', trust_tier: 'evidence_reviewed' },
    created_at: '2026-01-20T16:30:00Z',
  },
];

// Helper to check if Supabase is connected with real credentials
function isRealSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return Boolean(url && !url.includes('placeholder') && !url.includes('your-project-id'));
}

export async function getCategories(): Promise<Category[]> {
  if (isRealSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Fallback to seed categories', e);
    }
  }
  return SEED_CATEGORIES;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug) || null;
}

export async function getStores(): Promise<SellerStore[]> {
  if (isRealSupabaseConfigured()) {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('seller_stores')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Fallback to seed stores', e);
    }
  }
  return SEED_STORES.filter((s) => s.status === 'approved');
}

export async function getStoreBySlug(slug: string): Promise<SellerStore | null> {
  const stores = await getStores();
  return stores.find((s) => s.slug === slug) || null;
}

export async function getProducts(filters?: ProductFilters): Promise<{ products: Product[]; total: number }> {
  let allProducts = SEED_PRODUCTS.filter((p) => p.status === 'approved');

  if (isRealSupabaseConfigured()) {
    try {
      const supabase = createClient();
      let query = supabase
        .from('products')
        .select('*, seller:seller_stores(*), category:categories(*), images:product_images(*), variants:product_variants(*)', { count: 'exact' })
        .eq('status', 'approved');

      if (filters?.category) {
        query = query.eq('category.slug', filters.category);
      }
      if (filters?.brand) {
        query = query.eq('seller.slug', filters.brand);
      }
      if (filters?.veganStatus) {
        query = query.eq('vegan_status', filters.veganStatus);
      }
      if (filters?.minPrice !== undefined) {
        query = query.gte('base_price', filters.minPrice);
      }
      if (filters?.maxPrice !== undefined) {
        query = query.lte('base_price', filters.maxPrice);
      }

      const { data, error, count } = await query;
      if (!error && data && data.length > 0) {
        return { products: data as Product[], total: count || data.length };
      }
    } catch (e) {
      console.warn('Fallback to in-memory products query', e);
    }
  }

  // Filter in-memory products
  let filtered = [...allProducts];

  if (filters?.category) {
    filtered = filtered.filter((p) => p.category?.slug === filters.category);
  }
  if (filters?.brand) {
    filtered = filtered.filter((p) => p.seller?.slug === filters.brand);
  }
  if (filters?.veganStatus) {
    filtered = filtered.filter((p) => p.vegan_status === filters.veganStatus);
  }
  if (filters?.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.base_price >= filters.minPrice!);
  }
  if (filters?.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.base_price <= filters.maxPrice!);
  }
  if (filters?.countryOfOrigin) {
    filtered = filtered.filter((p) => p.country_of_origin.toLowerCase().includes(filters.countryOfOrigin!.toLowerCase()));
  }
  if (filters?.query) {
    const q = filters.query.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.short_description?.toLowerCase().includes(q) ||
        p.ingredients_or_materials.toLowerCase().includes(q) ||
        p.seller?.brand_name.toLowerCase().includes(q) ||
        p.category?.name.toLowerCase().includes(q)
    );
  }

  // Sort
  if (filters?.sort === 'price_asc') {
    filtered.sort((a, b) => a.base_price - b.base_price);
  } else if (filters?.sort === 'price_desc') {
    filtered.sort((a, b) => b.base_price - a.base_price);
  } else if (filters?.sort === 'newest') {
    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return { products: filtered, total: filtered.length };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { products } = await getProducts();
  return products.find((p) => p.slug === slug) || null;
}

export async function getAdminMetrics() {
  const totalSellers = SEED_STORES.length;
  const pendingApplications = memoryApplications.filter((a) => a.status === 'under_review').length;
  const approvedSellers = SEED_STORES.filter((s) => s.status === 'approved').length;
  const totalProducts = SEED_PRODUCTS.length;
  const approvedProducts = SEED_PRODUCTS.filter((p) => p.status === 'approved').length;
  const openEnquiries = memoryEnquiries.filter((e) => e.status === 'new' || e.status === 'forwarded_to_seller').length;

  return {
    totalSellers,
    pendingApplications,
    approvedSellers,
    totalProducts,
    approvedProducts,
    openEnquiries,
  };
}

export async function getAdminApplications(): Promise<SellerApplication[]> {
  return memoryApplications;
}

export async function getAdminEnquiries(): Promise<CustomerEnquiry[]> {
  return memoryEnquiries;
}

export async function getAdminAuditLogs(): Promise<AuditLog[]> {
  return memoryAuditLogs;
}

