// src/components/header/UserActions.jsx
"use client";

import { LogOut, User } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/motion/motion-div";
import { useAuthStore } from "@/stores/auth-store";
import { useAuth } from "@/hooks/use-auth";

export const UserActions = () => {
    const { user, isAuthenticated } = useAuthStore();
    const { logout } = useAuth();

    if (!isAuthenticated) {
        return null;
    }

    return (
        <MotionDiv className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => logout()}
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
        </MotionDiv>
    );
};
