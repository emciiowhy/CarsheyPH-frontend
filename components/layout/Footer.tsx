// frontend/components/layout/Footer.tsx

'use client';

import Link from 'next/link';
import { Car, Facebook, Instagram, Mail, Phone } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Vehicles', href: '/vehicles' },
  { name: 'Rent to Own', href: '/rent-to-own' },
  { name: 'Financing', href: '/financing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4 py-14">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Logo + About */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 group"
            >
              <Car className="h-8 w-8 text-red-600 transition-transform group-hover:-translate-y-1" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Carshey
              </span>
            </Link>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              The fastest way to get your dream car.
              Same-day approval. Hassle-free rent-to-own.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-300 dark:text-white uppercase tracking-wide">
              Quick Links
            </h3>

            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="
                      relative inline-block text-gray-700 dark:text-gray-200
                      transition-all duration-200 hover:text-red-600
                    "
                  >
                    {item.name}

                    {/* Underline Reveal */}
                    <span className="
                      absolute left-0 -bottom-1 h-[2px] w-0 bg-red-600
                      transition-all duration-300 group-hover:w-full
                    "></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Socials */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-white uppercase tracking-wide">
              Get in Touch
            </h3>

            <ul className="space-y-3 text-gray-700 dark:text-gray-200">
              <li className="flex items-center gap-3 hover:text-red-600 transition-all">
                <Phone className="h-4 w-4 text-red-500" />
                +63 915 515 2314
              </li>
              <li className="flex items-center gap-3 hover:text-red-600 transition-all">
                <Mail className="h-4 w-4 text-red-500" />
                support@carshey.ph
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-4">
              <Link
                href="#"
                className="
                  p-2 rounded-full
                  border border-gray-400 dark:border-gray-500
                  text-gray-700 dark:text-gray-200
                  hover:border-red-600 hover:text-red-600
                  transition-all duration-200 hover:-translate-y-1
                "
              >
                <Facebook className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="
                  p-2 rounded-full
                  border border-gray-400 dark:border-gray-500
                  text-gray-700 dark:text-gray-200
                  hover:border-red-600 hover:text-red-600
                  transition-all duration-200 hover:-translate-y-1
                "
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-300 dark:border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 tracking-wide">
            © {new Date().getFullYear()} Carshey Philippines. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
