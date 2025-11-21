// frontend/app/(main)/page.tsx

import HeroSection from '@/components/home/HeroSection';
import BrandShowcase from '@/components/home/BrandShowcase';
import FeaturedVehicles from '@/components/home/FeaturedVehicles';
import HowItWorks from '@/components/home/HowItWorks';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import SellYourCar from '@/components/home/SellYourCar';
import { testDriveApi } from '@/lib/api/client';
export const metadata = {
  title: 'Carshey Philippines | Rent to Own Your Dream Car',
  description: 'Same-day approval, no bank requirements. Flexible rent-to-own car financing in the Philippines.',
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with rotating vehicle showcase */}
      <HeroSection />

      {/* Brand Showcase */}
      <BrandShowcase />

      {/* Featured Units */}
      <FeaturedVehicles />

      {/* How It Works */}
      <HowItWorks />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Sell Your Car CTA */}
      <SellYourCar />
    </div>
  );
}