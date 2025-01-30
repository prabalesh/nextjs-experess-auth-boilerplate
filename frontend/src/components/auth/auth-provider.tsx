"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GoogleIcon, GithubIcon } from "@/components/icons";

function AuthProviders() {
    return (
        <div className="space-y-2">
            <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                >
                    <GoogleIcon /> Login with Google
                </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                >
                    <GithubIcon /> Login with GitHub
                </Button>
            </motion.div>
        </div>
    );
}

export default AuthProviders;
