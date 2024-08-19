import { z } from "zod"
import { procedure, router } from '@/server/trpc'
import { TRPCError } from '@trpc/server';
import { getUser, getAllUsers, createUser } from '@/lib/utils/queries/user_queries'
import { hashPassword } from '@/lib/utils/helpers'

export const userRouter = router({
    getUser: procedure
        .input(z.object({
            id: z.string().min(1, 'User id is required'),
        }))
        .query( async ({ input })=>{
            const {id} = input 
            const user = await getUser(id)
            return user
    }),
    getAllUsers: procedure.query(()=>{
        return getAllUsers()
    }),
    addUser: procedure 
        .input(z.object({
            username: z.string().min(1, 'Username is required'),
            email: z.string().email('Invalid email address'),
            password: z.string().min(6, 'Password must be at least 6 characters long'),
        }))
        .mutation(async ({ input }) => {
            try {
                const { username, email, password } = input;
                const hashedPassword = await hashPassword(password);
                const user = await createUser(username, email, hashedPassword);
                return user;
            } catch (e:any) {
                if (e.message.includes("User already exists")) {
                    // Handle user already exists error
                    throw new TRPCError({
                        code: 'CONFLICT',
                        message: 'User with this email or username already exists.',
                    });
                }else{
                    throw new TRPCError({
                        code: 'INTERNAL_SERVER_ERROR',
                        message: 'Internal server error.',
                    });
                }
            }
        }),
})