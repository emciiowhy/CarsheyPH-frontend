// ============================================
// frontend/app/(main)/sell-car/page.tsx
// ============================================

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Upload, DollarSign, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

export default function SellCarPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    brand: '',
    model: '',
    year: '',
    variant: '',
    mileage: '',
    transmission: '',
    fuelType: '',
    color: '',
    condition: '',
    hasAccidents: false,
    serviceHistory: false,
    description: '',
    expectedPrice: '',
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const benefits = [
    'Free vehicle evaluation',
    'Quick offer within 24 hours',
    'Hassle-free documentation',
    'Same-day payment available',
    'Trade-in options available',
  ];

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trade-ins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Submission Successful!',
          description: 'We will evaluate your vehicle and contact you within 24 hours.',
        } as any);
        router.push('/');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit your vehicle',
        variant: 'destructive',
      } as any);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Sell Your Car</h1>
          <p className="text-xl text-gray-600">
            Get the best value for your vehicle. Quick evaluation and instant offers.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Benefits */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
                <h3 className="font-semibold text-lg mb-4">Why Sell to Us?</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <DollarSign className="w-5 h-5" />
                    <span className="font-semibold">Best Offer Guaranteed</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    We ensure you get the market's best price for your vehicle.
                  </p>
                </div>
              </div>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          required
                          title="First Name"
                          placeholder="First Name"
                          value={formData.firstName}
                          onChange={(e) => handleChange('firstName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          required
                          title="Last Name"
                          placeholder="Last Name"
                          value={formData.lastName}
                          onChange={(e) => handleChange('lastName', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          title="Email"
                          placeholder="example@email.com"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          title="Phone Number"
                          placeholder="09XX XXX XXXX"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Vehicle Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="brand">Brand *</Label>
                        <Input
                          id="brand"
                          required
                          title="Brand"
                          placeholder="e.g., Toyota, Honda"
                          value={formData.brand}
                          onChange={(e) => handleChange('brand', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="model">Model *</Label>
                        <Input
                          id="model"
                          required
                          title="Model"
                          placeholder="e.g., Fortuner, CR-V"
                          value={formData.model}
                          onChange={(e) => handleChange('model', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Year *</Label>
                        <Select
                          value={formData.year}
                          onValueChange={(value) => handleChange('year', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Variant</Label>
                        <Input
                          title="Variant"
                          placeholder="e.g., V 4x4"
                          value={formData.variant}
                          onChange={(e) => handleChange('variant', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Mileage (km) *</Label>
                        <Input
                          type="number"
                          required
                          title="Mileage"
                          placeholder="Mileage in km"
                          value={formData.mileage}
                          onChange={(e) => handleChange('mileage', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>Transmission *</Label>
                        <Select
                          value={formData.transmission}
                          onValueChange={(value) => handleChange('transmission', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Automatic">Automatic</SelectItem>
                            <SelectItem value="Manual">Manual</SelectItem>
                            <SelectItem value="CVT">CVT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Fuel Type *</Label>
                        <Select
                          value={formData.fuelType}
                          onValueChange={(value) => handleChange('fuelType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Gasoline">Gasoline</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                            <SelectItem value="Electric">Electric</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Color</Label>
                        <Input
                          title="Color"
                          placeholder="Vehicle Color"
                          value={formData.color}
                          onChange={(e) => handleChange('color', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle Condition */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Vehicle Condition</h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Overall Condition *</Label>
                        <Select
                          value={formData.condition}
                          onValueChange={(value) => handleChange('condition', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Excellent">Excellent</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                            <SelectItem value="Fair">Fair</SelectItem>
                            <SelectItem value="Poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="accidents"
                          title="Vehicle has been in accidents"
                          checked={formData.hasAccidents}
                          onChange={(e) => handleChange('hasAccidents', e.target.checked)}
                          className="w-4 h-4"
                        />

                        <input
                          type="checkbox"
                          id="service"
                          title="Complete service history available"
                          checked={formData.serviceHistory}
                          onChange={(e) => handleChange('serviceHistory', e.target.checked)}
                          className="w-4 h-4"
                        />

                        <Label htmlFor="service" className="cursor-pointer">
                          Complete service history available
                        </Label>
                      </div>

                      <div>
                        <Label>Additional Details</Label>
                        <textarea
                          rows={4}
                          title="Additional Details"
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="Any modifications, issues, or additional information..."
                          value={formData.description}
                          onChange={(e) => handleChange('description', e.target.value)}
                        />
                      </div>

                      <div>
                        <Label>Expected Price (Optional)</Label>
                        <Input
                          type="number"
                          title="Expected Price"
                          placeholder="₱"
                          value={formData.expectedPrice}
                          onChange={(e) => handleChange('expectedPrice', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'Submit for Evaluation'}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    We'll evaluate your vehicle and get back to you within 24 hours
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
