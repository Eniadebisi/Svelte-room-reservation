import { getLocations, getReservations, getRooms } from "$lib/server/rooms.model";
import { timeZone } from "$lib/settings";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);

export async function load({ parent, url }) {
  const { user } = await parent();

  const { rooms, error: roomError } = await getRooms();
  if (roomError || !rooms) throw new Error();

  const { locations, error: locError } = await getLocations();
  if (locError || !locations) throw new Error();

  let start = dayjs(new Date()).tz(timeZone).startOf("day").utc();
  let end = dayjs(new Date()).tz(timeZone).endOf("day").utc();
  const { reservations, error: reservError } = await getReservations(start, end);
  if (reservError || !reservations) throw new Error();

  return { user, rooms, locations, reservations };
}
