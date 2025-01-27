import { Toaster } from "sonner";

export default function ToasterComponent() {
    return (
        <Toaster position="top-right" richColors closeButton duration={3000} />
    );
}
