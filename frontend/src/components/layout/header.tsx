"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ModeToggle } from "@/components/theme/theme-mode-toggle";
import { NavLinks } from "@/components/layout/nav-links";
import { UserActions } from "@/components/layout/user-actions";
import { AuthActions } from "@/components/layout/auth-actions";
import { useAuthStore } from "@/stores/auth-store";
import Spinner from "../Spinner";

export function Header() {
    const { isAuthenticated, isLoading } = useAuthStore();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between pl-4">
                <div className="flex items-center gap-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/" className="text-lg font-bold">
                            AuthCross
                        </Link>
                    </motion.div>
                    <NavLinks />
                </div>

                <div className="flex items-center gap-4">
                    <ModeToggle />
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            {isAuthenticated ? (
                                <UserActions />
                            ) : (
                                <AuthActions />
                            )}
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
