// File: frontend/components/configurator/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ArrowLeft, Share2 } from 'lucide-react';

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

export default function ConfiguratorPage() {
  const router = useRouter();

  const [color, setColor] = useState<string>(colors[0].name);
  const [wheel, setWheel] = useState<string>(wheels[0].name);
  const [interior, setInterior] = useState<string>(interiors[0].name);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const basePrice = 1000000; // example base price

  useEffect(() => {
    const colorPrice = colors.find(c => c.name === color)?.price || 0;
    const wheelPrice = wheels.find(w => w.name === wheel)?.price || 0;
    const interiorPrice = interiors.find(i => i.name === interior)?.price || 0;

    setTotalPrice(basePrice + colorPrice + wheelPrice + interiorPrice);
  }, [color, wheel, interior]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => router.push('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <h1 className="text-3xl font-bold my-6">Vehicle Configurator</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration options */}
          <div className="lg:col-span-2 space-y-6">
            {/* Color Selector */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="font-semibold mb-2">Select Color</h2>
              <Select value={color} onValueChange={setColor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Color" />
                </SelectTrigger>
                <SelectContent>
                  {colors.map(c => (
                    <SelectItem key={c.name} value={c.name}>
                      {c.name} {c.price > 0 ? `(₱${c.price.toLocaleString()})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Wheels Selector */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="font-semibold mb-2">Select Wheels</h2>
              <Select value={wheel} onValueChange={setWheel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Wheels" />
                </SelectTrigger>
                <SelectContent>
                  {wheels.map(w => (
                    <SelectItem key={w.name} value={w.name}>
                      {w.name} {w.price > 0 ? `(₱${w.price.toLocaleString()})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Interior Selector */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="font-semibold mb-2">Select Interior</h2>
              <Select value={interior} onValueChange={setInterior}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Interior" />
                </SelectTrigger>
                <SelectContent>
                  {interiors.map(i => (
                    <SelectItem key={i.name} value={i.name}>
                      {i.name} {i.price > 0 ? `(₱${i.price.toLocaleString()})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price summary */}
          <div className="lg:col-span-1 bg-white rounded-lg p-6 shadow-sm sticky top-4">
            <h3 className="font-semibold text-lg mb-4">Price Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Base Price</span>
              <span>₱{basePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total Price</span>
              <span className="text-red-600 font-bold">₱{totalPrice.toLocaleString()}</span>
            </div>

            <Button className="mt-4 w-full" variant="default" onClick={() => alert('Saved!')}>
              Save Configuration
            </Button>

            <Button
              className="mt-2 w-full"
              variant="outline"
              onClick={() => alert('Share link copied!')}
            >
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
