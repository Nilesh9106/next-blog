import { Metadata } from "next";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Nilesh's Blog - Daily Insights and Articles by Nilesh Darji",
  description:
    "Explore a world of knowledge, insights, and articles on Nilesh's Blog. Join Nilesh Darji on a daily journey of discovery in the realms of technology, development, and more.",
  applicationName: "Nilesh Blogs",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Nilesh",
    "Nilesh's Blog",
    "Blog",
    "Technology",
    "Development",
    "Insights",
    "Articles",
    "Nilesh Darji",
    "Daily Blogs",
  ],
  authors: [{ name: "Nilesh darji" }],
  creator: "Nilesh darji",
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-site-verification": "xy1FyOILRbps4rSWe35dSmQ7AKIUFfrHPQTinrwfEUw",
  },

  openGraph: {
    title: "Nilesh's Blog - Daily Insights and Articles by Nilesh Darji",
    description:
      "Explore a world of knowledge, insights, and articles on Nilesh's Blog. Join Nilesh Darji on a daily journey of discovery in the realms of technology, development, and more.",
    url: "https://nileshblogs.vercel.app/",
    type: "website",
    images: "https://nileshblogs.vercel.app/cover.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nilesh's Blog - Daily Insights and Articles by Nilesh Darji",
    description:
      "Explore a world of knowledge, insights, and articles on Nilesh's Blog. Join Nilesh Darji on a daily journey of discovery in the realms of technology, development, and more.",
    creator: "@thenileshdarji",
    site: "https://nileshblogs.vercel.app/",
    images: "https://nileshblogs.vercel.app/cover.png",
  },
};

export default function Home() {
  return (
    <>
      <main className="p-3 md:p-6">
        <h1 className="text-3xl text-center">Latest Blogs</h1>
        <div className="w-16 h-2 mx-auto rounded-md my-2 bg-emerald-400"></div>
        <BlogList />
      </main>
    </>
  );
}
