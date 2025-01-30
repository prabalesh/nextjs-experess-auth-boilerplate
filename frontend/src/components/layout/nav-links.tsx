"use client";

import Link from "next/link";
import { MotionDiv } from "@/components/motion/motion-div";

export const NavLinks = () => (
    <nav className="flex items-center space-x-4">
        <MotionDiv transition={{ delay: 0.2 }}>
            <Link href="/dashboard" className="text-sm text-muted-foreground">
                Dashboard
            </Link>
        </MotionDiv>
    </nav>
);
