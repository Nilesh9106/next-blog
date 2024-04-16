"use client";
import Loading from "@/components/Loading";
import AddBlog from "@/components/dashboard/AddBlog";
import { IBlog } from "@/models/Blog";
import { BlogService } from "@/services/blogService";
import { BlogTypeWithComments } from "@/types/models";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<BlogTypeWithComments>();
  useEffect(() => {
    BlogService.getBlogBySlug(params.slug).then((blog) => {
      setBlog(blog);
    });
  }, []);

  return <>{!blog ? <Loading /> : <AddBlog editBlog={blog} />}</>;
}
