// frontend/types/Vehicle.ts

export interface VehicleImage {
  id: string;
  url: string;
  alt: string;
  type: string;
  order: number;
  vehicleId: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Vehicle {
  id: string;
  slug: string;

  brand: string;
  model: string;
  variant?: string;

  year: number;

  cashPrice: number;
  downPayment: number;
  monthlyPayment: number;
  leaseTerm: number;

  transmission: string;
  fuelType: string;
  engineSize?: string;
  horsepower?: number;
  seatingCapacity: number;
  cargoSpace?: string;

  features: Record<string, any>;
  specifications: Record<string, any>;
  description?: string;

  thumbnailUrl: string;
  videos: string[];

  status: "AVAILABLE" | "SOLD" | "RESERVED";
  availability: string;
  featured: boolean;
  stockCount: number;

  categoryId: string;
  category: Category;

  images: VehicleImage[];

  createdAt: string;
  updatedAt: string;
}
