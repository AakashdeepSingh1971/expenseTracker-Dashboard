import jwt from "jsonwebtoken";

export interface AuthUser {
    id: string;
}

/**
 * Verifies the Authorization header ("Bearer <token>")
 * and returns the decoded user payload if valid.
 * Returns null if missing or invalid.
 */
export function verifyAuthHeader(req: Request): AuthUser | null {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || "") as AuthUser;
        return payload;
    } catch (err) {
        console.error("JWT verification failed:", err);
        return null;
    }
}
