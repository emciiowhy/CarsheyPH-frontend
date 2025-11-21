//  frontend/components/home/FeaturedVehicles.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import VehicleCard from '@/components/vehicle/VehicleCard';
import { vehicleApi, Vehicle } from '@/lib/api/client';

export default function FeaturedVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await vehicleApi.getFeatured(6); // fetch 6 featured vehicles
      if (response.success) {
        setVehicles(response.data);
      }
    } catch (error) {
      console.error('Error fetching featured vehicles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold">Featured Units</h2>
          <Button asChild variant="outline">
            <Link href="/vehicles">View All Vehicles</Link>
          </Button>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-96 bg-gray-200 animate-pulse rounded-lg"
                />
              ))
            : vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
        </div>
      </div>
    </section>
  );
}
