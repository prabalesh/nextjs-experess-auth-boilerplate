"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/hooks/useAuth";
import AuthProviders from "@/components/providers/auth-providers";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginWithEmail } = useAuth();

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await loginWithEmail(email, password);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex min-h-screen items-center justify-center bg-background"
        >
            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl shadow-lg">
                <motion.h2
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold text-center text-primary"
                >
                    Login
                </motion.h2>

                <form onSubmit={handleEmailLogin} className="space-y-4">
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <motion.div whileTap={{ scale: 0.98 }}>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </motion.div>
                </form>

                <div className="relative py-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-muted"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-4 text-muted-foreground">OR</span>
                    </div>
                </div>

                <AuthProviders />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-sm text-muted-foreground"
                >
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-primary hover:underline"
                    >
                        Register
                    </a>
                </motion.p>
            </div>
        </motion.div>
    );
}
