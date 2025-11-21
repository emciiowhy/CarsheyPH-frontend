//frontend/components/home/SellYourCar.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SellYourCar() {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Do You Have <span className="text-red-600">Something</span> To Sell?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get the best value for your vehicle. Quick evaluation and instant offers.
          </p>
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
            <Link href="/sell-car">SELL YOUR CAR TODAY</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
