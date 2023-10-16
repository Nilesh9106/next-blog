import DashBoard from "@/components/dashboard/DashBoard";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Nilesh's Blog",
}

export default function page() {
    return (
        <>
            <DashBoard />
        </>
    )
}
