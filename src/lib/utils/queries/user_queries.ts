import prisma from '@/lib/prisma'
import { hashPassword } from '@/lib/utils/helpers'

// ============================================================== CREATE
export const createUser = async (username: string, email: string, password: string) => {
    try {
        // Is user already exists ? 
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error("User already exists",);
        }
        const hashed_pwd = await hashPassword(password);
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashed_pwd,
            },
        });
        return newUser;
    } catch (e:any) {
        throw new Error(e.message);
    }
};

// ============================================================== GET
export const getUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        include: {
            liked: true,
            videos: true,
        }
    })
    return user;
}

export const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users");
    }
};