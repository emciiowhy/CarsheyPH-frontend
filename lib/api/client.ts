// frontend/lib/api/client.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface ApiOptions extends RequestInit {
  token?: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: ApiOptions = {}
  ): Promise<T> {
    const { token, ...fetchOptions } = options;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    };

    // Cast headers to Record<string, string> to safely assign Authorization
    const headersObj = headers as Record<string, string>;
    if (token) headersObj['Authorization'] = `Bearer ${token}`;

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...fetchOptions,
      headers: headersObj,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'An error occurred',
      }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', token });
  }

  async post<T>(endpoint: string, data: any, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      token,
    });
  }

  async put<T>(endpoint: string, data: any, token?: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      token,
    });
  }

  async delete<T>(endpoint: string, token?: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', token });
  }
}

export const apiClient = new ApiClient();

// ============================================
// TYPES
// ============================================

export interface VehicleImage {
  id: string;
  url: string;
  alt?: string;
  type?: string;
  order?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  variant?: string;
  transmission: string;
  fuelType: string;
  images: VehicleImage[];
  status?: 'available' | 'sold' | string;

  // ⭐ New field — safe, optional, no breaking changes
  thumbnailUrl?: string;
  
  // Frontend-specific fields
  price?: number;
  mileage?: number;
  color?: string;
  bodyType?: string;
  description?: string;
  location?: string;

  category?: Category;
  featured?: boolean;
}

// Helper function to get first image URL safely
export const getVehicleImageUrl = (vehicle: Vehicle, index = 0): string => {
  if (!vehicle.images || vehicle.images.length === 0) return '/placeholder-car.jpg';
  const img = vehicle.images[index];
  return typeof img === 'string' ? img : img.url;
};

// ============================================
// API CALLS
// ============================================

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export const vehicleApi = {
  getAll: async (params?: Record<string, any>): Promise<PaginatedResponse<Vehicle>> => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) queryParams.append(key, String(value));
      });
    }
    return apiClient.get<PaginatedResponse<Vehicle>>(
      `/api/vehicles?${queryParams.toString()}`
    );
  },

  getBySlug: async (slug: string) => {
    return apiClient.get<{ success: boolean; data: Vehicle }>(
      `/api/vehicles/${slug}`
    );
  },

  search: async (query: string, page = 1, limit = 12) => {
    return apiClient.get<PaginatedResponse<Vehicle>>(
      `/api/vehicles/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );
  },

  getFeatured: async (limit = 6) => {
    return apiClient.get<PaginatedResponse<Vehicle>>(
      `/api/vehicles/featured?limit=${limit}`
    );
  },
};

// ============================================
// Test Drive API
// ============================================

export const testDriveApi = {
  book: async (data: {
    vehicleId: string;
    preferredDate: string;
    preferredTime: string;
    location: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes?: string;
  }) => {
    return apiClient.post<{ success: boolean; message: string }>('/api/test-drive', data);
  },
};
