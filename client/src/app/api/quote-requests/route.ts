import { NextRequest } from "next/server";
import { handleSubmission } from "@/lib/submissions";

export async function POST(request: NextRequest) {
  return handleSubmission(
    request,
    "quote_requests",
    {
      name: { required: true, max: 255 },
      email: { required: true, max: 255, email: true },
      phone: { max: 50 },
      project_type: { required: true, max: 100 },
      budget: { max: 100 },
      timeline: { max: 100 },
      details: { required: true, max: 5000 },
    },
    { status: "new" },
  );
}
