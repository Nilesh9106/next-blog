import connectDB from "@/models/connect";
import User from "@/models/User";
import { MyPayload } from "@/types/auth";
import { createToken } from "@/utils/auth";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "password must be at least 8 characters" }),
});

export async function POST(request: NextRequest) {
  try {
    const body = schema.safeParse(await request.json());
    if (body.success) {
      const { email, username, password } = body.data;
      await connectDB();

      if (await User.findOne({ username: username.toLowerCase() })) {
        return NextResponse.json(
          { message: "username already exists" },
          { status: HttpStatusCode.BadRequest }
        );
      }
      if (await User.findOne({ email: email.toLowerCase() })) {
        return NextResponse.json(
          { message: "email already exists" },
          { status: HttpStatusCode.BadRequest }
        );
      }
      const newUser = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password: password,
      });
      if (!newUser) {
        return NextResponse.json(
          { message: "User not created" },
          { status: HttpStatusCode.BadRequest }
        );
      }
      const payload: MyPayload = {
        id: newUser._id,
        isAdmin: newUser.isAdmin,
        username: newUser.username,
        email: newUser.email,
      };
      const token = await createToken(payload);
      cookies().set("token", token, { maxAge: 30 * 24 * 60 * 60 });
      return NextResponse.json(
        { token, user: newUser, message: "User created." },
        { status: HttpStatusCode.Created }
      );
    } else {
      return NextResponse.json(
        { errors: body.error.errors, message: "Validation errors" },
        { status: HttpStatusCode.BadRequest }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
}
