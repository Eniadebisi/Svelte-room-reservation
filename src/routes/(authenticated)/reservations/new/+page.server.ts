import { fail, redirect } from "@sveltejs/kit";
import { getLocations, getRooms, newRoom, reserveRoom } from "$lib/server/rooms.model";
import type { Actions } from "./$types";
import dayjs from "dayjs";
import { timeZone } from "$lib/settings";

import utc  from "dayjs/plugin/utc";
dayjs.extend(utc);

import timezone  from "dayjs/plugin/timezone";
dayjs.extend(timezone);

export const load = async ({ parent }) => {
  const { user } = await parent();
  const { rooms } = await getRooms();
  if (!rooms) throw new Error();

  const { locations } = await getLocations();
  if (!locations) throw new Error();
  return { rooms, locations, user };
};

export const actions: Actions = {
  default: async ({ cookies, request }) => {
    const data = Object.fromEntries(await request.formData());

    const roomId = parseInt(data.roomId.toString());
    const userId = parseInt(data.userId.toString());
    const date = data.date.toString();
    const timeStartHH = data.timeStart.toString();
    const timeEndHH = data.timeEnd.toString();
    const eventTitle = data.eventTitle;
    const eventDetails = data.eventDetails;

    if (!roomId || !date || !timeStartHH || !timeEndHH || !eventTitle || !eventDetails) {
      return fail(401, {
        error: "Missing one or more details",
      });
    }

    if (timeEndHH < timeStartHH) {
      return fail(401, {
        error: "End time must be after start time.",
      });
    }

    let length = Math.round((parseInt(timeEndHH) - parseInt(timeStartHH)) / 100) * 2 + ((parseInt(timeEndHH) - parseInt(timeStartHH)) % 100 > 0 ? 1 : 0);
    let startTime = dayjs(date)
      .hour(parseInt(timeStartHH) / 100)
      .minute(parseInt(timeStartHH) % 100)
      .second(0)
      .millisecond(0)
      .tz(timeZone);
    console.log(startTime);

    const { error } = await reserveRoom(roomId, userId, startTime, eventTitle, eventDetails, length);
    if (error) {
      return fail(401, {
        error,
      });
    }
    return {success: true}
  },
};
