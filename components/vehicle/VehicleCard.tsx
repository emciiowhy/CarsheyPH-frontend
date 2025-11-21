//frontend/components/vehicle/VehicleCard.tsx
import { Vehicle, getVehicleImageUrl } from "@/lib/api/client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Fuel, Gauge, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  const formatPrice = (price?: number) => {
    if (price == null) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const statusVariant =
    vehicle.status === "available"
      ? "success"
      : vehicle.status === "reserved"
      ? "warning"
      : "destructive";

  // Safe fallback image
  const imageUrl = vehicle.thumbnailUrl ?? "/placeholder-car.png";

  return (
    <Card
      className="
        overflow-hidden 
        bg-[#0B0B0F] 
        border border-white/10 
        rounded-xl 
        transition-all duration-300 
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.35)]
        hover:-translate-y-1
      "
    >
      <div className="relative h-48 bg-black overflow-hidden group flex items-center justify-center">
        <Image
          src={imageUrl}
          alt={`${vehicle.brand} ${vehicle.model}`}
          width={400}
          height={250}
          className="rounded-lg object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {vehicle.status && (
          <Badge
            className="
              absolute top-3 right-3 
              backdrop-blur-md 
              bg-white/10 
              border border-white/20 
              text-white
              capitalize
            "
            variant={statusVariant}
          >
            {vehicle.status}
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white line-clamp-1">
            {vehicle.brand} {vehicle.model}
          </h3>

          <p className="text-sm text-gray-400">{vehicle.year}</p>
        </div>

        <p className="text-2xl font-bold text-[#F9C601] mt-2">
          {formatPrice(vehicle.price)}
        </p>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <Fuel className="w-4 h-4 text-[#F9C601]" />
            <span className="capitalize">{vehicle.fuelType || "N/A"}</span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Settings className="w-4 h-4 text-[#F9C601]" />
            <span className="capitalize">{vehicle.transmission || "N/A"}</span>
          </div>

          {vehicle.mileage != null && (
            <div className="flex items-center gap-2 text-gray-400">
              <Gauge className="w-4 h-4 text-[#F9C601]" />
              <span>{vehicle.mileage.toLocaleString()} km</span>
            </div>
          )}

          {vehicle.color && (
            <div className="flex items-center gap-2 text-gray-400">
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: vehicle.color.toLowerCase() }}
              />
              <span className="capitalize">{vehicle.color}</span>
            </div>
          )}
        </div>

        {vehicle.description && (
          <p className="text-sm text-gray-400 mt-3 line-clamp-2">
            {vehicle.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="pt-3">
        <Link href={`/vehicles/${vehicle.id}`} className="w-full">
          <Button
            className="
              w-full 
              rounded-full 
              bg-gradient-to-r from-[#F9C601] to-[#E4B400]
              text-black font-semibold
              hover:scale-[1.03] 
              transition-all 
              shadow-[0_4px_15px_rgba(249,198,1,0.3)]
            "
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
