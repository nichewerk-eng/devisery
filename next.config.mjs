/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://cdn-uicons.flaticon.com",
                            "frame-src 'self' https://challenges.cloudflare.com",
                            "style-src 'self' 'unsafe-inline' https://cdn-uicons.flaticon.com",
                            "img-src 'self' data: https:",
                            "font-src 'self' data:",
                            "connect-src 'self' https://challenges.cloudflare.com https://vitals.vercel-insights.com",
                        ].join("; "),
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
