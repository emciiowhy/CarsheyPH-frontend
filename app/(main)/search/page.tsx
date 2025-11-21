//frontend/app/(main)/search/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { vehicleApi, Vehicle } from "@/lib/api/client";
import VehicleCard from "@/components/vehicle/VehicleCard";
import { Loader2 } from "lucide-react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    fetchSearchResults();
  }, [query]);

  const fetchSearchResults = async () => {
    setIsLoading(true);
    try {
      // ✅ FIXED — pass string, not object
      const response = await vehicleApi.search(query);

      if (response.success) {
        setVehicles(response.data);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-bold">
            Search Results
          </h1>
          <p className="text-gray-600 mt-2">
            Showing results for: <span className="font-semibold">"{query}"</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10">

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        )}

        {!isLoading && vehicles.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              No vehicles found
            </h2>
            <p className="text-gray-600">
              Try adjusting your search or browsing all vehicles.
            </p>
          </div>
        )}

        {!isLoading && vehicles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
