// frontend/components/vehicle/VehicleDetailClient.tsx

'use client';

import { useState } from 'react';
import { Vehicle } from '@/lib/api/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Fuel,
  Gauge,
  Settings,
  Palette,
  Car,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Heart,
  Share2,
} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface VehicleDetailClientProps {
  // server data shape may vary; use Partial + any so TS doesn't block you.
  initialData: Partial<Vehicle> & Record<string, any>;
}

export default function VehicleDetailClient({ initialData }: VehicleDetailClientProps) {
  const router = useRouter();

  // Normalize vehicle object (safe defaults)
  const vehicle = initialData ?? {};

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Format price safely
  const formatPrice = (price?: number) => {
    if (price == null || Number.isNaN(Number(price))) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(Number(price));
  };

  // Normalize images to strings (next/image expects string | StaticImport)
  // Accept either array of strings or array of objects { url: string } or {src:string} etc.
  const images: string[] = Array.isArray(vehicle.images)
    ? vehicle.images.map((img: any) => {
        if (!img) return '/placeholder-car.jpg';
        if (typeof img === 'string') return img;
        // possible shapes: { url }, { src }, { imageUrl }, { path }
        return img.url ?? img.src ?? img.imageUrl ?? img.path ?? String(img);
      })
    : ['/placeholder-car.jpg'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Sharing (safe guards)
  const handleShare = async () => {
    if (typeof navigator === 'undefined') return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${vehicle.brand ?? ''} ${vehicle.model ?? ''}`.trim(),
          text: `Check out this ${vehicle.year ?? ''} ${vehicle.brand ?? ''} ${vehicle.model ?? ''}`.trim(),
          url: typeof window !== 'undefined' ? window.location.href : '',
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else if (typeof navigator?.clipboard?.writeText === 'function') {
      navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '');
      // Prefer a nicer toast in real app; use alert for now
      // eslint-disable-next-line no-alert
      alert('Link copied to clipboard!');
    }
  };

  // Helper for displaying small meta text
  const metaOrNA = (val: any) => (val == null || val === '' ? 'N/A' : val);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
            aria-label="Back to Vehicles"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Vehicles
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative h-96 bg-gray-200">
                <Image
                  src={images[currentImageIndex]}
                  alt={`${vehicle.brand ?? ''} ${vehicle.model ?? ''}`.trim() || 'Vehicle image'}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Navigation */}
                {images.length > 1 && (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </Button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}

                {/* Status */}
                <Badge
                  className="absolute top-4 right-4"
                  variant={vehicle.status === 'available' ? 'default' : 'muted'}
                >
                  {vehicle.status ?? 'unknown'}
                </Badge>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 p-4 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImageIndex(idx)}
                      aria-label={`View image ${idx + 1}`}
                      className={`relative w-20 h-20 flex-shrink-0 rounded border-2 overflow-hidden ${
                        idx === currentImageIndex ? 'border-red-600' : 'border-gray-300'
                      }`}
                    >
                      <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </Card>

            {/* Specs */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Year */}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Year</p>
                      <p className="font-semibold">{metaOrNA(vehicle.year)}</p>
                    </div>
                  </div>

                  {/* Fuel */}
                  <div className="flex items-start gap-3">
                    <Fuel className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Fuel Type</p>
                      <p className="font-semibold capitalize">{metaOrNA(vehicle.fuelType)}</p>
                    </div>
                  </div>

                  {/* Transmission */}
                  <div className="flex items-start gap-3">
                    <Settings className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Transmission</p>
                      <p className="font-semibold capitalize">{metaOrNA(vehicle.transmission)}</p>
                    </div>
                  </div>

                  {/* Mileage */}
                  {vehicle.mileage != null && (
                    <div className="flex items-start gap-3">
                      <Gauge className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Mileage</p>
                        <p className="font-semibold">
                          {Number(vehicle.mileage).toLocaleString()} km
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Color */}
                  {vehicle.color && (
                    <div className="flex items-start gap-3">
                      <Palette className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Color</p>
                        <p className="font-semibold capitalize">{vehicle.color}</p>
                      </div>
                    </div>
                  )}

                  {/* Body Type */}
                  {vehicle.bodyType && (
                    <div className="flex items-start gap-3">
                      <Car className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Body Type</p>
                        <p className="font-semibold capitalize">{vehicle.bodyType}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line">
                  {vehicle.description ?? 'No description available.'}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Price */}
            <Card className="sticky top-4">
              <CardHeader>
                <div>
                  <h2 className="text-2xl font-bold mb-1">
                    {(vehicle.brand ?? '') + (vehicle.model ? ` ${vehicle.model}` : '')}
                  </h2>
                  <p className="text-gray-600">{vehicle.year ?? ''}</p>
                </div>
                <div className="text-3xl font-bold text-red-600 mt-4">
                  {formatPrice(vehicle.price)}
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <Button type="button" className="w-full bg-red-600 hover:bg-red-700" size="lg" aria-label="Contact seller">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Seller
                </Button>

                <Button type="button" variant="outline" className="w-full" size="lg" aria-label="Send inquiry">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Inquiry
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsFavorite(!isFavorite)}
                    aria-pressed={isFavorite}
                    aria-label={isFavorite ? 'Remove from saved' : 'Save vehicle'}
                  >
                    <Heart
                      className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-red-600 text-red-600' : ''}`}
                      aria-hidden="true"
                    />
                    Save
                  </Button>

                  <Button type="button" variant="outline" onClick={handleShare} aria-label="Share vehicle">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>

                {vehicle.location && (
                  <div className="pt-4 border-t">
                    <div className="flex items-start gap-2 text-gray-600">
                      <MapPin className="w-5 h-5 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm">{vehicle.location}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Safety Notice */}
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <p className="text-sm text-amber-900">
                  <strong>Safety Tips:</strong> Always meet the seller in person, inspect the vehicle thoroughly, and verify all documents before making a purchase.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
