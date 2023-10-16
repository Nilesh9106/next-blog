"use client"
import Loading from "@/components/Loading";
import AddBlog from "@/components/dashboard/AddBlog";
import { IBlog } from "@/models/Blog";
import { getBlog } from "@/services/blogService";
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<IBlog | null>(null);
  useEffect(() => {
    getBlog(params.slug).then((blog) => {
      setBlog(blog);
    });
  }, []);

  return (
    <>
      {blog === null ? <Loading /> :
        <AddBlog editBlog={blog} />
      }
    </>
  )
}
