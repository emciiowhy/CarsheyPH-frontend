import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _req: NextRequest, // underscore = intentionally unused
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/vehicles/${id}`;

  const res = await fetch(backendUrl, { method: "DELETE" });

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}