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
    name: "Single-Use Plastic Water Bottle",
    brand: "AquaLife",
    category: "Beverages",
    impact: { plastic: 15, carbon: 0.1, water: 1.5 },
    isEco: false,
    alternativeId: "e1",
    imageUrl: "/images/single use plastic bottle.jpg",
  },
  {
    id: "e1",
    name: "Stainless Steel Filtered Bottle",
    brand: "EcoFlask",
    category: "Beverages",
    impact: { plastic: 0, carbon: 0.5, water: 0 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Stainless Steel Filtered Bottle.jpg",
  },

  // Pair 2: Laundry Detergent
  {
    id: "p2",
    name: "Liquid Laundry Detergent Jug (64oz)",
    brand: "CleanWash",
    category: "Home Cleaning",
    impact: { plastic: 250, carbon: 1.8, water: 45 },
    isEco: false,
    alternativeId: "e2",
    imageUrl: "/images/Liquid Laundry Detergent Jug.jpg",
  },
  {
    id: "e2",
    name: "Eco-Friendly Laundry Detergent Sheets",
    brand: "EarthWash",
    category: "Home Cleaning",
    impact: { plastic: 0, carbon: 0.1, water: 1 },
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
    impact: { plastic: 150, carbon: 2.5, water: 5 },
    isEco: false,
    alternativeId: "e3",
    imageUrl: "/images/Plastic Coffee Pods (50 ct).jpg",
  },
  {
    id: "e3",
    name: "Compostable Coffee Pods (50 ct)",
    brand: "GreenRoast",
    category: "Pantry",
    impact: { plastic: 0, carbon: 0.4, water: 2 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Compostable Coffee Pods (50 ct).jpg",
  },

  // Pair 4: Shampoo
  {
    id: "p4",
    name: "Standard Shampoo Bottle (400ml)",
    brand: "SilkyHair",
    category: "Personal Care",
    impact: { plastic: 45, carbon: 0.6, water: 20 },
    isEco: false,
    alternativeId: "e4",
    imageUrl: "/images/Standard Shampoo Bottle (400ml).jpg",
  },
  {
    id: "e4",
    name: "Solid Shampoo Bar (100g)",
    brand: "NaturesLather",
    category: "Personal Care",
    impact: { plastic: 0, carbon: 0.05, water: 2 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Solid Shampoo Bar (100g).jpg",
  },

  // Pair 5: Toothbrush
  {
    id: "p5",
    name: "Plastic Toothbrush",
    brand: "SmileBright",
    category: "Personal Care",
    impact: { plastic: 20, carbon: 0.05, water: 0.5 },
    isEco: false,
    alternativeId: "e5",
    imageUrl: "/images/Plastic Toothbrush.jpg",
  },
  {
    id: "e5",
    name: "Bamboo Toothbrush",
    brand: "EarthBrush",
    category: "Personal Care",
    impact: { plastic: 0, carbon: 0.01, water: 0.2 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Bamboo Toothbrush.jpg",
  },

  // Pair 6: Grocery Bags
  {
    id: "p6",
    name: "Plastic Grocery Bags (50 Pack)",
    brand: "StoreBrand",
    category: "Kitchen",
    impact: { plastic: 300, carbon: 1.2, water: 2 },
    isEco: false,
    alternativeId: "e6",
    imageUrl: "/images/Plastic Grocery Bags.jpg",
  },
  {
    id: "e6",
    name: "Reusable Cotton Canvas Tote",
    brand: "EverBag",
    category: "Kitchen",
    impact: { plastic: 0, carbon: 0.3, water: 15 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Reusable Cotton Canvas Tote.jpg",
  },

  // Pair 7: Straws
  {
    id: "p7",
    name: "Plastic Straws (200 ct)",
    brand: "SipEasy",
    category: "Kitchen",
    impact: { plastic: 80, carbon: 0.2, water: 1 },
    isEco: false,
    alternativeId: "e7",
    imageUrl: "/images/Plastic Straws.jpg",
  },
  {
    id: "e7",
    name: "Reusable Metal Straws (4 ct)",
    brand: "SteelSip",
    category: "Kitchen",
    impact: { plastic: 0, carbon: 0.15, water: 0.5 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Reusable Metal Straws.jpg",
  },

  // Pair 8: Body Wash
  {
    id: "p8",
    name: "Liquid Body Wash (500ml)",
    brand: "FreshGlow",
    category: "Personal Care",
    impact: { plastic: 60, carbon: 0.8, water: 25 },
    isEco: false,
    alternativeId: "e8",
    imageUrl: "/images/Liquid Body Wash.jpg",
  },
  {
    id: "e8",
    name: "Organic Soap Bar (150g)",
    brand: "PureLather",
    category: "Personal Care",
    impact: { plastic: 0, carbon: 0.1, water: 1.5 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Organic Soap Bar.jpg",
  },

  // Pair 9: Paper Towels
  {
    id: "p9",
    name: "Bleached Paper Towels (12 Rolls)",
    brand: "QuickSpill",
    category: "Home Cleaning",
    impact: { plastic: 150, carbon: 4.5, water: 120 },
    isEco: false,
    alternativeId: "e9",
    imageUrl: "/images/Bleached Paper Towels.jpg",
  },
  {
    id: "e9",
    name: "Reusable Bamboo Towels",
    brand: "TreeFree",
    category: "Home Cleaning",
    impact: { plastic: 0, carbon: 0.5, water: 10 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Reusable Bamboo Towels.jpg",
  },

  // Pair 10: Cling Wrap
  {
    id: "p10",
    name: "Plastic Cling Wrap (100 sq ft)",
    brand: "WrapIt",
    category: "Kitchen",
    impact: { plastic: 200, carbon: 1.1, water: 0.5 },
    isEco: false,
    alternativeId: "e10",
    imageUrl: "/images/Plastic Cling Wrap.jpg",
  },
  {
    id: "e10",
    name: "Beeswax Food Wraps (Set of 3)",
    brand: "BeeSaver",
    category: "Kitchen",
    impact: { plastic: 0, carbon: 0.1, water: 0.2 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Beeswax Food Wraps.jpg",
  },

  // Pair 11: Trash Bags
  {
    id: "p11",
    name: "Standard Plastic Trash Bags (40 ct)",
    brand: "ToughBin",
    category: "Home Cleaning",
    impact: { plastic: 600, carbon: 2.8, water: 1 },
    isEco: false,
    alternativeId: "e11",
    imageUrl: "/images/Standard Plastic Trash Bags.jpg",
  },
  {
    id: "e11",
    name: "100% Compostable Trash Bags",
    brand: "EarthBin",
    category: "Home Cleaning",
    impact: { plastic: 0, carbon: 0.6, water: 0.5 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/100_Percent_Compostable_Trash_Bags.jpg",
  },

  // Pair 12: Dish Sponge
  {
    id: "p12",
    name: "Synthetic Dish Sponges (6 Pack)",
    brand: "ScrubPro",
    category: "Kitchen",
    impact: { plastic: 40, carbon: 0.4, water: 0.5 },
    isEco: false,
    alternativeId: "e12",
    imageUrl: "/images/Synthetic Dish Sponges.jpg",
  },
  {
    id: "e12",
    name: "Natural Loofah Sponges (6 Pack)",
    brand: "PlantScrub",
    category: "Kitchen",
    impact: { plastic: 0, carbon: 0.05, water: 2 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Natural Loofah Sponges.jpg",
  },

  // Pair 13: Deodorant
  {
    id: "p13",
    name: "Aerosol Antiperspirant (150ml)",
    brand: "AeroShield",
    category: "Personal Care",
    impact: { plastic: 30, carbon: 1.2, water: 1 },
    isEco: false,
    alternativeId: "e13",
    imageUrl: "/images/Aerosol Antiperspirant.jpg",
  },
  {
    id: "e13",
    name: "Natural Deodorant in Cardboard Tube",
    brand: "EcoScent",
    category: "Personal Care",
    impact: { plastic: 0, carbon: 0.2, water: 0.1 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Natural Deodorant in Cardboard Tube.jpg",
  },

  // Pair 14: Safety Razor
  {
    id: "p14",
    name: "Disposable Plastic Razors (10 Pack)",
    brand: "SmoothShave",
    category: "Personal Care",
    impact: { plastic: 120, carbon: 0.9, water: 3 },
    isEco: false,
    alternativeId: "e14",
    imageUrl: "/images/Disposable Plastic Razors.jpg",
  },
  {
    id: "e14",
    name: "Stainless Steel Safety Razor",
    brand: "ForeverBlade",
    category: "Personal Care",
    impact: { plastic: 0, carbon: 0.4, water: 1.5 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Stainless Steel Safety Razor.jpg",
  },

  // Pair 15: Storage Containers
  {
    id: "p15",
    name: "Plastic Food Storage Containers (10 Set)",
    brand: "TupperLite",
    category: "Kitchen",
    impact: { plastic: 800, carbon: 3.5, water: 4 },
    isEco: false,
    alternativeId: "e15",
    imageUrl: "/images/Plastic Food Storage Containers.jpg",
  },
  {
    id: "e15",
    name: "Glass Storage Containers with Bamboo Lids",
    brand: "ClearEarth",
    category: "Kitchen",
    impact: { plastic: 0, carbon: 1.8, water: 6 },
    isEco: true,
    alternativeId: null,
    imageUrl: "/images/Glass Storage Containers with Bamboo Lids.jpg",
  }
];
