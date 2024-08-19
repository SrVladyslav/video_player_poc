import bcrypt from 'bcrypt'
import fs from 'fs';

const SALT_ROUNDS = 10

// Helper function to create directories if they do not exist
export const ensureDirectoryExists = async (dirPath: string) => {
    try {
        await fs.promises.access(dirPath);
    } catch (error) {
        await fs.promises.mkdir(dirPath, { recursive: true });
    }
}

/**
 * Hashes a plain text password using bcrypt.
 * @param password - The plain text password to hash.
 * @returns A Promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
    try {
        const hashedPassword:string = await bcrypt.hash(password, SALT_ROUNDS)
        return hashedPassword
    } catch (error) {
        console.error("Error hashing password:", error)
        throw new Error("Failed to hash password")
    }
};

export const HOST = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000"