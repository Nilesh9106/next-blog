import Blog from "@/models/Blog";
import Comment from "@/models/Comment";
import connectDB from "@/models/connect";
import { verifyToken } from "@/utils/auth";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
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
  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: HttpStatusCode.Unauthorized }
    );
  }
  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: HttpStatusCode.Unauthorized }
    );
  }
  const body = await req.json();
  await connectDB();
  let blog = await Blog.findOne({ slug });
  if (!blog) {
    return NextResponse.json(
      { message: "Blog not found" },
      { status: HttpStatusCode.NotFound }
    );
  }
  const comment = await Comment.create({
    user: user.id,
    content: body.content,
  });
  blog.comments.push(comment.id);
  await blog.save();
  blog = await blog.populate({
    path: "comments",
    populate: {
      path: "user",
    },
  });
  return NextResponse.json(
    { message: "Comment added successfully", blog: blog },
    { status: HttpStatusCode.Ok }
  );
};
