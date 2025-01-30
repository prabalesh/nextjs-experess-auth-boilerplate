"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth-store";
import Spinner from "@/components/Spinner";
import useMounted from "@/hooks/use-mounted";

export default function HomePage() {
    const { user, isAuthenticated, isLoading } = useAuthStore();
    const { mounted } = useMounted();

    if (isLoading || !mounted) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
            <div className="text-center space-y-6">
                <h1 className="text-4xl font-bold text-primary">
                    Welcome {user?.email ? user.email : "Guest"}
                </h1>

                {isAuthenticated ? (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button asChild>
                            <Link href="/dashboard">Go to Dashboard</Link>
                        </Button>
                    </motion.div>
                ) : (
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
                )}
            </div>
        </div>
    );
}
