import express, { NextFunction, Request, Response, Router } from "express";
import { generateToken, verifyToken, UserPayload } from "../utils/auth";
import User from "../models/auth_model";

const router: Router = Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const user = new User({ email, password });
      await user.save();
      res.json({ message: "User created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email, password });
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      // Generate a token using the user's data
      const tokenPayload: UserPayload = {
        userId: user.id,
        email: user.email,
        // ...
      };
      const token = generateToken(tokenPayload);
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.get("/protectedRoute", async (req: Request, res: Response) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const [bearer, token] = authorizationHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = verifyToken(token);
    // You can now use the decoded payload to authorize access to the protected resource
    res.json({ message: "Access granted!" });
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;
