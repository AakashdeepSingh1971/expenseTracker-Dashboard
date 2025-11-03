import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) return NextResponse.redirect(new URL("/auth", req.url));

    try {
        jwt.verify(token, process.env.JWT_SECRET || "");
        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL("/auth", req.url));
    }
}

// Only run this middleware for these routes:
export const config = {
    matcher: ["/dashboard/:path*"],
};

// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();

// export interface AuthRequest extends Request {
//   user?: { id: string };
// }

// export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const auth = req.headers.authorization;
//   if (!auth || !auth.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'No token provided' });
//   }
//   const token = auth.split(' ')[1];
//   try {
//     const payload = jwt.verify(token, process.env.JWT_SECRET || ''); // throws if invalid
//     // @ts-ignore
//     req.user = { id: (payload as any).id };
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };
