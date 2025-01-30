"use client";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Toaster } from "sonner";
import QueryProvider from "@/components/react-query/query-provider";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const initializeAuth = useAuthStore((state) => state.initializeAuth);

    useEffect(() => {
        initializeAuth();
    }, [initializeAuth]);

    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <QueryProvider>
                    <div>
                        <Header />
                        {children}
                        <Toaster />
                    </div>
                </QueryProvider>
            </body>
        </html>
    );
}
