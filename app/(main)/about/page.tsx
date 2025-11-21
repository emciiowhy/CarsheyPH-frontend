// ============================================
// frontend/app/(main)/about/page.tsx
// ============================================

import { Car, Users, Award, Target } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  const values = [
    {
      icon: Car,
      title: 'Quality Vehicles',
      description: 'We offer only thoroughly inspected, high-quality vehicles from trusted brands.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We provide personalized service every step of the way.',
    },
    {
      icon: Award,
      title: 'Transparent Process',
      description: 'No hidden fees, no surprises. Just honest, straightforward car financing.',
    },
    {
      icon: Target,
      title: 'Fast Approval',
      description: 'Get approved and drive your car home the same day with our streamlined process.',
    },
  ];

  const stats = [
    { value: '5,000+', label: 'Happy Customers' },
    { value: '10+', label: 'Years Experience' },
    { value: '500+', label: 'Vehicles Available' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">About Carshey Philippines</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              We're revolutionizing car ownership in the Philippines with our innovative
              rent-to-own program. No bank approval needed, same-day release, and flexible
              payment terms make your dream car accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in Manila, Carshey Philippines was born from a simple observation:
                  too many Filipinos struggle to own a car due to strict bank requirements and
                  lengthy approval processes.
                </p>
                <p>
                  We created a solution that eliminates these barriers. Our rent-to-own program
                  requires only basic documents, offers same-day approval, and lets you drive
                  home your chosen vehicle immediately.
                </p>
                <p>
                  Today, we've helped thousands of families and professionals achieve car
                  ownership, transforming how Filipinos access quality vehicles.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/luxury-car-showroom-stockcake.jpg"
                alt="Carshey Showroom"
                fill
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Visit Our Showroom</h2>
            <p className="text-xl text-gray-700 mb-4">
              #95 Yanga St, Maysilo, Malabon, Metro Manila
            </p>
            <p className="text-gray-600 mb-8">
              Open Monday to Saturday, 9:00 AM - 6:00 PM
            </p>
            <div className="space-y-2 text-gray-700">
              <p>📞 09554223366</p>
              <p>✉️ Support@Carshey.Ph</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}