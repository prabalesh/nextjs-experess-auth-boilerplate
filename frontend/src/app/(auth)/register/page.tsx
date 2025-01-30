"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthProviders from "@/components/auth/auth-provider";
import { MotionDiv } from "@/components/motion/motion-div";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
    const { registerWithEmail } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        await registerWithEmail(name, email, password);
    };

    return (
        <MotionDiv className="flex min-h-screen items-center justify-center bg-background">
            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl shadow-lg">
                <motion.h2
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold text-center text-primary"
                >
                    Register
                </motion.h2>

                <form onSubmit={handleEmailRegister} className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
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
                            Register
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

                <p className="text-center text-sm text-muted-foreground">
                    Have an account?{" "}
                    <a href="/login" className="text-primary hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </MotionDiv>
    );
}
