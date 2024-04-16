import Blog from "@/models/Blog";
import connectDB from "@/models/connect";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;
  if (!slug) {
    return NextResponse.json({ message: "Invalid slug" }, { status: 400 });
  }
  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const payload = await verifyToken(token);
  if (!payload) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  const blog = await Blog.findOneAndUpdate(
    { slug },
    { $pull: { likedBy: payload.id } },
    { new: true }
  );
  if (!blog) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }
  return NextResponse.json(
    { message: "Blog unliked Successfully", blog },
    { status: 200 }
  );
};
