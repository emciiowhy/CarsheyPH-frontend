//frontend/components/home/BrandShowcase.tsx
'use client';

import Image from 'next/image';

export default function BrandShowcase() {
  const brands = [
    { name: 'BMW', logo: '/brands/bmw.svg' },
    { name: 'Chevrolet', logo: '/brands/chevrolet.svg' },
    { name: 'Jaguar', logo: '/brands/jaguar.svg' },
    { name: 'Hyundai', logo: '/brands/hyundai.svg' },
    { name: 'Suzuki', logo: '/brands/suzuki.svg' },
    { name: 'Lexus', logo: '/brands/lexus.svg' },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          {brands.map((brand) => (
            <div key={brand.name} className="flex flex-col items-center gap-2">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={96}
                height={48}
                className="object-contain"
              />
              <span className="text-sm font-medium text-gray-600">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
