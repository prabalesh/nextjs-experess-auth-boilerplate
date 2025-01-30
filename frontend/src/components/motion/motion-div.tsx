"use client";

import { motion, MotionProps } from "framer-motion";
import React from "react";

export const MotionDiv = ({
    children,
    ...props
}: {
    children: React.ReactNode;
} & MotionProps &
    React.HTMLAttributes<HTMLDivElement>) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        {...props}
    >
        {children}
    </motion.div>
);
