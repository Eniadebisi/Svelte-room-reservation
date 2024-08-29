import type { PageServerLoad } from "./$types";

export async function load({parent}) {
  const {user} = await parent()
  return {user};
}
