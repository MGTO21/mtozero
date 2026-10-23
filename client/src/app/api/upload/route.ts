import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/verify-admin";

// Issues short-lived Vercel Blob upload tokens to the signed-in admin only.
// The admin's Firebase ID token travels in clientPayload.
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const admin = await verifyAdminToken(clientPayload ? `Bearer ${clientPayload}` : null);
        if (!admin) throw new Error("Unauthorized");
        if (!/^(blog-images|portfolio-images)\//.test(pathname)) throw new Error("Invalid path");
        return {
          allowedContentTypes: ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"],
          maximumSizeInBytes: 8 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
