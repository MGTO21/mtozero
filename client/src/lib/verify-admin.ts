import "server-only";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { firebaseConfig, ADMIN_EMAILS } from "./firebase-config";

const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"),
);

// Verifies a Firebase Auth ID token and returns the admin email, or null.
export async function verifyAdminToken(authHeader: string | null): Promise<string | null> {
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://securetoken.google.com/${firebaseConfig.projectId}`,
      audience: firebaseConfig.projectId,
    });
    const email = typeof payload.email === "string" ? payload.email.toLowerCase() : null;
    if (!email || payload.email_verified !== true || !ADMIN_EMAILS.includes(email)) return null;
    return email;
  } catch {
    return null;
  }
}
