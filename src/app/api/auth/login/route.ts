import connectDB from "@/models/connect";
import User from "@/models/User";
import { MyPayload } from "@/types/auth";
import { createToken } from "@/utils/auth";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }),
  password: z.string({ required_error: "Password is required" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = loginSchema.safeParse(await request.json());
    if (body.success) {
      const { username, password } = body.data;
      await connectDB();
      const user = await User.findOne({ username: username.toLowerCase() });
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const payload: MyPayload = {
            email: user.email,
            id: user._id,
            isAdmin: user.isAdmin,
            username: user.username,
          };
          const token = await createToken(payload);
          cookies().set("token", token, { maxAge: 30 * 24 * 60 * 60 });
          return NextResponse.json(
            {
              message: "Login Success",
              user: payload,
              token,
            },
            { status: HttpStatusCode.Ok }
          );
        } else {
          return NextResponse.json(
            { message: "Invalid Credentials" },
            { status: HttpStatusCode.Unauthorized }
          );
        }
      } else {
        return NextResponse.json(
          { message: "Invalid Credentials" },
          { status: HttpStatusCode.NotFound }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Validation errors", errors: body.error.errors },
        { status: HttpStatusCode.BadRequest }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
