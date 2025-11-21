// RentToOwnPage.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function RentToOwnPage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero */}
      <section className="w-full py-20 bg-[#1E1E1E] text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Rent-to-Own</h1>
        <p className="text-lg opacity-80">Drive your dream car with flexible monthly payments.</p>
      </section>

      {/* 3-Step Process */}
      <section className="grid md:grid-cols-3 gap-6 w-full max-w-6xl py-16 px-4">
        {["Apply Online", "Get Approved", "Drive Your Car"].map((step, i) => (
          <Card className="p-6 text-center rounded-2xl" key={i}>
            <CardContent>
              <h2 className="text-2xl font-bold mb-2">{step}</h2>
              <p className="opacity-70">Simple and fast process designed for everyone.</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Requirements */}
      <section className="w-full max-w-4xl py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Requirements</h2>
        <ul className="space-y-4 text-lg">
          <li>✔ Valid ID</li>
          <li>✔ Proof of Billing</li>
          <li>✔ Proof of Income</li>
          <li>✔ 2 Personal References</li>
        </ul>
      </section>

      {/* Calculator */}
      <section className="w-full max-w-4xl py-16 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Estimate Your Monthly Payment</h2>
        <Card className="p-6">
          <CardContent className="grid md:grid-cols-3 gap-6">
            <div>
              <Label>Car Price</Label>
              <Input placeholder="e.g. 850000" />
            </div>
            <div>
              <Label>Down Payment</Label>
              <Input placeholder="e.g. 100000" />
            </div>
            <div>
              <Label>Months</Label>
              <Input placeholder="36" />
            </div>
          </CardContent>
          <div className="text-center mt-6">
            <Button className="px-10 py-3 rounded-2xl">Calculate</Button>
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section className="w-full max-w-4xl py-20 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">FAQ</h2>
        <Tabs defaultValue="a">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="a">Approval</TabsTrigger>
            <TabsTrigger value="b">Payments</TabsTrigger>
            <TabsTrigger value="c">Vehicles</TabsTrigger>
          </TabsList>
          <TabsContent value="a" className="p-4 opacity-80">Approval is processed within 24-48 hours.</TabsContent>
          <TabsContent value="b" className="p-4 opacity-80">Payments are monthly with flexible terms.</TabsContent>
          <TabsContent value="c" className="p-4 opacity-80">Choose from sedans, SUVs, pickups, and more.</TabsContent>
        </Tabs>
      </section>

      {/* CTA */}
      <section className="w-full py-16 bg-[#1E1E1E] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
        <Button className="px-12 py-4 rounded-2xl text-lg">Start Application</Button>
      </section>
    </div>
  );
}

// ContactPage.tsx
export function ContactPage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero */}
      <section className="w-full py-20 bg-[#1E1E1E] text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg opacity-80">We’re here to assist you.</p>
      </section>

      {/* Contact Form */}
      <section className="w-full max-w-4xl py-16 px-4 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-3xl font-bold mb-6">Send a Message</h2>
          <div className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input placeholder="Your name" />
            </div>
            <div>
              <Label>Email</Label>
              <Input placeholder="you@example.com" />
            </div>
            <div>
              <Label>Message</Label>
              <Input placeholder="How can we help you?" />
            </div>
            <Button className="px-10 py-3 rounded-2xl mt-4">Submit</Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <Card className="p-6 rounded-2xl">
            <CardContent>
              <h3 className="text-xl font-bold mb-2">Phone</h3>
              <p className="opacity-80">+63 900 000 0000</p>
            </CardContent>
          </Card>

          <Card className="p-6 rounded-2xl">
            <CardContent>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="opacity-80">support@carshey.com</p>
            </CardContent>
          </Card>

          <Card className="p-6 rounded-2xl">
            <CardContent>
              <h3 className="text-xl font-bold mb-2">Location</h3>
              <p className="opacity-80">Quezon City, Metro Manila</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="w-full max-w-5xl py-10 px-4">
        <div className="w-full h-72 bg-gray-200 rounded-2xl flex items-center justify-center">
          <p className="opacity-60">Map Placeholder</p>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16 bg-[#1E1E1E] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
        <Button className="px-12 py-4 rounded-2xl text-lg">Call Us Now</Button>
      </section>
    </div>
  );
}
