"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import VehicleCard from "@/components/vehicle/VehicleCard";
import VehicleFilters from "@/components/vehicle/VehicleFilters";
import { vehicleApi, Vehicle } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function VehiclesPage() {
  const searchParams = useSearchParams();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [filters, setFilters] = useState({
    brand: searchParams.get("brand") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    fuelType: searchParams.get("fuelType") || "",
    transmission: searchParams.get("transmission") || "",
    year: searchParams.get("year") || "",
  });

  useEffect(() => {
    fetchVehicles();
  }, [currentPage, filters]);

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const params: any = { page: currentPage, limit: 12 };

      if (filters.brand) params.brand = filters.brand;
      if (filters.minPrice) params.minPrice = parseFloat(filters.minPrice);
      if (filters.maxPrice) params.maxPrice = parseFloat(filters.maxPrice);
      if (filters.fuelType) params.fuelType = filters.fuelType;
      if (filters.transmission) params.transmission = filters.transmission;
      if (filters.year) params.year = parseInt(filters.year);

      const response = await vehicleApi.getAll(params);

      if (response.success) {
        setVehicles(response.data);
        setTotalPages(response.pagination.pages);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-10">
          <motion.h1
            className="text-4xl font-bold mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Browse Our Collection
          </motion.h1>

          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Find your perfect vehicle from our curated selection.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* SIDEBAR FILTERS */}
          <aside className="lg:w-72 lg:sticky lg:top-24 h-fit">
            <VehicleFilters filters={filters} onChange={handleFilterChange} />
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1">
            {/* RESULTS COUNT */}
            <div className="mb-6">
              <p className="text-gray-600 text-sm">
                {isLoading ? "Loading..." : `${vehicles.length} vehicles found`}
              </p>
            </div>

            {/* LOADING STATE WITH ANIMATION */}
            {isLoading && (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-10 h-10 animate-spin text-red-600" />
              </div>
            )}

            {/* EMPTY STATE */}
            {!isLoading && vehicles.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-xl text-gray-600 mb-4">
                  No vehicles match your filters
                </p>

                <Button
                  onClick={() =>
                    setFilters({
                      brand: "",
                      minPrice: "",
                      maxPrice: "",
                      fuelType: "",
                      transmission: "",
                      year: "",
                    })
                  }
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}

            {/* VEHICLE GRID */}
            {!isLoading && vehicles.length > 0 && (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPage} // smooth animation when switching pages
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  >
                    {vehicles.map((vehicle) => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((p) => Math.max(1, p - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <Button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 ${page === currentPage
                                ? "bg-red-600 text-white"
                                : ""
                              }`}
                            variant={page === currentPage ? "default" : "outline"}
                          >
                            {page}
                          </Button>
                        )
                      )}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
