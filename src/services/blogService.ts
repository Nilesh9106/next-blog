"use server"
import Blog, { IBlog } from "@/models/Blog";
import connectDB from "@/models/connect";
import { Query } from "mongoose";

export async function getBlogs() {
    await connectDB();
    let blogs = await Blog.find({}).sort({ createdAt: -1 }) as IBlog[];
    return JSON.parse(JSON.stringify(blogs));
}

export async function getBlog(slug: string) {
    await connectDB();
    let blog = await Blog.findOne({ slug: slug });
    // convert to JSON to remove the _id and __v fields
    return JSON.parse(JSON.stringify(blog));
}

export async function addBlog(blog: IBlog) {
    await connectDB();
    let res = await Blog.create({
        title: blog.title,
        description: blog.description,
        content: blog.content,
        image: blog.image,
        slug: blog.slug,
        likedBy: blog.likedBy,
        keywords: blog.keywords,
        comments: blog.comments,
    });
    console.log(res);
    return JSON.parse(JSON.stringify(res));
}

export async function updateBlog(blog: IBlog) {
    await connectDB();
    let res = await Blog.updateOne({ slug: blog.slug }, {
        title: blog.title,
        description: blog.description,
        content: blog.content,
        image: blog.image,
        slug: blog.slug,
        likedBy: blog.likedBy,
        keywords: blog.keywords,
        comments: blog.comments,
    });
    console.log(res);
    return JSON.parse(JSON.stringify(res));
}

export async function deleteBlog(slug: string) {
    await connectDB();
    let res = await Blog.deleteOne({ slug: slug });
    console.log(res);
    return JSON.parse(JSON.stringify(res));
}
