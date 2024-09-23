import { prisma } from "$lib/server/db";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "$env/static/private";

export const handle = async ({ event, resolve }) => {
  const { cookies, locals } = event;
  try {
    const authCookie = cookies.get("AuthorizationToken");
    if (authCookie && authCookie.startsWith("Bearer ")) {
      const token = authCookie.split(" ")[1];
      try {
        const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
        if (typeof jwtUser === "string") {
          throw new Error("Invalid JWT token or secret key");
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
          name: user.name,
        };

        locals.user = sessionUser;
      } catch (error) {
        console.error(`Error occurred: ${error.message}`);
        console.error(`Stack trace: ${error.stack}`);
      }
    }
  } catch (error) {
    console.error(`Error occurred during cookie retrieval: ${error.message}`);
    console.error(`Stack trace: ${error.stack}`);
  }

  return await resolve(event);
};
