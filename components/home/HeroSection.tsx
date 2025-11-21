//frontend/components/home/HeroSection.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section
      className="
        relative
        bg-gradient-to-r from-[#0b0b0b] to-[#1a1a1a]
        text-white
        h-[620px]
        flex items-center
        overflow-hidden
      "
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_70%)]" />

      {/* Soft glow behind text */}
      <div className="absolute left-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_left,rgba(255,255,180,0.15),transparent_60%)] blur-3xl" />

      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        
        {/* Left Text Section */}
        <motion.div
          className="md:w-1/2 space-y-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-xl">
            Find Your{" "}
            <span className="text-[#F9C601] drop-shadow-[0_0_15px_rgba(249,198,1,0.7)]">
              Dream Car
            </span>{" "}
            Today
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed">
            Explore quality vehicles with easy rent-to-own plans.  
            Quick approval and same-day release.
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <Button
                asChild
                size="lg"
                className="
                  bg-[#E10600]
                  hover:bg-[#C80000]
                  text-white
                  font-semibold
                  px-8
                  py-6
                  rounded-lg
                  shadow-[0_0_20px_rgba(225,6,0,0.4)]
                "
              >
                <Link href="/vehicles">Browse Vehicles</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.35 }}
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="
                  border-[#E10600]
                  text-[#E10600]
                  hover:bg-[#E10600]
                  hover:text-white
                  font-semibold
                  px-8
                  py-6
                  rounded-lg
                "
              >
                <Link href="/sell-car">Sell Your Car</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Car Image — Floating Cinematic Motion */}
        <motion.div
          className="md:w-1/2 mt-10 md:mt-0"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          <motion.img
            src="/hero-car.png"
            alt="Hero Car"
            className="
              w-full 
              h-auto 
              rounded-xl 
              shadow-[0_20px_60px_rgba(0,0,0,0.7)]
            "
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
