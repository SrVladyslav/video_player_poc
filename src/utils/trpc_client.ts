import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '@/server/router';

function getBaseUrl() {
    if (typeof window !== 'undefined')
        // browser should use relative path
        return '';

    if (process.env.VERCEL_URL)
        // reference for vercel.com
        return `https://${process.env.VERCEL_URL}`;

    if (process.env.RENDER_INTERNAL_HOSTNAME)
        return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;

    if (process.env.SERVER_URL)
        // reference for a specific server URL, e.g. AWS, GC, Azure...
        return `https://${process.env.SERVER_URL}`;

    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

const trpc_client = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,

            // You can pass any HTTP headers you wish here
            async headers() {
                return {
                // authorization: getAuthCookie(),
                };
            },
        }),
    ]
});

export { trpc_client }