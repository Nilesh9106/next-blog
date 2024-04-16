import BlogPage from "@/components/BlogPage";
import Blog, { IBlog } from "@/models/Blog";
import connectDB from "@/models/connect";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  await connectDB();
  const blog = await Blog.findOne({ slug: params.slug });
  if (!blog) {
    notFound();
  }
  return {
    title: blog.title,
    description: blog.description,
    applicationName: "Nilesh Blogs",
    referrer: "origin-when-cross-origin",
    keywords: ["Nilesh", "Nilesh's Blog", ...blog.keywords],
    authors: [{ name: "Nilesh darji" }],
    colorScheme: "dark",
    creator: "Nilesh darji",
    manifest: "/site.webmanifest",
    robots: {
      index: true,
      follow: true,
    },
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 1,
    },

    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://nileshblogs.vercel.app/blog/${blog.slug}`,
      type: "website",
      images: blog.image,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      creator: "@thenileshdarji",
      site: "https://nileshblogs.vercel.app/",
      images: blog.image,
    },
  };
};

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPage slug={params.slug} />;
}
