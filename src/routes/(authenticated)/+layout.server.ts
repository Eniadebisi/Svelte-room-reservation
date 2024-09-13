import { error, redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  const user = locals.user;

  if (!user) throw error(400, { message: "Restricted" });

  return { user };
}
