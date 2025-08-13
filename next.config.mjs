import nextBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = nextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    productionBrowserSourceMaps: false,
    compress: true,

    images: {
        remotePatterns: [{ protocol: 'https', hostname: '**' }],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60 * 60 * 24 * 30,
    },

    compiler: {
        removeConsole:
            process.env.NODE_ENV === 'production'
                ? { exclude: ['error'] }
                : false,
        reactRemoveProperties:
            process.env.NODE_ENV === 'production'
                ? { properties: ['^data-testid$'] }
                : false,
    },

    experimental: {
        optimizePackageImports: [
            'lucide-react',
            'framer-motion',
            '@headlessui/react',
        ],
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
        serverActions: {
            bodySizeLimit: '5mb',
        },
    },

    async headers() {
        return [
            {
                source: '/_next/static/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                // якщо маєш власну папку зі шрифтами/зображеннями — підлаштуй цей шлях
                source: '/(fonts|images)/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },

    webpack(config) {
        // твій існуючий SVG-воркфлоу
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg')
        );

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/,
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: {
                    not: [...fileLoaderRule.resourceQuery.not, /url/],
                },
                use: ['@svgr/webpack'],
            }
        );

        fileLoaderRule.exclude = /\.svg$/i;
        return config;
    },
};

export default withBundleAnalyzer(nextConfig);
