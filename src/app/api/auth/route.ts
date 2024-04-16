import { verifyToken } from "@/utils/auth";
import { HttpStatusCode } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const payload = await verifyToken(cookies().get("token")?.value!);
    if (payload) {
      return NextResponse.json(
        { user: payload },
        { status: HttpStatusCode.Ok }
      );
    } else {
      return NextResponse.json(
        { message: "Unauthorized", user: null },
        { status: HttpStatusCode.Unauthorized }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: HttpStatusCode.InternalServerError }
    );
  }
};
