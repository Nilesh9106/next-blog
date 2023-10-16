"use client"
import { useEffect, useState } from "react"
import { IBlog } from "@/models/Blog";
import { getBlogs } from "@/services/blogService";
import BlogCard from "./blogCard";
import Loading from "./Loading";


export default function BlogList() {
    const [blogs, setBlogs] = useState([] as IBlog[])

    useEffect(() => {
        getBlogs().then((blogs) => {
            setBlogs(JSON.parse(JSON.stringify(blogs)));
        });
    }, []);
    return (
        blogs.length === 0 ?
            <Loading /> :
            <div className='my-5 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 '>
                {blogs.map((blog, index) => {
                    return (
                        <BlogCard key={index} blog={blog} />
                    );
                })}
            </div>
    );
}
