import jwt from "jsonwebtoken";

// Define the properties of the token payload
export interface UserPayload {
  userId: string;
  email: string;
  // ...
}

// Secret key for signing and verifying tokens
const SECRET_KEY = "mysecretkey";

export function generateToken(payload: UserPayload): string {
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
}

export function verifyToken(token: string): UserPayload {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as UserPayload;
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
}
