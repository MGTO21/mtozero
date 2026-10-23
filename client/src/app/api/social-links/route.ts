import { NextResponse } from "next/server";
import { getSocialLinks } from "@/lib/content";

export const revalidate = 3600;

export async function GET() {
  return NextResponse.json(await getSocialLinks());
}
