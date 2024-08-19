/** @type {import('next').NextConfig} */
const nextConfig = {
    // serverRuntimeConfig: {
    //     PROJECT_ROOT: __dirname
    // },
    env: {
        PROJECT_ROOT: process.env.PROJECT_ROOT || '',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '3000',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_DATA_URL,
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
