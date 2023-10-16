import Auth from "@/components/dashboard/Auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Authentication",
}

export default function page() {
    return (
        <>
            <Auth />
        </>
    )
}
