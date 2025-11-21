'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Check, Save, Share2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { vehicleApi } from '@/lib/api/client';

export default function ConfiguratorPage() {
  const params = useParams();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { toast } = useToast();

  const [vehicle, setVehicle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [configuration, setConfiguration] = useState({
    color: '',
    colorHex: '#000000',
    wheels: '',
    interior: '',
    packages: [] as string[],
    accessories: [] as string[],
    totalPrice: 0,
  });

  const colors = [
    { name: 'Pearl White', hex: '#F8F8FF', price: 0 },
    { name: 'Midnight Black', hex: '#1C1C1C', price: 0 },
    { name: 'Silver Metallic', hex: '#C0C0C0', price: 0 },
    { name: 'Ruby Red', hex: '#9B111E', price: 15000 },
    { name: 'Deep Blue', hex: '#003087', price: 15000 },
  ];

  const wheels = [
    { name: '17" Standard Alloy', price: 0 },
    { name: '18" Sport Alloy', price: 25000 },
    { name: '19" Premium Alloy', price: 45000 },
  ];

  const interiors = [
    { name: 'Black Fabric', price: 0 },
    { name: 'Beige Leather', price: 50000 },
    { name: 'Black Leather', price: 50000 },
  ];

  const packages = [
    { name: 'Technology Package', price: 75000, features: ['360° Camera', 'Adaptive Cruise', 'Lane Keep Assist'] },
    { name: 'Premium Sound System', price: 45000, features: ['10 Speakers', 'Subwoofer', 'Amplifier'] },
    { name: 'Sunroof Package', price: 60000, features: ['Panoramic Sunroof', 'Power Shade'] },
  ];

  const accessories = [
    { name: 'All-Weather Floor Mats', price: 5000 },
    { name: 'Cargo Organizer', price: 3000 },
    { name: 'Roof Rack', price: 12000 },
    { name: 'Tint Package', price: 8000 },
  ];

  useEffect(() => {
    fetchVehicle();
  }, [params.model]);

  useEffect(() => {
    calculateTotal();
  }, [configuration, vehicle]);

  const fetchVehicle = async () => {
    try {
      const response = await vehicleApi.getBySlug(params.model as string);
      if (response.success) {
        setVehicle(response.data); // removed .vehicle
        setConfiguration(prev => ({
          ...prev,
          color: colors[0].name,
          colorHex: colors[0].hex,
          wheels: wheels[0].name,
          interior: interiors[0].name,
        }));
      }
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      toast(<div>Failed to load vehicle</div>); // JSX instead of title/description
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!vehicle) return;

    let total = vehicle.cashPrice;

    const selectedColor = colors.find(c => c.name === configuration.color);
    if (selectedColor) total += selectedColor.price;

    const selectedWheels = wheels.find(w => w.name === configuration.wheels);
    if (selectedWheels) total += selectedWheels.price;

    const selectedInterior = interiors.find(i => i.name === configuration.interior);
    if (selectedInterior) total += selectedInterior.price;

    configuration.packages.forEach(pkg => {
      const selectedPkg = packages.find(p => p.name === pkg);
      if (selectedPkg) total += selectedPkg.price;
    });

    configuration.accessories.forEach(acc => {
      const selectedAcc = accessories.find(a => a.name === acc);
      if (selectedAcc) total += selectedAcc.price;
    });

    setConfiguration(prev => ({ ...prev, totalPrice: total }));
  };

  const togglePackage = (pkgName: string) => {
    setConfiguration(prev => ({
      ...prev,
      packages: prev.packages.includes(pkgName)
        ? prev.packages.filter(p => p !== pkgName)
        : [...prev.packages, pkgName],
    }));
  };

  const toggleAccessory = (accName: string) => {
    setConfiguration(prev => ({
      ...prev,
      accessories: prev.accessories.includes(accName)
        ? prev.accessories.filter(a => a !== accName)
        : [...prev.accessories, accName],
    }));
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: `My Custom ${vehicle?.brand} ${vehicle?.model}`, url });
    } else {
      navigator.clipboard.writeText(url);
      toast(<div>Link copied to clipboard</div>); // JSX
    }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading configurator...</p>
      </div>
    </div>
  );

  if (!vehicle) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Vehicle Not Found</h2>
        <Button onClick={() => router.push('/vehicles')}>Back to Vehicles</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={() => router.push(`/vehicles/${vehicle.slug}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Vehicle
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShare}><Share2 className="w-4 h-4 mr-2" /> Share</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Vehicle Preview */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">{vehicle.brand} {vehicle.model}</h1>
                <p className="text-gray-600">Customize Your Dream Car</p>
              </div>
              <div className="relative aspect-video rounded-lg mb-6 flex items-center justify-center" style={{ backgroundColor: configuration.colorHex }}>
                <div className="text-white text-center">
                  <p className="text-2xl font-bold">{configuration.color}</p>
                  <p className="text-sm opacity-75">Color Preview</p>
                </div>
              </div>
            </div>

            {/* Packages */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-lg mb-4">Add Packages</h3>
              <div className="space-y-4">
                {packages.map(pkg => (
                  <label key={pkg.name} className={`p-4 rounded-lg border-2 transition-all cursor-pointer flex flex-col gap-2 ${configuration.packages.includes(pkg.name) ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="flex items-center gap-3">
                      <input type="checkbox" checked={configuration.packages.includes(pkg.name)} onChange={() => togglePackage(pkg.name)} className="w-5 h-5" />
                      <div>
                        <p className="font-medium">{pkg.name}</p>
                        <p className="text-sm text-red-600">+₱{pkg.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <ul className="ml-8 space-y-1">{pkg.features.map((f, idx) => <li key={idx} className="text-sm text-gray-600">• {f}</li>)}</ul>
                  </label>
                ))}
              </div>
            </div>

            {/* Accessories */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="font-semibold text-lg mb-4">Add Accessories</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {accessories.map(acc => (
                  <label key={acc.name} className={`p-4 rounded-lg border-2 transition-all cursor-pointer flex items-center gap-3 ${configuration.accessories.includes(acc.name) ? 'border-red-600 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="checkbox" checked={configuration.accessories.includes(acc.name)} onChange={() => toggleAccessory(acc.name)} className="w-5 h-5" />
                    <div>
                      <p className="font-medium text-sm">{acc.name}</p>
                      <p className="text-sm text-red-600">+₱{acc.price.toLocaleString()}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h3 className="font-semibold text-lg mb-4">Price Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Base Price</span>
                  <span>₱{vehicle.cashPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Price</span>
                  <span className="text-red-600">₱{configuration.totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
