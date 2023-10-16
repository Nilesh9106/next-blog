import AddBlog from "@/components/dashboard/AddBlog";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add Blog | Nilesh's Blog",
}

export default function page() {
    return (
        <>
            <AddBlog />
        </>
    )
}
