"use client";

import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import "./globals.css";
import { useAuthStore } from "@/lib/stores/authStore";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const initializeAuth = useAuthStore((state) => state.initializeAuth);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className}`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <QueryClientProvider client={queryClient}>
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <main className="flex-grow">{children}</main>
                        </div>
                        <Toaster
                            position="top-right"
                            richColors
                            closeButton
                            duration={3000}
                        />
                    </QueryClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
