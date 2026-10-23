import { NextRequest } from "next/server";
import { handleSubmission } from "@/lib/submissions";

export async function POST(request: NextRequest) {
  return handleSubmission(request, "contact_messages", {
    name: { required: true, max: 255 },
    email: { required: true, max: 255, email: true },
    subject: { max: 255 },
    message: { required: true, max: 5000 },
  });
}
