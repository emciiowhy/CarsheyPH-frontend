//frontend/components/home/HowItWorks.tsx
'use client';

import { CheckCircle2, FileText, Car, Key } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { icon: FileText, title: 'Simple Requirements', description: '2 valid IDs, proof of income, and proof of billing' },
    { icon: CheckCircle2, title: 'One Day Process', description: 'Fast approval without bank requirements' },
    { icon: Car, title: 'Choose Your Car', description: 'Select from our wide range of quality vehicles' },
    { icon: Key, title: 'Same Day Release', description: 'Drive home your dream car immediately' },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-red-600 to-red-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-red-100">Rent to Own in 4 Easy Steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                <step.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-red-100">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
