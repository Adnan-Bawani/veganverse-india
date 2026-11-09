-- ============================================================================
-- GLOBAL VEGAN MARKETPLACE — SEED DATA (SEED TAXONOMY & FOUNDING PILOT DATA)
-- ============================================================================

-- Seed 6 Core Verified Vegan Categories
INSERT INTO public.categories (id, name, slug, description, display_order, is_active) VALUES
('c1000000-0000-0000-0000-000000000001', 'Food & Beverages', 'food-and-beverages', 'Plant-based pantry essentials, dairy-free alternatives, artisanal snacks, and gourmet beverages.', 1, TRUE),
('c1000000-0000-0000-0000-000000000002', 'Fashion & Apparel', 'fashion-and-apparel', 'Cruelty-free apparel, vegan leather accessories, and sustainably sourced organic cotton garments.', 2, TRUE),
('c1000000-0000-0000-0000-000000000003', 'Beauty & Personal Care', 'beauty-and-personal-care', '100% cruelty-free skincare, vegan haircare, and clean botanical cosmetics never tested on animals.', 3, TRUE),
('c1000000-0000-0000-0000-000000000004', 'Footwear', 'footwear', 'Ethical shoes, sneakers, and casual footwear made with innovative plant-based materials and recycled rubber.', 4, TRUE),
('c1000000-0000-0000-0000-000000000005', 'Home & Living', 'home-and-living', 'Eco-friendly homeware, soy-wax candles, cruelty-free linens, and zero-waste kitchen essentials.', 5, TRUE),
('c1000000-0000-0000-0000-000000000006', 'Lifestyle', 'lifestyle', 'Stationery, ethical gifts, wellness items, and conscious everyday accessories.', 6, TRUE)
ON CONFLICT (slug) DO NOTHING;

-- Seed Sample Founding Vegan Independent Brands (Pilot Demonstration)
INSERT INTO public.seller_stores (
    id, business_legal_name, brand_name, slug, tagline, description,
    logo_url, banner_url, business_email, business_phone, country_of_registration,
    shipping_policy, return_policy, status
) VALUES
(
    's1000000-0000-0000-0000-000000000001',
    'Pure Flora Botanicals LLP',
    'Flora & Roots',
    'flora-and-roots',
    'Artisanal plant-based skincare crafted in the Western Ghats.',
    'Flora & Roots is an independent herbal skincare laboratory dedicated to zero-cruelty formulations utilizing wild-harvested cold-pressed botanical oils from Karnataka.',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    'orders@floraandroots.in',
    '+91-9845012345',
    'IN',
    'Dispatches within 24-48 business hours via eco-courier. Standard delivery 3-5 days across India.',
    'Returns accepted within 7 days of delivery for unopened sealed items. Eco-friendly refund processed upon receipt.',
    'approved'
),
(
    's1000000-0000-0000-0000-000000000002',
    'Verdant Dairy Alternative Foods Pvt Ltd',
    'Nutti Artisanal Foods',
    'nutti-artisanal-foods',
    'Stone-ground organic cashew cheeses & cultured plant butter.',
    'Based in Bengaluru, Nutti specializes in traditional fermentation of organic whole cashews to produce artisanal table cheeses and rich plant butters without palm oil or preservatives.',
    'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
    'hello@nuttifoods.com',
    '+91-9876543210',
    'IN',
    'Chilled express shipping using insulated thermal packaging. Delivered within 48 hours in tier 1 Indian metros.',
    'Perishable cold-chain food product. Replacement guarantee provided for temperature excursions or damaged seals upon unboxing video.',
    'approved'
),
(
    's1000000-0000-0000-0000-000000000003',
    'CrueltyFree Threads Studio LLP',
    'Malai Studio',
    'malai-studio',
    'Circular bio-composite materials & coconut leather accessories.',
    'Malai is an award-winning material innovation studio based in Kerala working with coconut farmers to develop durable, flexible bio-composites that substitute animal leather.',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    'studio@malai.eco',
    '+91-9447012345',
    'IN',
    'Shipped plastic-free in compostable corrugated mailers. Dispatched within 2 business days.',
    '15-day return and exchange policy on unworn accessories in original linen dust bags.',
    'approved'
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Sample Products with Full Ingredient and Trust Disclosures
INSERT INTO public.products (
    id, seller_id, category_id, name, slug, sku,
    short_description, full_description, ingredients_or_materials,
    dimensions_or_weight, care_instructions, base_price, currency,
    vegan_status, vegan_status_explanation, status, country_of_origin
) VALUES
(
    'p1000000-0000-0000-0000-000000000001',
    's1000000-0000-0000-0000-000000000002',
    'c1000000-0000-0000-0000-000000000001',
    'Cultured Cashew Truffle Spread',
    'cultured-cashew-truffle-spread',
    'NUT-TRF-200G',
    'Rich artisanal spread fermented with organic cashews and infused with Italian black summer truffle.',
    'Our award-winning Cultured Cashew Truffle Spread is slowly stone-ground and cold-cultured over 48 hours with live probiotic strains. Infused with pure cold-pressed extra virgin olive oil and fragrant black truffle shavings. Free from dairy, palm oil, refined starches, and artificial preservatives. Perfect for sourdough toast, charcuterie boards, or tossing with warm pasta.',
    'Organic Indian Cashews (72%), Filtered Water, Cold-Pressed Extra Virgin Olive Oil, Black Summer Truffle (Tuber Aestivum), Himalayan Pink Salt, Active Vegan Fermentation Cultures.',
    'Net Weight: 200g glass jar',
    'Refrigerate between 2°C to 6°C. Consume within 14 days of opening.',
    490.00,
    'INR',
    'evidence_reviewed',
    'Platform verified organic supplier declaration and FSSAI manufacturing lab test disclosures.',
    'approved',
    'IN'
),
(
    'p1000000-0000-0000-0000-000000000002',
    's1000000-0000-0000-0000-000000000001',
    'c1000000-0000-0000-0000-000000000003',
    'Bakuchiol & Blue Tansy Youth Elixir',
    'bakuchiol-blue-tansy-youth-elixir',
    'FLR-BKT-030M',
    'Botanical retinol alternative facial oil designed to calm redness and boost elasticity.',
    'A deeply restorative night treatment featuring 2% plant-derived Bakuchiol (a gentle natural alternative to synthetic retinol) suspended in cold-pressed Indian jojoba, rosehip seed, and Moroccan blue tansy oils. Formulated without beeswax, animal squalene, or synthetic dyes. Clinically gentle on sensitive skin.',
    'Simmondsia Chinensis (Jojoba) Seed Oil, Rosa Canina (Rosehip) Fruit Oil, Squalane (Olive-Derived), 2% Psoralea Corylifolia (Bakuchiol) Seed Extract, Tanacetum Annuum (Blue Tansy) Flower Oil, Tocopherol (Non-GMO Sunflower Vitamin E).',
    '30ml amber UV-protected glass dropper bottle',
    'Store in a cool, dry place away from direct sunlight.',
    1250.00,
    'INR',
    'third_party_certified',
    'Independently certified 100% Vegan & Cruelty-Free by PETA India Certification #CR-2025-0814.',
    'approved',
    'IN'
),
(
    'p1000000-0000-0000-0000-000000000003',
    's1000000-0000-0000-0000-000000000003',
    'c1000000-0000-0000-0000-000000000002',
    'Coconut Bio-Leather Bifold Wallet',
    'coconut-bio-leather-bifold-wallet',
    'MAL-WLT-001E',
    'Minimalist sustainable cardholder wallet grown from agricultural coconut bacterial cellulose.',
    'Crafted entirely from Malai circular bio-composite—a natural material grown on agricultural coconut water discarded by Kerala food processing units. Naturally water-resistant, durable, and develops a rich patina over time. Completely free from animal hide, toxic chromium tanning, and PVC plastic.',
    '100% Bacterial Cellulose grown on Coconut Water, Natural Banana Fiber Core, Eco-friendly Natural Resin Coating, Organic Cotton Stitching Thread.',
    '11cm x 8.5cm x 1.2cm (Holds 8 cards + folded banknotes)',
    'Wipe with a soft damp cloth. Condition periodically with plant-based wax.',
    1850.00,
    'INR',
    'evidence_reviewed',
    'Material lifecycle review and non-animal raw material supply chain audited by platform review board.',
    'approved',
    'IN'
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Images for Products
INSERT INTO public.product_images (id, product_id, image_url, alt_text, display_order, is_primary) VALUES
('i1000000-0000-0000-0000-000000000001', 'p1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', 'Cultured Cashew Truffle Spread on artisanal sourdough toast', 0, TRUE),
('i1000000-0000-0000-0000-000000000002', 'p1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80', 'Nutti Cashew spread jar presentation', 1, FALSE),
('i1000000-0000-0000-0000-000000000003', 'p1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1608248597359-597541e25e2e?auto=format&fit=crop&w=800&q=80', 'Bakuchiol & Blue Tansy Youth Elixir facial oil dropper bottle', 0, TRUE),
('i1000000-0000-0000-0000-000000000004', 'p1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80', 'Coconut Bio-Leather Bifold Wallet in natural earth brown', 0, TRUE)
ON CONFLICT (id) DO NOTHING;

-- Seed Product Variants
INSERT INTO public.product_variants (id, product_id, sku, title, attributes, price_override, is_default, stock_quantity, is_available) VALUES
('v1000000-0000-0000-0000-000000000001', 'p1000000-0000-0000-0000-000000000001', 'NUT-TRF-200G', '200g Jar', '{"size": "200g"}', 490.00, TRUE, 45, TRUE),
('v1000000-0000-0000-0000-000000000002', 'p1000000-0000-0000-0000-000000000001', 'NUT-TRF-400G', '400g Duo Pack', '{"size": "400g (2x 200g)"}', 920.00, FALSE, 20, TRUE),
('v1000000-0000-0000-0000-000000000003', 'p1000000-0000-0000-0000-000000000002', 'FLR-BKT-030M', '30ml Dropper', '{"volume": "30ml"}', 1250.00, TRUE, 60, TRUE),
('v1000000-0000-0000-0000-000000000004', 'p1000000-0000-0000-0000-000000000003', 'MAL-WLT-001E', 'Natural Earth Brown', '{"color": "Earth Brown"}', 1850.00, TRUE, 15, TRUE),
('v1000000-0000-0000-0000-000000000005', 'p1000000-0000-0000-0000-000000000003', 'MAL-WLT-002C', 'Charcoal Black', '{"color": "Charcoal Black"}', 1850.00, FALSE, 12, TRUE)
ON CONFLICT (sku) DO NOTHING;
