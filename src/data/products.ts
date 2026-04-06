export interface Impact {
  plastic: number;   // in grams
  carbon: number;    // in kg
  water: number;     // in gallons
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  impact: Impact;
  isEco: boolean;
  alternativeId: string | null;
  imageUrl?: string;
}

export const products: Product[] = [
  // Pair 1: Water Bottles
  {
    id: "p1",
    name: "Single-Use Plastic Water Bottles (6pk)",
    brand: "AquaLife",
    category: "Beverages",
    impact: { plastic: 15.5, carbon: 0.28, water: 3.2 },
    isEco: false,
    alternativeId: "e1",
    imageUrl: "/images/single use plastic bottle.jpg",
  },
  {
    id: "e1",
    name: "Insulated Stainless Steel Bottle",
    brand: "EcoFlask",
    category: "Beverages",
    impact: { plastic: 0.8, carbon: 0.65, water: 12.5 }, // High production footprint, but long life
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Stainless Steel Filtered Bottle.jpg",
  },

  // Pair 2: Laundry Detergent
  {
    id: "p2",
    name: "Liquid Laundry Detergent (64oz)",
    brand: "CleanWash",
    category: "Home Cleaning",
    impact: { plastic: 245, carbon: 2.1, water: 54.0 },
    isEco: false,
    alternativeId: "e2",
    imageUrl: "/images/Liquid Laundry Detergent Jug.jpg",
  },
  {
    id: "e2",
    name: "Ultra-Concentrated Detergent Sheets",
    brand: "EarthWash",
    category: "Home Cleaning",
    impact: { plastic: 1.5, carbon: 0.35, water: 2.4 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Eco-Friendly Laundry Detergent Sheets.jpg",
  },

  // Pair 3: Coffee Pods
  {
    id: "p3",
    name: "Plastic Coffee Pods (50 ct)",
    brand: "MorningBrew",
    category: "Pantry",
    impact: { plastic: 152, carbon: 3.2, water: 8.5 },
    isEco: false,
    alternativeId: "e3",
    imageUrl: "/images/Plastic Coffee Pods (50 ct).jpg",
  },
  {
    id: "e3",
    name: "Compostable Coffee Pods (50 ct)",
    brand: "GreenRoast",
    category: "Pantry",
    impact: { plastic: 0.2, carbon: 0.8, water: 4.2 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Compostable Coffee Pods (50 ct).jpg",
  },

  // Pair 4: Shampoo
  {
    id: "p4",
    name: "Standard Shampoo (400ml Bottle)",
    brand: "SilkyHair",
    category: "Personal Care",
    impact: { plastic: 48, carbon: 0.75, water: 22.4 },
    isEco: false,
    alternativeId: "e4",
    imageUrl: "/images/Standard Shampoo Bottle (400ml).jpg",
  },
  {
    id: "e4",
    name: "Intense Hydration Shampoo Bar",
    brand: "NaturesLather",
    category: "Personal Care",
    impact: { plastic: 0.4, carbon: 0.08, water: 3.5 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Solid Shampoo Bar (100g).jpg",
  },

  // Pair 5: Toothbrush
  {
    id: "p5",
    name: "Manual Plastic Toothbrush",
    brand: "SmileBright",
    category: "Personal Care",
    impact: { plastic: 22.5, carbon: 0.06, water: 0.8 },
    isEco: false,
    alternativeId: "e5",
    imageUrl: "/images/Plastic Toothbrush.jpg",
  },
  {
    id: "e5",
    name: "Biodegradable Bamboo Toothbrush",
    brand: "EarthBrush",
    category: "Personal Care",
    impact: { plastic: 0.95, carbon: 0.02, water: 0.4 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Bamboo Toothbrush.jpg",
  },

  // Pair 6: Grocery Bags
  {
    id: "p6",
    name: "HDPE Plastic Grocery Bags (50ct)",
    brand: "StoreBrand",
    category: "Kitchen",
    impact: { plastic: 320, carbon: 1.45, water: 2.8 },
    isEco: false,
    alternativeId: "e6",
    imageUrl: "/images/Plastic Grocery Bags.jpg",
  },
  {
    id: "e6",
    name: "Organic Cotton Canvas Tote",
    brand: "EverBag",
    category: "Kitchen",
    impact: { plastic: 2.5, carbon: 1.1, water: 220.0 }, // Realism: Organic cotton uses tons of water
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Reusable Cotton Canvas Tote.jpg",
  },

  // Pair 7: Straws
  {
    id: "p7",
    name: "Bulk Plastic Straws (200 ct)",
    brand: "SipEasy",
    category: "Kitchen",
    impact: { plastic: 84, carbon: 0.25, water: 1.4 },
    isEco: false,
    alternativeId: "e7",
    imageUrl: "/images/Plastic Straws.jpg",
  },
  {
    id: "e7",
    name: "Food-Grade Metal Straws (4 ct)",
    brand: "SteelSip",
    category: "Kitchen",
    impact: { plastic: 0.15, carbon: 0.45, water: 0.8 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Reusable Metal Straws.jpg",
  },

  // Pair 8: Body Wash
  {
    id: "p8",
    name: "Liquid Body Wash (500ml Bottle)",
    brand: "FreshGlow",
    category: "Personal Care",
    impact: { plastic: 65, carbon: 0.92, water: 28.5 },
    isEco: false,
    alternativeId: "e8",
    imageUrl: "/images/Liquid Body Wash.jpg",
  },
  {
    id: "e8",
    name: "Argan Oil Organic Soap Bar",
    brand: "PureLather",
    category: "Personal Care",
    impact: { plastic: 0.5, carbon: 0.12, water: 2.1 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Organic Soap Bar.jpg",
  },

  // Pair 9: Paper Towels
  {
    id: "p9",
    name: "Virgin Fiber Paper Towels (12pk)",
    brand: "QuickSpill",
    category: "Home Cleaning",
    impact: { plastic: 154, carbon: 5.1, water: 135.0 },
    isEco: false,
    alternativeId: "e9",
    imageUrl: "/images/Bleached Paper Towels.jpg",
  },
  {
    id: "e9",
    name: "Sustainable Bamboo Roll Towels",
    brand: "TreeFree",
    category: "Home Cleaning",
    impact: { plastic: 3.2, carbon: 0.85, water: 14.2 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Reusable Bamboo Towels.jpg",
  },

  // Pair 10: Cling Wrap
  {
    id: "p10",
    name: "PVC Plastic Food Wrap (100ft)",
    brand: "WrapIt",
    category: "Kitchen",
    impact: { plastic: 205, carbon: 1.35, water: 0.8 },
    isEco: false,
    alternativeId: "e10",
    imageUrl: "/images/Plastic Cling Wrap.jpg",
  },
  {
    id: "e10",
    name: "Reusable Beeswax Food Wraps",
    brand: "BeeSaver",
    category: "Kitchen",
    impact: { plastic: 0.1, carbon: 0.25, water: 0.4 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Beeswax Food Wraps.jpg",
  },

  // Pair 11: Trash Bags
  {
    id: "p11",
    name: "Synthetic Resin Trash Bags (40ct)",
    brand: "ToughBin",
    category: "Home Cleaning",
    impact: { plastic: 605, carbon: 3.4, water: 1.5 },
    isEco: false,
    alternativeId: "e11",
    imageUrl: "/images/Standard Plastic Trash Bags.jpg",
  },
  {
    id: "e11",
    name: "Biodegradable Plant-Starch Bags",
    brand: "EarthBin",
    category: "Home Cleaning",
    impact: { plastic: 1.2, carbon: 0.95, water: 1.1 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/100_Percent_Compostable_Trash_Bags.jpg",
  },

  // Pair 12: Dish Sponge
  {
    id: "p12",
    name: "Polyurethane Dish Sponges (6 Pack)",
    brand: "ScrubPro",
    category: "Kitchen",
    impact: { plastic: 42, carbon: 0.55, water: 0.7 },
    isEco: false,
    alternativeId: "e12",
    imageUrl: "/images/Synthetic Dish Sponges.jpg",
  },
  {
    id: "e12",
    name: "Organic Natural Loofah Sponges",
    brand: "PlantScrub",
    category: "Kitchen",
    impact: { plastic: 0.35, carbon: 0.08, water: 2.5 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Natural Loofah Sponges.jpg",
  },

  // Pair 13: Deodorant
  {
    id: "p13",
    name: "Aerosol Plastic Deodorant (150ml)",
    brand: "AeroShield",
    category: "Personal Care",
    impact: { plastic: 32, carbon: 1.8, water: 1.2 },
    isEco: false,
    alternativeId: "e13",
    imageUrl: "/images/Aerosol Antiperspirant.jpg",
  },
  {
    id: "e13",
    name: "Zero-Waste Deodorant (Cardboard)",
    brand: "EcoScent",
    category: "Personal Care",
    impact: { plastic: 0.2, carbon: 0.35, water: 0.2 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Natural Deodorant in Cardboard Tube.jpg",
  },

  // Pair 14: Safety Razor
  {
    id: "p14",
    name: "Bulk Disposable Plastic Razors (10pk)",
    brand: "SmoothShave",
    category: "Personal Care",
    impact: { plastic: 125, carbon: 1.1, water: 3.5 },
    isEco: false,
    alternativeId: "e14",
    imageUrl: "/images/Disposable Plastic Razors.jpg",
  },
  {
    id: "e14",
    name: "Full Metal Safety Razor (Reusable)",
    brand: "ForeverBlade",
    category: "Personal Care",
    impact: { plastic: 0.12, carbon: 0.85, water: 2.1 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Stainless Steel Safety Razor.jpg",
  },

  // Pair 15: Storage Containers
  {
    id: "p15",
    name: "BPA-Inclusive Storage Set (10 Set)",
    brand: "TupperLite",
    category: "Kitchen",
    impact: { plastic: 840, carbon: 4.2, water: 5.5 },
    isEco: false,
    alternativeId: "e15",
    imageUrl: "/images/Plastic Food Storage Containers.jpg",
  },
  {
    id: "e15",
    name: "Tempered Glass Storage with Bamboo",
    brand: "ClearEarth",
    category: "Kitchen",
    impact: { plastic: 2.1, carbon: 3.1, water: 8.4 }, // Heavier, more energy to melt glass
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Glass Storage Containers with Bamboo Lids.jpg",
  }
];
