import { getUsers } from "$lib/server/user.model";
import type { PageServerLoad } from "./$types";

export async function load() {
  return { users: await getUsers() };
}
