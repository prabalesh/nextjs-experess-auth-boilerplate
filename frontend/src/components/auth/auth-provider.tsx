"use client";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { GoogleIcon, GithubIcon } from "@/components/icons";
import { useAuth } from "@/hooks/use-auth";
import useMounted from "@/hooks/use-mounted";
import AuthProviderSkeleton from "@/components/auth/auth-provider-skeletion";

function AuthProviders() {
    const { mounted } = useMounted();
    const { loginWithGoogle, loginWithGithub } = useAuth();

    if (!mounted) {
        return <AuthProviderSkeleton />;
    }

    return (
        <div className="space-y-2">
            <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                    variant="outline"
                    onClick={() => loginWithGoogle()}
                    className="w-full flex items-center justify-center gap-2"
                >
                    <GoogleIcon /> Login with Google
                </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.98 }}>
                <Button
                    variant="outline"
                    onClick={() => loginWithGithub()}
                    className="w-full flex items-center justify-center gap-2"
                >
                    <GithubIcon /> Login with GitHub
                </Button>
            </motion.div>
        </div>
    );
}

export default AuthProviders;
