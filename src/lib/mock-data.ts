export type TopSaree = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  inStock: boolean;
};

export type TopSeller = {
  id: string;
  name: string;
  shopName: string;
  avatar: string;
  totalProducts: number;
  rating: number;
  totalSales: number;
};

export const TOP_SAREES: TopSaree[] = [
  {
    id: "1",
    name: "Royal Banarasi Silk",
    description: "Handwoven gold zari border with rich maroon body.",
    price: 12500,
    rating: 4.9,
    image:
      "/a_high_quality_high_resolution_professional_photography_of_an_elegant_indian.png",
    category: "Silk",
    inStock: true,
  },
  {
    id: "2",
    name: "Golden Kanjivaram",
    description: "Temple-inspired motifs with luxurious silk drape.",
    price: 18900,
    rating: 4.8,
    image:
      "/a_high_quality_professional_8k_photography_of_an_elegant_indian_woman_wearing_a.png",
    category: "Silk",
    inStock: true,
  },
  {
    id: "3",
    name: "Heritage Jamdani",
    description: "Delicate floral weave in soft ivory and gold tones.",
    price: 9800,
    rating: 4.7,
    image:
      "/a_high_quality_professional_8k_photography_of_an_elegant_indian_woman_wearing_a%20(1).png",
    category: "Jamdani",
    inStock: false,
  },
  {
    id: "4",
    name: "Festive Muslin Saree",
    description: "Lightweight muslin with subtle embroidered details.",
    price: 7200,
    rating: 4.6,
    image:
      "/a_high_quality_high_resolution_professional_photography_of_an_elegant_indian.png",
    category: "Muslin",
    inStock: true,
  },
];

export const TOP_SELLERS: TopSeller[] = [
  {
    id: "1",
    name: "Aparna Rahman",
    shopName: "Aparna Heritage Weaves",
    avatar: "AR",
    totalProducts: 48,
    rating: 4.9,
    totalSales: 320,
  },
  {
    id: "2",
    name: "Sultana Begum",
    shopName: "Silk & Soul Boutique",
    avatar: "SB",
    totalProducts: 36,
    rating: 4.8,
    totalSales: 275,
  },
  {
    id: "3",
    name: "Meera Das",
    shopName: "Bengal Loom House",
    avatar: "MD",
    totalProducts: 29,
    rating: 4.7,
    totalSales: 198,
  },
];

export function formatBdt(amount: number) {
  return `৳${amount.toLocaleString("en-BD")}`;
}
