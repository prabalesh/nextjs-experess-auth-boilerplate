"use client";

import Link from "next/link";
import { MotionDiv } from "@/components/motion/motion-div";
import { useAuthStore } from "@/stores/auth-store";

export const NavLinks = () => {
    const { isAuthenticated } = useAuthStore();
    return (
        <nav className="flex items-center space-x-4">
            <MotionDiv transition={{ delay: 0.2 }}>
                {isAuthenticated && (
                    <Link
                        href="/dashboard"
                        className="text-sm text-muted-foreground"
                    >
                        Dashboard
                    </Link>
                )}
            </MotionDiv>
        </nav>
    );
};
