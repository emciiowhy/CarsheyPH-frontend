"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Menu,
  X,
  Search,
  Heart,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Vehicles", href: "/vehicles" },
  { name: "Rent to Own", href: "/rent-to-own" },
  { name: "Financing", href: "/financing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="
      sticky top-0 z-50 w-full 
      bg-[#0B0B0F]/90 
      backdrop-blur-xl 
      border-b border-white/10 
      shadow-[0_0_25px_rgba(0,0,0,0.45)]
    "
    >
      {/* TOP CONTACT BAR */}
      <div
        className="
        hidden md:block 
        bg-[#111217]/95 
        backdrop-blur-md 
        text-gray-300 
        py-2 border-b border-white/10
      "
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-xs tracking-wide">
            <div className="flex items-center gap-6">
              <a
                href="tel:+639155152314"
                className="flex items-center gap-2 hover:text-[#F9C601] transition"
              >
                <Phone className="h-4 w-4 text-[#F9C601]" />
                <span>+63 915 515 2314</span>
              </a>

              <a
                href="mailto:info@carshey.ph"
                className="flex items-center gap-2 hover:text-[#F9C601] transition"
              >
                <Mail className="h-4 w-4 text-[#F9C601]" />
                <span>info@carshey.ph</span>
              </a>
            </div>

            <div className="text-[10px] text-gray-400 uppercase">
              Same-Day Process • Immediate Release
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="
            bg-gradient-to-br from-[#F9C601] to-[#E4B400] 
            p-2 rounded-md shadow-md 
            group-hover:scale-105 transition
          "
          >
            {/* Removed Car Icon */}
          </div>

          <div className="flex flex-col">
            <span className="text-2xl font-bold text-white leading-none">
              Carshey
            </span>
            <span className="text-xs text-gray-400">Philippines</span>
          </div>
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md text-gray-200 lg:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex gap-x-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all",
                pathname === item.href
                  ? "text-[#F9C601] bg-white/5 shadow-inner"
                  : "text-gray-200 hover:text-[#F9C601] hover:bg-white/5"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* ACTION BUTTONS */}
        <div className="hidden lg:flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full hover:bg-white/10 hover:text-[#F9C601]"
          >
            <Link href="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>

          <SignedIn>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full hover:bg-white/10 hover:text-[#F9C601]"
            >
              <Link href="/saved">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>

            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <Button className="rounded-full text-gray-200 hover:text-[#F9C601]">
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          {/* CTA BUTTON */}
          <Button
            asChild
            className="
              rounded-full px-6 py-2 
              font-semibold 
              bg-gradient-to-r from-[#F9C601] to-[#E4B400]
              text-black 
              shadow-[0_4px_15px_rgba(249,198,1,0.3)]
              hover:shadow-[0_6px_20px_rgba(249,198,1,0.4)]
              hover:scale-105 transition
            "
          >
            <Link href="/vehicles" className="flex items-center">
              Browse Cars
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0B0B0F]/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-base font-medium transition-all",
                  pathname === item.href
                    ? "bg-white/10 text-[#F9C601]"
                    : "text-gray-200 hover:bg-white/5 hover:text-[#F9C601]"
                )}
              >
                {item.name}
              </Link>
            ))}

            <div className="border-t border-white/10 pt-4 space-y-4">
              <SignedIn>
                <div className="flex items-center justify-between px-4 pb-2">
                  <span className="text-sm text-gray-400">Account</span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full rounded-full">
                    Login / Register
                  </Button>
                </SignInButton>
              </SignedOut>

              {/* MOBILE CTA */}
              <Button
                asChild
                className="
                  w-full rounded-full 
                  bg-gradient-to-r from-[#F9C601] to-[#E4B400]
                  text-black 
                  shadow-md hover:scale-105 transition
                "
              >
                <Link
                  href="/vehicles"
                  className="flex items-center justify-center"
                >
                  Browse Cars
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
