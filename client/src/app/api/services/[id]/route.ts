import { NextResponse } from "next/server";
import { getService } from "@/lib/content";

export const revalidate = 3600;

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const service = await getService(params.id);
  if (!service) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(service);
}
