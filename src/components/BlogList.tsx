"use client";
import { useEffect, useState } from "react";
import BlogCard from "./blogCard";
import Loading from "./Loading";
import { BlogType } from "@/types/models";
import { BlogService } from "@/services/blogService";

export default function BlogList() {
  const [blogs, setBlogs] = useState<BlogType[]>();
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    const res = await BlogService.getBlogs();
    if (res) {
      setBlogs(res);
    } else {
      setBlogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return loading || !blogs ? (
    <Loading />
  ) : (
    <div className="my-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 ">
      {blogs.map((blog, index) => {
        return <BlogCard key={index} blog={blog} />;
      })}
    </div>
  );
}
