"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MotionDiv } from "@/components/motion/motion-div";

export const AuthActions = () => (
    <MotionDiv className="flex items-center gap-2">
        <Button asChild variant="outline">
            <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
            <Link href="/register">Register</Link>
        </Button>
    </MotionDiv>
);
