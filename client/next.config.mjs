import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
const csp = [
    "default-src 'self'",
    // Next.js needs 'unsafe-inline' for its inline hydration/streaming scripts,
    // and 'unsafe-eval' in dev mode only (webpack HMR uses eval-based source maps)
    process.env.NODE_ENV === 'development'
        ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com"
        : "script-src 'self' 'unsafe-inline' https://apis.google.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://images.unsplash.com https://*.public.blob.vercel-storage.com https://lh3.googleusercontent.com",
    "font-src 'self' data:",
    "connect-src 'self' https://*.googleapis.com https://vercel.com https://*.vercel-storage.com",
    "frame-src https://mtozero-web.firebaseapp.com https://accounts.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
].join('; ');

const securityHeaders = [
    { key: 'Content-Security-Policy', value: csp },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: '*.public.blob.vercel-storage.com',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            },
        ];
    },
};

export default withNextIntl(nextConfig);
