import EnvConfig from "@/utils/config";
import { MyPayload } from "@/types/auth";
import { JWTPayload, jwtVerify, SignJWT } from "jose";

type AuthPayload = JWTPayload & MyPayload;

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload as AuthPayload;
  } catch (error) {
    return null;
  }
};

export const createToken = async (payload: any) => {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getJwtSecretKey());
  return jwt;
};

export function getJwtSecretKey() {
  const secret = EnvConfig.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }
  return new TextEncoder().encode(secret);
}
