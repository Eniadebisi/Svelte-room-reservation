import { getReservations } from "$lib/server/rooms.model";
import { json } from "@sveltejs/kit";
import dayjs from "dayjs";
import { timeZone } from "$lib/settings";

export async function POST({ request }) {
  const { nDate } = await request.json();

  if (!nDate) {
    return json({ error: true }, { status: 400 });
  }

  const { reservations, error: reservError } = await getReservations(dayjs(new Date(nDate)).tz(timeZone));
  if (reservError || !reservations) throw new Error();

  return json({ reservations }, { status: 201 });
}
