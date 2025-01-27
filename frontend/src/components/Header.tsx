"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/stores/authStore";
import { ModeToggle } from "@/components/mode-toggle";
import { LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";

export function Header() {
    const { user, isAuthenticated } = useAuthStore();
    const { logout } = useAuth();

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                <div className="flex items-center gap-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="/" className="text-lg font-bold">
                            MyApp
                        </Link>
                    </motion.div>
                    {isAuthenticated && (
                        <nav className="flex items-center space-x-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Link
                                    href="/dashboard"
                                    className="text-sm text-muted-foreground"
                                >
                                    Dashboard
                                </Link>
                            </motion.div>
                        </nav>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <ModeToggle />
                    {isAuthenticated ? (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-2"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={logout}
                                asChild
                            >
                                <motion.div whileTap={{ scale: 0.9 }}>
                                    <LogOut className="h-4 w-4" />
                                </motion.div>
                            </Button>
                            <Button variant="outline" size="sm">
                                <User className="mr-2 h-4 w-4" />
                                {user?.email}
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-2"
                        >
                            <Button asChild variant="outline">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">Register</Link>
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.header>
    );
}
