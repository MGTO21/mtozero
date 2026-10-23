import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/verify-admin";
import { CONTENT_TAG } from "@/lib/firebase-config";

// Called by the /admin panel after every save so edits show up immediately.
export async function POST(request: NextRequest) {
  if (!(await verifyAdminToken(request.headers.get("authorization")))) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }
  revalidateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
