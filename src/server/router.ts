import { router, procedure} from './trpc';

import { videoRouter } from '@/server/routers/video_router';
import { userRouter } from '@/server/routers/user_router';
// type User = {
//   id: string;
//   name: string;
//   bio?: string;
// };
// const users: Record<string, User> = {};

// export const t = initTRPC.context<Context>().create();

export const appRouter = router({
    video: videoRouter,
    user: userRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;