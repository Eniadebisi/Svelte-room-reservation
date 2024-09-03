import type { PageServerLoad } from "./$types";

export async function load({parent, url}) {
  const {user} = await parent()
  const date = url.searchParams.get("date")

  return {user, date};
}
