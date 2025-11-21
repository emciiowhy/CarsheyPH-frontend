import { Vehicle } from "@/types/Vehicle";

export async function fetchVehicles(): Promise<Vehicle[]> {
  const res = await fetch("http://localhost:5000/api/vehicles");
  if (!res.ok) throw new Error("Failed to fetch vehicles");
  return res.json();
}
