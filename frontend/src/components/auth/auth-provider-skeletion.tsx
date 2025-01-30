import { Skeleton } from "@/components/ui/skeleton";

export default function AuthProviderSkeleton() {
    return (
        <>
            <Skeleton className="w-full h-[4vh]" />
            <Skeleton className="w-full h-[4vh]" />
        </>
    );
}
