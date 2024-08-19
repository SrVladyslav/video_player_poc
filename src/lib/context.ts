import type { CreateNextContextOptions } from '@trpc/server/adapters/next';

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/v11/context
 */
export const createContext = async (opts: CreateNextContextOptions) => {
    const { req, res } = opts;

    // TODO
    
    return { req, res };
};

export type Context = Awaited<ReturnType<typeof createContext>>;