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

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;
  if (!slug) {
    return NextResponse.json(
      { message: "Invalid slug" },
      { status: HttpStatusCode.BadRequest }
    );
  }
  await connectDB();
  let blog = await Blog.findOne({ slug: slug }).populate({
    path: "comments",
    populate: {
      path: "user",
    },
  });
  if (!blog) {
    return NextResponse.json(
      { message: "Blog not found" },
      { status: HttpStatusCode.NotFound }
    );
  }
  return NextResponse.json(
    { message: "Blog fetched successfully", blog: blog },
    { status: HttpStatusCode.Ok }
  );
};

export const PUT = authenticate(
  async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const { slug } = params;
    if (!slug) {
      return NextResponse.json(
        { message: "Invalid slug" },
        { status: HttpStatusCode.BadRequest }
      );
    }
    await connectDB();
    const data = schema.safeParse(await req.json());
    if (data.success === false) {
      return NextResponse.json(
        { message: "Invalid data", error: data.error },
        { status: HttpStatusCode.BadRequest }
      );
    }

    let res = await Blog.findOneAndUpdate({ slug: slug }, data, { new: true });
    if (!res) {
      return NextResponse.json(
        { message: "Failed to update blog" },
        { status: HttpStatusCode.InternalServerError }
      );
    }
    return NextResponse.json(
      { message: "Blog updated successfully", blog: res },
      { status: HttpStatusCode.Ok }
    );
  }
);

export const DELETE = authenticate(
  async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const { slug } = params;
    if (!slug) {
      return NextResponse.json(
        { message: "Invalid slug" },
        { status: HttpStatusCode.BadRequest }
      );
    }
    await connectDB();
    let res = await Blog.findOneAndDelete({ slug: slug });
    if (!res) {
      return NextResponse.json(
        { message: "Failed to delete blog" },
        { status: HttpStatusCode.InternalServerError }
      );
    }
    // delete blog comments
    await Comment.deleteMany({ id: { $in: res.comments } });
    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: HttpStatusCode.Ok }
    );
  }
);
