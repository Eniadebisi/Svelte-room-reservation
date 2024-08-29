import { prisma } from "$lib/server/db";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "$env/static/private";

export const handle = async ({ event, resolve }) => {
  const { cookies, locals } = event;
  const authCookie = cookies.get("AuthorizationToken");

  if (authCookie) {
    // Remove Bearer prefix
    const token = authCookie.split(" ")[1];
    try {
      const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
      if (typeof jwtUser === "string") {
        throw new Error("Something went wrong");
      }

      const user = await prisma.user.findUnique({
        where: {
          id: jwtUser.id,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const sessionUser = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      locals.user = sessionUser;
    } catch (error) {
      console.error(error);
    }
  }

  return await resolve(event);
};
