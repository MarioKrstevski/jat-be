import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

async function getClerkJWTPublicKey() {
  // This URL is an example; you'll need to get the actual URL from Clerk documentation or your Clerk dashboard
  const jwksUrl =
    "https://helped-flamingo-42.clerk.accounts.dev/.well-known/jwks.json";
  const response = await fetch(jwksUrl);
  const jwks = await response.json();
  console.log("jwks", jwks);
  // Assuming there's a single key, but you might need to select the key based on the JWT kid header
  const publicKey = jwks.keys[0].x5c[0];
  console.log("publicKey", publicKey);
  // Convert x5c (certificate) to PEM format for jwt.verify
  return `-----BEGIN CERTIFICATE-----\n${publicKey}\n-----END CERTIFICATE-----`;
}

export const validateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authorization header is missing or invalid",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    console.log("validating");
    const publicKey = await getClerkJWTPublicKey();
    // Verify the token
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["RS256"],
    });
    // Attach user info to the request

    console.log("decoded", decoded);
    // @ts-ignore
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired token" });
  }
};
