import { JWT_ACCESS_SECRET } from "$env/static/private";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./db";

export async function signUp(email, name, password, role) {
  // Check if user exists by email
  try {
    const emailCheck = await prisma.user.findUnique({
      where: { email },
    });

    if (emailCheck) return { error: "User already exists with that email" };

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: await bcrypt.hash(password, 10),
        role: !role ? 1 : parseInt(role),
      },
    });
    return { user };
  } catch (e) {
    return { error: e.message };
  }
};

export async function checkSignIn(email, password) {
  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return { error: "User not found" };

  // Verify the password
  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) return { error: "Incorrect password" };

  // Check if user role is exist
  if (!(user.role >= 0)) return { error: "User restricted" };

  const jwtUser = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  // Generate token
  return {token: jwt.sign(jwtUser, JWT_ACCESS_SECRET, { expiresIn: "1d" })}
}
