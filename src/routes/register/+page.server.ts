import { signUp } from "$lib/server/user.model";
import type { Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";

export async function load({locals}) {
  if (locals.user && locals.user.role < 2) redirect(302, "/reservations");

  return {user: locals.user};
}

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const data = Object.fromEntries(await request.formData());

    const email = data.email;
    const password = data.password;
    const name = data.name;
    const role = data.role;

    if (!email || !password) {
      return fail(400, {
        error: "Missing email or password",
      });
    }

    const { error } = await signUp(email, name, password, role);

    if (error) {
      return fail(401, {
        error,
      });
    }
  },
};
