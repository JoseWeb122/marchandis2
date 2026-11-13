import { Product, ProductCategory } from '../types/store';

export interface CategoryMeta {
  id: ProductCategory;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'fragrances',
    name: 'FRAGRANCES',
    subtitle: 'Perfumes & Colognes',
    tagline: 'Signature Scents & Botanical Extraits',
    description:
      'Small-batch compositions crafted from rare woods, sunlit citruses, and warm resins designed to linger softly on skin.',
    image: './images/cat-fragrances.jpg',
  },
  {
    id: 'electronics',
    name: 'ELECTRONICS',
    subtitle: 'Technology & Gadgets',
    tagline: 'Tactile Audio & Refined Everyday Tech',
    description:
      'Precision-engineered objects clad in brushed titanium, acoustic textiles, and anodized aluminum for quiet daily ritual.',
    image: './images/cat-electronics.jpg',
  },
  {
    id: 'fashion',
    name: 'FASHION',
    subtitle: 'Sweaters & Apparel',
    tagline: 'Architectural Knitwear & Wardrobe Staples',
    description:
      'Relaxed silhouettes spun from grade-A Mongolian cashmere, extra-fine merino, and double-faced Italian wool.',
    image: './images/cat-fashion.jpg',
  },
  {
    id: 'accessories',
    name: 'ACCESSORIES',
    subtitle: 'Everyday Essentials',
    tagline: 'Heirloom Leather, Eyewear & Objects',
    description:
      'Thoughtfully proportioned companions made from full-grain vegetable-tanned hides, Italian acetate, and brushed steel.',
    image: './images/cat-accessories.jpg',
  },
];

export const PRODUCTS: Product[] = [
  // ===================== FRAGRANCES =====================
  {
    id: 'santal-velours-edp',
    slug: 'santal-velours-eau-de-parfum',
    name: 'Santal Velours Eau de Parfum',
    subtitle: 'Women’s Luxury Fragrance · Warm Woody Amber',
    category: 'fragrances',
    price: 185,
    originalPrice: 215,
    rating: 4.9,
    reviewCount: 148,
    badge: 'Best Seller',
    isBestSeller: true,
    isFeatured: true,
    releaseOrder: 14,
    salesRank: 1,
    images: [
      'https://images.pexels.com/photos/34642421/pexels-photo-34642421.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/16125025/pexels-photo-16125025.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/27357173/pexels-photo-27357173.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Creamy Mysore sandalwood draped in sunlit iris butter, white cardamom, and skin-warm ambrette seed.',
    description:
      'Composed in Grasse for unhurried days and candlelit evenings, Santal Velours balances luminous Calabrian bergamot and crisp white cardamom over a hushed heart of Florentine iris. As hours unfold, creamy sandalwood and velvet amber melt effortlessly into skin.',
    variantLabel: 'Bottle Size',
    variants: [
      { id: '50ml', label: '50 ml / 1.7 fl oz', priceDelta: 0 },
      { id: '100ml', label: '100 ml / 3.4 fl oz', priceDelta: 75 },
    ],
    tags: ['perfume', 'sandalwood', 'amber', 'womens fragrance', 'gift', 'woody'],
    fragranceDetails: {
      concentration: 'Eau de Parfum (22% Aromatic Oil)',
      genderProfile: 'Feminine-Leaning · Universally Wearable',
      topNotes: ['Calabrian Bergamot', 'White Cardamom', 'Pink Peppercorn'],
      heartNotes: ['Florentine Iris Butter', 'Fig Milk', 'Kashmir Violet'],
      baseNotes: ['Mysore Sandalwood', 'Ambrette Seed', 'Warm Ambergris'],
      longevity: 5,
      sillage: 4,
      perfumerNote:
        'Designed to feel like slipping into warm cashmere after dusk — intimate, enveloping, and quietly unforgettable.',
    },
  },
  {
    id: 'cedre-noir-cologne',
    slug: 'cedre-noir-cologne-intense',
    name: 'Cèdre Noir Cologne Intense',
    subtitle: 'Men’s Signature Cologne · Smoked Cedar & Vetiver',
    category: 'fragrances',
    price: 165,
    rating: 4.8,
    reviewCount: 112,
    badge: 'New Arrival',
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    releaseOrder: 16,
    salesRank: 3,
    images: [
      'https://images.pexels.com/photos/32645086/pexels-photo-32645086.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/36779953/pexels-photo-36779953.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/7814957/pexels-photo-7814957.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Architectural Atlas cedarwood sharpened with crushed juniper berry, black walnut, and Haitian vetiver.',
    description:
      'A crisp yet deeply grounded cologne for modern minimalists. Cèdre Noir opens with an invigorating mist of crushed juniper and bitter grapefruit rind before revealing smoked Atlas cedar, dark walnut husk, and mineral-rich oakmoss.',
    variantLabel: 'Bottle Size',
    variants: [
      { id: '50ml', label: '50 ml / 1.7 fl oz', priceDelta: 0 },
      { id: '100ml', label: '100 ml / 3.4 fl oz', priceDelta: 65 },
    ],
    tags: ['cologne', 'mens fragrance', 'cedar', 'vetiver', 'smoked wood'],
    fragranceDetails: {
      concentration: 'Cologne Intense (18% Aromatic Oil)',
      genderProfile: 'Masculine-Leaning · Crisp & Woody',
      topNotes: ['Crushed Juniper Berry', 'Bitter Grapefruit', 'Black Pepper'],
      heartNotes: ['Atlas Cedarwood', 'Clary Sage', 'Smoked Cypress'],
      baseNotes: ['Haitian Vetiver', 'Black Walnut', 'Dry Oakmoss'],
      longevity: 4,
      sillage: 4,
      perfumerNote:
        'Inspired by rain drying on sun-warmed slate and cedar beams — clean tailoring translated into scent.',
    },
  },
  {
    id: 'neroli-brume-extrait',
    slug: 'neroli-brume-botanical-extrait',
    name: 'Néroli Brume Extrait',
    subtitle: 'Unisex Botanical Perfume · Orange Blossom & White Tea',
    category: 'fragrances',
    price: 152,
    rating: 4.9,
    reviewCount: 84,
    badge: 'New Arrival',
    isNewArrival: true,
    isFeatured: false,
    releaseOrder: 15,
    salesRank: 7,
    images: [
      'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/33139765/pexels-photo-33139765.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Dewy Mediterranean orange blossom steeped with silver-needle white tea, petitgrain, and soft cedar musk.',
    description:
      'Sunlit morning air captured in heavy architectural glass. Néroli Brume pairs cold-pressed Tunisian neroli petals with serene white tea leaf and green mandarin, drying down to a clean, luminous skin musk suited for every season.',
    variantLabel: 'Bottle Size',
    variants: [
      { id: '50ml', label: '50 ml / 1.7 fl oz', priceDelta: 0 },
      { id: '100ml', label: '100 ml / 3.4 fl oz', priceDelta: 60 },
    ],
    tags: ['perfume', 'unisex', 'neroli', 'citrus', 'floral', 'white tea'],
    fragranceDetails: {
      concentration: 'Extrait de Parfum (25% Aromatic Oil)',
      genderProfile: 'Unisex · Radiant Citrus Floral',
      topNotes: ['Green Mandarin', 'Petitgrain Leaf', 'Sicilian Lemon'],
      heartNotes: ['Tunisian Neroli', 'Silver-Needle White Tea', 'Jasmine Dew'],
      baseNotes: ['Clean White Musk', 'Blonde Cedar', 'Ambroxan'],
      longevity: 4,
      sillage: 3,
      perfumerNote:
        'Fresh linen drying in a coastal courtyard — radiant, airy, and effortlessly uplifting.',
    },
  },
  {
    id: 'ambre-mineral-parfum',
    slug: 'ambre-mineral-eau-de-parfum',
    name: 'Ambre Minéral Eau de Parfum',
    subtitle: 'Unisex Luxury Scent · Sea Salt, Labdanum & Sage',
    category: 'fragrances',
    price: 198,
    originalPrice: 230,
    rating: 4.7,
    reviewCount: 69,
    badge: 'Sale',
    isFeatured: false,
    releaseOrder: 10,
    salesRank: 9,
    images: [
      'https://images.pexels.com/photos/33077018/pexels-photo-33077018.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/13573327/pexels-photo-13573327.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Coastal mineral warmth uniting sunlit labdanum resin, wild eucalyptus sage, and weathered driftwood.',
    description:
      'A study in contrast between cool sea spray and glowing golden resin. Ambre Minéral lingers with understated elegance, evoking misty coastal cliffs warmed by afternoon light.',
    variantLabel: 'Bottle Size',
    variants: [
      { id: '50ml', label: '50 ml / 1.7 fl oz', priceDelta: 0 },
      { id: '100ml', label: '100 ml / 3.4 fl oz', priceDelta: 70 },
    ],
    tags: ['perfume', 'amber', 'mineral', 'unisex', 'coastal', 'sage'],
    fragranceDetails: {
      concentration: 'Eau de Parfum (20% Aromatic Oil)',
      genderProfile: 'Unisex · Mineral Warm Amber',
      topNotes: ['Sea Salt Accord', 'Wild Eucalyptus', 'Bergamot Zest'],
      heartNotes: ['Mediterranean Sage', 'Cistus Labdanum', 'Mineral Incense'],
      baseNotes: ['Weathered Driftwood', 'Golden Benzoin', 'Tonka Bean'],
      longevity: 5,
      sillage: 4,
      perfumerNote:
        'Unmistakably WANDA’S — warm mineral stillness balanced by cool botanical clarity.',
    },
  },

  // ===================== ELECTRONICS =====================
  {
    id: 'aura-anc-earbuds',
    slug: 'aura-quiet-anc-wireless-earbuds',
    name: 'Aura Quiet ANC Earbuds',
    subtitle: 'Adaptive Noise Canceling · Brushed Stone Case',
    category: 'electronics',
    price: 229,
    originalPrice: 259,
    rating: 4.9,
    reviewCount: 204,
    badge: 'Best Seller',
    isBestSeller: true,
    isFeatured: true,
    releaseOrder: 13,
    salesRank: 2,
    images: [
      'https://images.pexels.com/photos/16703772/pexels-photo-16703772.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/16703782/pexels-photo-16703782.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/38919191/pexels-photo-38919191.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Studio-tuned 11mm beryllium drivers with 45dB adaptive noise cancellation in a featherlight matte charging pebble.',
    description:
      'Engineered for acoustic serenity wherever the day moves. Aura Quiet combines dual-hybrid active noise cancellation, natural transparency mode, and multipoint Bluetooth 5.4 inside a tactile matte charging case that supports magnetic Qi wireless charging.',
    variantLabel: 'Finish',
    variants: [
      { id: 'warm-ivory', label: 'Warm Ivory', swatchHex: '#EAE4D8' },
      { id: 'slate-mist', label: 'Slate Mist', swatchHex: '#6F9290' },
      { id: 'obsidian', label: 'Matte Obsidian', swatchHex: '#2C3030' },
    ],
    tags: ['earbuds', 'wireless', 'audio', 'noise canceling', 'headphones', 'tech'],
    electronicsDetails: {
      specs: [
        { label: 'Drivers', value: '11mm Custom Beryllium Dynamic' },
        { label: 'Noise Cancellation', value: 'Adaptive Hybrid ANC up to 45 dB' },
        { label: 'Battery Life', value: '8.5 hrs buds / 34 hrs total with case' },
        { label: 'Connectivity', value: 'Bluetooth 5.4 · Multipoint · LDAC / AAC' },
        { label: 'Water Resistance', value: 'IPX5 Sweat & Weather Resistant' },
        { label: 'Weight', value: '4.6g per earbud · 48g charging case' },
      ],
      features: [
        'Six beamforming microphones with AI wind-noise reduction for crystal-clear calls',
        '10-minute USB-C or Qi wireless quick charge delivers 3 hours of playback',
        'Ergonomic acoustic seal with 4 pairs of medical-grade silicone tips',
        'Seamless auto-pause when removed and instant dual-device switching',
      ],
      inTheBox: [
        'Aura Quiet ANC Wireless Earbuds',
        'Tactile Magnetic Wireless Charging Case',
        'Braided USB-C Charging Cable',
        '4 Pairs of Silicone Ear Tips (XS, S, M, L)',
      ],
      warranty: '2-Year WANDA’S Care Replacement Warranty',
    },
  },
  {
    id: 'chronos-atelier-smartwatch',
    slug: 'chronos-atelier-titanium-smartwatch',
    name: 'Chronos Atelier Smartwatch',
    subtitle: '42mm Brushed Titanium · Sapphire AMOLED Display',
    category: 'electronics',
    price: 345,
    rating: 4.8,
    reviewCount: 96,
    badge: 'New Arrival',
    isNewArrival: true,
    isFeatured: true,
    releaseOrder: 16,
    salesRank: 5,
    images: [
      'https://images.pexels.com/photos/11700618/pexels-photo-11700618.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/9528219/pexels-photo-9528219.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/28396939/pexels-photo-28396939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Architectural watchmaking meets intuitive wellness tracking with a 7-day battery and scratch-proof sapphire glass.',
    description:
      'Designed to look like an heirloom timepiece rather than a bright wrist computer. The Chronos Atelier features a Grade-5 brushed titanium bezel, anti-reflective sapphire crystal, continuous HRV & sleep recovery insights, and quick-release Italian leather & fluoroelastomer bands.',
    variantLabel: 'Case & Strap',
    variants: [
      { id: 'titanium-obsidian', label: 'Brushed Steel / Charcoal', swatchHex: '#35393B' },
      { id: 'champagne-taupe', label: 'Champagne / Warm Taupe', swatchHex: '#C8B9A6' },
      { id: 'sage-titanium', label: 'Titanium / Dusty Teal', swatchHex: '#6F9290' },
    ],
    tags: ['smartwatch', 'watch', 'wearable', 'fitness', 'titanium', 'electronics'],
    electronicsDetails: {
      specs: [
        { label: 'Case Material', value: 'Grade-5 Brushed Titanium · 42mm' },
        { label: 'Display', value: '1.43" LTPO AMOLED · Sapphire Crystal' },
        { label: 'Battery Life', value: 'Up to 7 days typical / 4 days Always-On' },
        { label: 'Sensors', value: 'Optical HR, SpO2, Skin Temp, Dual-Band GPS' },
        { label: 'Water Rating', value: '5 ATM (Swim-ready up to 50m)' },
        { label: 'Compatibility', value: 'iOS 16+ & Android 11+' },
      ],
      features: [
        'Minimalist editorial watch faces curated exclusively for WANDA’S',
        'Discreet haptic notifications with Do Not Disturb calm scheduling',
        'Sleep stages, stress mindfulness prompts, and 40+ movement modes',
        'Tool-free 20mm quick-release strap system included with sport spare',
      ],
      inTheBox: [
        'Chronos Atelier 42mm Smartwatch',
        'Full-Grain Leather Everyday Strap + Active Fluoroelastomer Strap',
        'Magnetic Aluminum Charging Puck',
        'Quick Start & Care Booklet',
      ],
      warranty: '2-Year Limited Hardware Warranty',
    },
  },
  {
    id: 'sonore-studio-headphones',
    slug: 'sonore-studio-wireless-headphones',
    name: 'Sonore Studio Over-Ear Headphones',
    subtitle: 'Lossless Spatial Audio · Memory Foam Lambskin',
    category: 'electronics',
    price: 389,
    originalPrice: 430,
    rating: 4.9,
    reviewCount: 131,
    badge: 'Sale',
    isBestSeller: true,
    isFeatured: true,
    releaseOrder: 12,
    salesRank: 4,
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/34075324/pexels-photo-34075324.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Sculpted anodized aluminum arms and cloud-soft ear cushions delivering 48 hours of warm, studio-reference sound.',
    description:
      'Crafted for deep focus and long-haul flights. Sonore Studio headphones pair bespoke 40mm planar-inspired dynamic drivers with precision tactile volume dials, plush breathable cushions, and lossless USB-C DAC audio playback.',
    variantLabel: 'Colorway',
    variants: [
      { id: 'almond-chalk', label: 'Almond Chalk', swatchHex: '#EFEAE1' },
      { id: 'mist-teal', label: 'Glacier Teal', swatchHex: '#8EA9A8' },
      { id: 'charcoal', label: 'Deep Charcoal', swatchHex: '#2A2D2E' },
    ],
    tags: ['headphones', 'over-ear', 'wireless', 'audio', 'travel', 'studio'],
    electronicsDetails: {
      specs: [
        { label: 'Drivers', value: '40mm Titanium-Coated Acoustic Drivers' },
        { label: 'Battery Life', value: '48 hrs with ANC On · 65 hrs ANC Off' },
        { label: 'Audio Codecs', value: 'aptX Adaptive, AAC, SBC, USB-C Lossless' },
        { label: 'Materials', value: 'Anodized Aluminum & Vegan Lambskin Memory Foam' },
        { label: 'Weight', value: '278g balanced headband distribution' },
      ],
      features: [
        'Tactile knurled aluminum volume wheel — zero accidental swipe taps',
        'Adaptive cinema-grade ANC calibrated for cabin and café acoustics',
        'Fold-flat architectural linen hardshell travel case included',
        'Replaceable magnetic ear cushions for decade-long longevity',
      ],
      inTheBox: [
        'Sonore Studio Wireless Headphones',
        'Woven Linen Hard Travel Case',
        'USB-C to USB-C Audio & Charging Cable',
        '3.5mm Aux In-Flight Adapter Cable',
      ],
      warranty: '2-Year WANDA’S Acoustic Care Warranty',
    },
  },
  {
    id: 'monolith-home-speaker',
    slug: 'monolith-acoustic-home-speaker',
    name: 'Monolith Acoustic Home Speaker',
    subtitle: 'Architectural Table Speaker · AirPlay 2 & Bluetooth',
    category: 'electronics',
    price: 295,
    rating: 4.8,
    reviewCount: 57,
    badge: 'New Arrival',
    isNewArrival: true,
    isFeatured: false,
    releaseOrder: 15,
    salesRank: 11,
    images: [
      'https://images.pexels.com/photos/15485973/pexels-photo-15485973.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/12715509/pexels-photo-12715509.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Room-filling warm acoustic presence wrapped in woven ivory textile and solid brass control dials.',
    description:
      'Designed as an architectural object for bookshelves and credenzas. Monolith delivers balanced stereo staging, effortless multi-room AirPlay 2 streaming, and customizable bass & treble brass dials without needing an app.',
    variantLabel: 'Finish',
    variants: [
      { id: 'warm-cream', label: 'Warm Cream / Brass', swatchHex: '#EFE9DC' },
      { id: 'charcoal-walnut', label: 'Charcoal / Smoked Oak', swatchHex: '#333432' },
    ],
    tags: ['speaker', 'bluetooth', 'home audio', 'interior', 'electronics'],
    electronicsDetails: {
      specs: [
        { label: 'Amplification', value: '80W Class-D Tri-Amplified Architecture' },
        { label: 'Connectivity', value: 'Wi-Fi AirPlay 2, Bluetooth 5.3, 3.5mm Aux' },
        { label: 'Frequency Range', value: '42 Hz – 20,000 Hz room-calibrated' },
        { label: 'Dimensions', value: '260 × 160 × 150 mm · 2.85 kg' },
      ],
      features: [
        'Room-placement acoustic compensation automatically tunes low end',
        'Solid milled brass analog bass, treble, and master volume dials',
        'Pair two units wirelessly for true left-right stereo soundstage',
      ],
      inTheBox: [
        'Monolith Acoustic Home Speaker',
        'Braided Fabric Power Cord',
        'Documentation & Placement Guide',
      ],
      warranty: '2-Year WANDA’S Care Warranty',
    },
  },

  // ===================== FASHION =====================
  {
    id: 'oslo-cashmere-crewneck',
    slug: 'oslo-ribbed-cashmere-crewneck',
    name: 'Oslo Ribbed Cashmere Crewneck',
    subtitle: '100% Grade-A Mongolian Cashmere · Oatmeal Melange',
    category: 'fashion',
    price: 265,
    originalPrice: 310,
    rating: 4.9,
    reviewCount: 173,
    badge: 'Best Seller',
    isBestSeller: true,
    isFeatured: true,
    releaseOrder: 14,
    salesRank: 1,
    images: [
      'https://images.pexels.com/photos/6995886/pexels-photo-6995886.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/6996083/pexels-photo-6996083.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/10464371/pexels-photo-10464371.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Substantial 7-gauge Fisherman rib cashmere knit with dropped shoulders and an effortlessly draped everyday silhouette.',
    description:
      'Our signature knit, refined over three seasons. Spun from sustainably combed Grade-A Inner Mongolian cashmere in a lofty 4-ply tension that resists pilling and softens with every wear. Designed to layer cleanly over crisp shirting or wear directly against bare skin.',
    variantLabel: 'Colorway',
    variants: [
      { id: 'oatmeal', label: 'Oatmeal Melange', swatchHex: '#D9CCB9' },
      { id: 'warm-ivory', label: 'Warm Ivory', swatchHex: '#F3EEE4' },
      { id: 'dusty-teal', label: 'Dusty Teal', swatchHex: '#6F9290' },
      { id: 'espresso', label: 'Deep Espresso', swatchHex: '#473D36' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tags: ['sweater', 'cashmere', 'knitwear', 'fashion', 'apparel', 'crewneck'],
    apparelDetails: {
      material: '100% Certified Grade-A Mongolian Cashmere (4-Ply, 7-Gauge Knit)',
      fit: 'Relaxed architectural fit with gentle dropped shoulder. True to size — size down for a closer drape.',
      modelInfo: 'Model is 5’9” (175 cm) and wears size S for a softly relaxed silhouette.',
      care: [
        'Hand wash cold with delicate wool cleanser or dry clean',
        'Reshape gently and dry flat on a clean cotton towel',
        'Steam lightly — never hang heavy cashmere on wire hangers',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
    },
  },
  {
    id: 'atelier-merino-turtleneck',
    slug: 'atelier-extra-fine-merino-turtleneck',
    name: 'Atelier Merino Turtleneck',
    subtitle: 'Extra-Fine Italian Merino Wool · Sculpted Collar',
    category: 'fashion',
    price: 178,
    rating: 4.8,
    reviewCount: 94,
    badge: 'New Arrival',
    isNewArrival: true,
    isFeatured: true,
    releaseOrder: 16,
    salesRank: 6,
    images: [
      'https://images.pexels.com/photos/6995902/pexels-photo-6995902.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/6995898/pexels-photo-6995898.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/6968322/pexels-photo-6968322.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Plush folded funnel-turtleneck sweater knitted from breathable 19.5-micron Italian merino wool with wide ribbed cuffs.',
    description:
      'Elevated warmth without unnecessary bulk. The Atelier Merino Turtleneck frames the neckline with a softly structured fold-over collar and generous side hem slits that move cleanly with tailored trousers or denim.',
    variantLabel: 'Colorway',
    variants: [
      { id: 'sandstone', label: 'Sandstone', swatchHex: '#CBBBA6' },
      { id: 'deep-teal', label: 'Deep Teal', swatchHex: '#345B59' },
      { id: 'chalk', label: 'Chalk Cream', swatchHex: '#F5F1E8' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tags: ['sweater', 'turtleneck', 'merino', 'wool', 'knitwear', 'fashion'],
    apparelDetails: {
      material: '100% Extra-Fine Zegna Baruffa Italian Merino Wool (RWS Certified)',
      fit: 'Easy modern fit with structured fold-over turtleneck and elongated cuffs.',
      modelInfo: 'Model is 5’8” (173 cm) wearing size M for an editorial oversized collar drape.',
      care: [
        'Air out between wears — merino naturally refreshes overnight',
        'Cold gentle hand wash or eco dry clean',
        'Dry flat away from direct heat',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
    },
  },
  {
    id: 'milan-double-wool-coat',
    slug: 'milan-double-faced-wool-coat',
    name: 'Milan Double-Faced Wool Coat',
    subtitle: 'Hand-Finished Wool Cashmere Blend · Unlined Drape',
    category: 'fashion',
    price: 420,
    originalPrice: 485,
    rating: 4.9,
    reviewCount: 68,
    badge: 'Sale',
    isFeatured: false,
    releaseOrder: 11,
    salesRank: 8,
    images: [
      'https://images.pexels.com/photos/19169185/pexels-photo-19169185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/19169500/pexels-photo-19169500.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/9968539/pexels-photo-9968539.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Fluid longline coat hand-stitched from double-faced virgin wool and cashmere with notched lapels and tie waist.',
    description:
      'A timeless architectural outer layer engineered to glide effortlessly over chunky knitwear. Tailored with clean blind-stitched seams, deep welt pockets, and a removable self-tie belt in warm camel sand.',
    variantLabel: 'Colorway',
    variants: [
      { id: 'warm-camel', label: 'Warm Camel', swatchHex: '#BFA78C' },
      { id: 'almond-stone', label: 'Almond Stone', swatchHex: '#DCD2C3' },
      { id: 'charcoal', label: 'Soft Charcoal', swatchHex: '#313534' },
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    tags: ['coat', 'wool', 'outerwear', 'fashion', 'cashmere', 'tailored'],
    apparelDetails: {
      material: '90% Virgin Wool, 10% Mongolian Cashmere (Double-Faced Hand-Finished)',
      fit: 'Relaxed longline silhouette designed to accommodate mid-to-heavy knitwear underneath.',
      modelInfo: 'Model is 5’10” (178 cm) and wears size S. Coat length: 118 cm.',
      care: [
        'Specialist dry clean only',
        'Brush lightly with a garment brush after wear',
        'Store on a wide contoured wooden coat hanger',
      ],
      sizes: ['XS', 'S', 'M', 'L'],
    },
  },
  {
    id: 'cote-cable-knit-cardigan',
    slug: 'cote-relaxed-cable-knit-cardigan',
    name: 'Côte Cable-Knit Cardigan',
    subtitle: 'Organic Cotton & Alpaca Blend · Horn Buttons',
    category: 'fashion',
    price: 162,
    rating: 4.7,
    reviewCount: 79,
    badge: 'New Arrival',
    isNewArrival: true,
    isFeatured: false,
    releaseOrder: 15,
    salesRank: 10,
    images: [
      'https://images.pexels.com/photos/14642651/pexels-photo-14642651.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/6968179/pexels-photo-6968179.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/14641597/pexels-photo-14641597.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Tactile heritage cable-knit cardigan finished with tonal horn buttons for transitional weekend layering.',
    description:
      'Soft enough for slow Sunday mornings yet structured enough for the studio. Spun from breathable organic combed cotton blended with airy Peruvian baby alpaca for featherweight warmth.',
    variantLabel: 'Colorway',
    variants: [
      { id: 'ecru-cream', label: 'Ecru Cream', swatchHex: '#EFE8DB' },
      { id: 'warm-taupe', label: 'Warm Taupe', swatchHex: '#B6A999' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    tags: ['cardigan', 'sweater', 'knitwear', 'fashion', 'cotton', 'alpaca'],
    apparelDetails: {
      material: '68% Organic Combed Cotton, 24% Baby Alpaca, 8% Recycled Polyamide',
      fit: 'Slightly boxy cropped-hip silhouette with dropped sleeves and patch pockets.',
      modelInfo: 'Model is 5’7” (170 cm) wearing size S.',
      care: [
        'Hand wash cold inside out',
        'Dry flat to maintain stitch structure',
        'Low steam if needed',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
    },
  },

  // ===================== ACCESSORIES =====================
  {
    id: 'paloma-leather-tote',
    slug: 'paloma-structured-leather-tote',
    name: 'Paloma Structured Leather Tote',
    subtitle: 'Full-Grain Italian Calfskin · Fits 15" Laptop',
    category: 'accessories',
    price: 315,
    rating: 4.9,
    reviewCount: 156,
    badge: 'Best Seller',
    isBestSeller: true,
    isFeatured: true,
    releaseOrder: 14,
    salesRank: 2,
    images: [
      'https://images.pexels.com/photos/29359844/pexels-photo-29359844.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/29359836/pexels-photo-29359836.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/29359843/pexels-photo-29359843.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Architectural carryall hand-crafted in Tuscany from supple pebbled calfskin with concealed magnetic closure and suede interior.',
    description:
      'Designed to bring calm order to busy schedules. The Paloma Tote stands upright on its own, accommodates a 15-inch laptop alongside daily essentials, and features an interior zippered pouch plus brushed brass protective feet.',
    variantLabel: 'Leather Shade',
    variants: [
      { id: 'saddle-tan', label: 'Saddle Tan', swatchHex: '#9C6F4E' },
      { id: 'warm-taupe', label: 'Warm Taupe', swatchHex: '#B6A896' },
      { id: 'deep-charcoal', label: 'Soft Charcoal', swatchHex: '#2E3130' },
    ],
    tags: ['tote', 'leather bag', 'accessories', 'work bag', 'handbag', 'everyday'],
    accessoriesDetails: {
      material: '100% Vegetable-Tanned Full-Grain Italian Calfskin · Microsuede Lining',
      dimensions: '38 cm W × 29 cm H × 14 cm D · Handle Drop: 26 cm',
      craftsmanship: 'Hand-assembled and edge-painted in small family ateliers outside Florence.',
      features: [
        'Fits laptops up to 15 inches without bulging silhouette',
        'Detachable zipped leather essentials pouch + interior key leash',
        'Concealed rare-earth magnetic top clasp & brushed gold feet',
        'Arrives in a heavyweight organic cotton WANDA’S dust bag',
      ],
    },
  },
  {
    id: 'solaire-acetate-sunglasses',
    slug: 'solaire-sculpted-acetate-sunglasses',
    name: 'Solaire Sculpted Sunglasses',
    subtitle: 'Italian Mazzucchelli Acetate · Polarized CR-39 Lenses',
    category: 'accessories',
    price: 148,
    originalPrice: 175,
    rating: 4.8,
    reviewCount: 88,
    badge: 'Sale',
    isFeatured: true,
    releaseOrder: 13,
    salesRank: 6,
    images: [
      'https://images.pexels.com/photos/15119011/pexels-photo-15119011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/7602969/pexels-photo-7602969.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Hand-polished architectural frames with subtle beveled browlines and 100% UVA/UVB polarized amber-tinted lenses.',
    description:
      'Balanced weight and timeless proportions for year-round wear. Milled from plant-based Italian cellulose acetate and anchored with five-barrel German steel hinges for enduring alignment.',
    variantLabel: 'Frame Finish',
    variants: [
      { id: 'havana-tortoise', label: 'Warm Tortoiseshell', swatchHex: '#7B5030' },
      { id: 'champagne-clear', label: 'Champagne Crystal', swatchHex: '#DFD2BD' },
      { id: 'noir-espresso', label: 'Obsidian Espresso', swatchHex: '#2A2726' },
    ],
    tags: ['sunglasses', 'eyewear', 'accessories', 'acetate', 'polarized'],
    accessoriesDetails: {
      material: 'Plant-Based Italian Mazzucchelli Cellulose Acetate · CR-39 Polarized Lenses',
      dimensions: 'Lens 50 mm · Bridge 21 mm · Temple 145 mm (Universal Medium Fit)',
      craftsmanship: 'Tumbled for 72 hours in beechwood chips and hand-buffed to a glass-like luster.',
      features: [
        '100% UVA & UVB optical-grade protection with anti-glare inner coating',
        'Custom five-barrel stainless steel hinges with engraved core wire',
        'Includes collapsible taupe leather protective case & microfiber cloth',
      ],
    },
  },
  {
    id: 'verve-minimal-cardholder',
    slug: 'verve-slim-leather-cardholder',
    name: 'Verve Slim Leather Cardholder',
    subtitle: 'Full-Grain Saddle Leather · RFID-Shielded',
    category: 'accessories',
    price: 78,
    rating: 4.9,
    reviewCount: 121,
    badge: 'New Arrival',
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: false,
    releaseOrder: 16,
    salesRank: 4,
    images: [
      'https://images.pexels.com/photos/27467367/pexels-photo-27467367.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/28028316/pexels-photo-28028316.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/28027133/pexels-photo-28027133.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Feather-thin everyday pocket organizer with four chamfered card slots, center bill slip, and hand-burnished edges.',
    description:
      'Designed to patina gracefully over years of daily reach. Cut from drum-dyed vegetable-tanned leather with clean tonal saddle stitching and discreet RFID shielding tucked inside its ultra-slim profile.',
    variantLabel: 'Colorway',
    variants: [
      { id: 'cognac', label: 'Warm Cognac', swatchHex: '#A6633C' },
      { id: 'sand', label: 'Almond Sand', swatchHex: '#D1C2AD' },
      { id: 'deep-teal', label: 'Deep Teal', swatchHex: '#345B59' },
    ],
    tags: ['wallet', 'cardholder', 'leather', 'accessories', 'gift', 'everyday'],
    accessoriesDetails: {
      material: '100% Full-Grain Vegetable-Tanned European Leather',
      dimensions: '10.2 cm W × 7.2 cm H × 0.5 cm D',
      craftsmanship: 'Hand-creased and edge-painted in three thin coats for fray-free durability.',
      features: [
        'Holds up to 6–8 cards plus folded notes without losing slim silhouette',
        'Discreet built-in RFID shielding lining',
        'Presented in a signature WANDA’S almond linen gift box',
      ],
    },
  },
  {
    id: 'lumen-dress-timepiece',
    slug: 'lumen-minimalist-steel-timepiece',
    name: 'Lumen Minimalist Timepiece',
    subtitle: '38mm Brushed Stainless Steel · Swiss Quartz',
    category: 'accessories',
    price: 245,
    rating: 4.8,
    reviewCount: 74,
    badge: 'Limited Edition',
    isFeatured: false,
    releaseOrder: 12,
    salesRank: 12,
    images: [
      'https://images.pexels.com/photos/5656590/pexels-photo-5656590.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      'https://images.pexels.com/photos/10414975/pexels-photo-10414975.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    ],
    shortDescription:
      'Ultra-thin 6.8mm architectural watch featuring a sunray champagne dial, faceted hands, and supple mesh-link bracelet.',
    description:
      'Quiet horological elegance pared back to pure proportion. Powered by a precision Swiss Ronda movement encased in surgical-grade 316L brushed steel with domed sapphire crystal.',
    variantLabel: 'Dial & Finish',
    variants: [
      { id: 'silver-ivory', label: 'Brushed Silver / Ivory Dial', swatchHex: '#D8D9DA' },
      { id: 'slate-steel', label: 'Gunmetal / Slate Dial', swatchHex: '#4E5456' },
    ],
    tags: ['watch', 'timepiece', 'accessories', 'jewelry', 'minimalist'],
    accessoriesDetails: {
      material: '316L Brushed Stainless Steel · Anti-Reflective Domed Sapphire Crystal',
      dimensions: '38 mm Case Diameter · 6.8 mm Ultra-Slim Profile · 18 mm Bracelet',
      craftsmanship: 'Individually pressure-tested to 5 ATM and regulated with Swiss quartz precision.',
      features: [
        'Ultra-thin case glides effortlessly beneath sweater and shirt cuffs',
        'Micro-adjustable butterfly clasp with quick-release spring bars',
        '3-year Swiss battery life & complimentary presentation travel roll',
      ],
    },
  },
];

export const getProductById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getCategoryMeta = (id: ProductCategory): CategoryMeta =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
