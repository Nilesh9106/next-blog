import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    cookies().delete("token");
    return NextResponse.json(
      { message: "Logged out" },
      { status: HttpStatusCode.Ok }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to logout" },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
