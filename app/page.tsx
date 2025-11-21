// frontend/app/page.tsx

"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import SellYourCar from "@/components/home/SellYourCar";
import BrandShowcase from "@/components/home/BrandShowcase";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full overflow-hidden bg-gray-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <HeroSection />
      </motion.div>

      {/* Brand Showcase */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <BrandShowcase />
      </motion.section>

      {/* Featured Vehicles */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <FeaturedVehicles />
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <WhyChooseUs />
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <HowItWorks />
      </motion.section>

      {/* Sell Your Car */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <SellYourCar />
      </motion.section>
    </main>
  );
}
