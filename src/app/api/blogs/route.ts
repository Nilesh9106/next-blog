import Blog from "@/models/Blog";
import Comment from "@/models/Comment";
import connectDB from "@/models/connect";
import { authenticate } from "@/utils/handlers";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  slug: z.string(),
  image: z.string().optional(),
  likedBy: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  comments: z.array(z.string()).default([]),
});

export const GET = async (req: NextRequest) => {
  await connectDB();
  let blogs = await Blog.find({}).sort({ createdAt: -1 });
  return NextResponse.json(
    { message: "Blogs fetched successfully", blogs: blogs },
    { status: HttpStatusCode.Ok }
  );
};

export const POST = authenticate(async (req: NextRequest) => {
  await connectDB();
  const data = schema.safeParse(await req.json());
  if (data.success === false) {
    return NextResponse.json(
      { message: "Invalid data", error: data.error },
      { status: HttpStatusCode.BadRequest }
    );
  }
  const blog = data.data;
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
  if (!res) {
    return NextResponse.json(
      { message: "Failed to add blog" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
  return NextResponse.json(
    { message: "Blog added successfully", blog: res },
    { status: HttpStatusCode.Created }
  );
});
