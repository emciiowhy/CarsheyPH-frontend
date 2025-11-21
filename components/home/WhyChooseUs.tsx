//frontend/components/home/WhyChooseUs.tsx
'use client';

import { Shield, Clock, DollarSign, Users } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    { icon: Shield, title: 'No Bank Approval', description: 'Bypass traditional banking requirements' },
    { icon: Clock, title: 'Same Day Release', description: 'Get your car within 24 hours' },
    { icon: DollarSign, title: 'Flexible Payment', description: 'Affordable monthly installments' },
    { icon: Users, title: 'After-Sales Support', description: 'Dedicated customer service team' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Carshey?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-100 text-red-600 mb-4">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
