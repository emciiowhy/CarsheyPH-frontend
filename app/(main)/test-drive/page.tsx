// ============================================
// frontend/app/(main)/test-drive/page.tsx
// ============================================

'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { Calendar, Clock, MapPin, Car } from 'lucide-react';
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
import { testDriveApi } from '@/lib/api/client';

export default function TestDrivePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { toast } = useToast();
  const vehicleSlug = searchParams.get('vehicle');

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicleId: '',
    preferredDate: '',
    preferredTime: '',
    location: 'Malabon Showroom',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const locations = [
    'Malabon Showroom - #95 Yanga St, Maysilo',
    'Home Service (within Metro Manila)',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in to book a test drive',
        variant: 'destructive',
      } as any);
      router.push('/login');
      return;
    }

    setIsLoading(true);
    try {
      await testDriveApi.book(formData);

      toast({
        title: 'Test Drive Booked!',
        description: 'We will contact you shortly to confirm your appointment.',
      } as any);

      router.push('/vehicles');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to book test drive',
        variant: 'destructive',
      } as any);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Book a Test Drive</h1>
            <p className="text-gray-600">
              Experience your dream car firsthand. Schedule a test drive today.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-sm border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      required
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
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="09XX XXX XXXX"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Appointment Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="date">
                      <Calendar className="inline w-4 h-4 mr-2" />
                      Preferred Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.preferredDate}
                      onChange={(e) => handleChange('preferredDate', e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>
                      <Clock className="inline w-4 h-4 mr-2" />
                      Preferred Time *
                    </Label>
                    <Select
                      value={formData.preferredTime}
                      onValueChange={(value) => handleChange('preferredTime', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Location *
                    </Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => handleChange('location', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <textarea
                      id="notes"
                      rows={3}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Any specific requirements or questions?"
                      value={formData.notes}
                      onChange={(e) => handleChange('notes', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Important Notes:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Please bring a valid driver's license</li>
                  <li>• Test drives are subject to availability</li>
                  <li>• We'll confirm your appointment within 24 hours</li>
                  <li>• Home service available within Metro Manila</li>
                </ul>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  'Booking...'
                ) : (
                  <>
                    <Car className="mr-2 w-5 h-5" />
                    Book Test Drive
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
