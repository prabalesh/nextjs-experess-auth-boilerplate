// src/components/header/UserActions.jsx
"use client";

import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { motion } from "framer-motion";
import { MotionDiv } from "@/components/motion/motion-div";

export const UserActions = () => (
    <MotionDiv className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
            <motion.div whileTap={{ scale: 0.9 }}>
                <LogOut className="h-4 w-4" />
            </motion.div>
        </Button>
        <Button variant="outline" size="sm">
            <User className="mr-2 h-4 w-4" />
            johndoe@gmail.com
        </Button>
    </MotionDiv>
);
