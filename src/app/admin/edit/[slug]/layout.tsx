import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Edit blog | Nilesh's Blog",
}

export default function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
