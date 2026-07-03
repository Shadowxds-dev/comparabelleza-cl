export type ProductType = "secador" | "plancha" | "depiladora" | "facial";

export type ProductTier = "economica" | "media" | "premium" | "profesional";

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  type: ProductType;
  tier: ProductTier;
  price: number;
  currency: "CLP";
  rating: number;
  reviewCount: number;
  affiliateUrl: string;
  image: string;
  idealFor: string;
  description: string;
  pros: string[];
  cons: string[];
  features: string[];
  specs: Spec[];
}
