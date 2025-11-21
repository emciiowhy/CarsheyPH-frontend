// frontend/app/(main)/vehicles/[slug]/page.tsx


import { notFound } from "next/navigation";
import VehicleDetailClient from "@/components/vehicle/VehicleDetailClient";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default async function VehicleDetailPage(props: any) {
  const { slug } = await props.params; // ✅ FIX: await params

  try {
    const res = await fetch(`${API}/api/vehicles/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) notFound();

    const json = await res.json();
    if (!json.success) notFound();

    return <VehicleDetailClient initialData={json.data} />;
  } catch (err) {
    console.error("VehicleDetailPage error:", err);
    notFound();
  }
}

// ✅ FIX METADATA TOO (must await params)
export async function generateMetadata(props: any) {
  const { slug } = await props.params;

  try {
    const res = await fetch(`${API}/api/vehicles/${slug}`);
    if (!res.ok) return {};

    const json = await res.json();
    const v = json.data.vehicle;

    return {
      title: `${v.brand} ${v.model} ${v.year} - Carshey Philippines`,
      description: v.description ?? "",
    };
  } catch {
    return {};
  }
}
