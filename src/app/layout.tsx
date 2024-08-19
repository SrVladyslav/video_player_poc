import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
import MenuLayout from '@/components/layouts/MenuLayout'
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
});

export const metadata: Metadata = {
    title: "Video Player",
    description: "Video player made with Next.js",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <MenuLayout>
                    {children}
                </MenuLayout>
                <Toaster 
                    position="top-center"
                    className="bg-white text-[var(--blue-primary)] border-0"
                    toastOptions={{
                        classNames: {
                            error: 'bg-[var(--red)] text-white border-none',
                            success: 'text-green-400 border-none',
                            warning: 'text-yellow-400 border-none',
                            info: 'bg-white text-[var(--foreground)] border-none',
                        },
                    }}
                />
            </body>
        </html>
    );
}
