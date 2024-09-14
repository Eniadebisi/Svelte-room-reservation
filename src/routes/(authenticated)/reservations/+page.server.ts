import { getLocations, getReservations, getRooms } from "$lib/server/rooms.model";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { timeZone } from "$lib/settings";
import dayjs from "dayjs";

export async function load({parent, url}) {
  const {user} = await parent()
  let dateCheck = url.searchParams.get("date");
  
  let date;
  if (!dateCheck) {
    date = new Date();
  } else {
    date = dayjs(dateCheck).toString();
  }

  const {rooms, error: roomError} = (await getRooms());
  if (roomError || !rooms) throw new Error();
  
  const {locations, error: locError} = (await getLocations());
  if (locError || !locations) throw new Error();
  
  const { reservations, error: reservError } = await getReservations(date);
  if (reservError || !reservations) throw new Error();
  
  return {user, date, rooms, locations, reservations};
}
