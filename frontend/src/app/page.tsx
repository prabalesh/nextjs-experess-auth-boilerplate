"use client";

import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/stores/authStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
    const { user, isAuthenticated } = useAuthStore();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center p-4 bg-background"
        >
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                }}
                className="text-center space-y-6"
            >
                <h1 className="text-4xl font-bold text-primary">
                    Welcome {isAuthenticated ? user?.email : "Guest"}
                </h1>

                {!isAuthenticated ? (
                    <div className="space-x-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block"
                        >
                            <Button asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block"
                        >
                            <Button variant="outline">
                                <Link href="/register">Register</Link>
                            </Button>
                        </motion.div>
                    </div>
                ) : (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button asChild>
                            <Link href="/dashboard">Go to Dashboard</Link>
                        </Button>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}
