import jwt from "jsonwebtoken";

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, process.env.PRIVATE_KEY!, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, process.env.PUBLIC_KEY!);
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
