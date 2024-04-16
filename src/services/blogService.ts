import { BlogForm } from "@/types/form";
import { BlogType, BlogTypeWithComments } from "@/types/models";
import { errorHandler } from "@/utils/handlers";
import axios from "axios";

export class BlogService {
  static getBlogs = errorHandler(async () => {
    const res = await axios.get("/api/blogs");
    return res.data.blogs as BlogType[];
  });
  static getBlogBySlug = errorHandler(async (slug: string) => {
    const res = await axios.get(`/api/blogs/${slug}`);
    return res.data.blog as BlogTypeWithComments;
  });
  static addBlog = errorHandler(async (blog: BlogForm) => {
    const res = await axios.post("/api/blogs", blog);
    return res.data.blog as BlogType;
  });
  static updateBlog = errorHandler(async (slug: string, blog: BlogForm) => {
    const res = await axios.put(`/api/blogs/${slug}`, blog);
    return res.data.blog as BlogType;
  });
  static deleteBlog = errorHandler(async (slug: string) => {
    const res = await axios.delete(`/api/blogs/${slug}`);
    return res.data.message as string;
  });
  static likeBlog = errorHandler(async (slug: string) => {
    const res = await axios.get(`/api/blogs/${slug}/like`);
    return res.data.blog as BlogType;
  });
  static unlikeBlog = errorHandler(async (slug: string) => {
    const res = await axios.get(`/api/blogs/${slug}/unlike`);
    return res.data.blog as BlogType;
  });
  static commentOnBlog = errorHandler(async (slug: string, content: string) => {
    const res = await axios.post(`/api/blogs/${slug}/comment`, { content });
    return res.data.blog as BlogTypeWithComments;
  });
}
