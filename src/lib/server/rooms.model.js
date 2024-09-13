import { prisma } from "./db";
import { timeZone } from "$lib/settings";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);

export async function getReservations(date) {
  const start = dayjs(date).tz(timeZone).hour(0).minute(0).second(0);
  const end = dayjs(date).tz(timeZone).hour(23).minute(59).second(59);

  let reservations = await prisma.reservation.findMany({
    where: { startTime: { gte: start, lte: end } },
  });

  return { reservations, error: false };
}
export async function getRooms() {
  try {
    let rooms = await prisma.room.findMany({});

    return { rooms, error: false };
  } catch (e) {
    return { error: e.message };
  }
}
export async function getLocations() {
  try {
    let locations = await prisma.location.findMany({});

    return { locations, error: false };
  } catch (e) {
    return { error: e.message };
  }
}
export async function newRoom(name, size, locationId, details) {
  try {
    await prisma.room.create({
      data: { name, size, locationId, details },
    });
    console.log("Here");

    return { error: false };
  } catch (e) {
    return { error: e.message };
  }
}
export async function newLocation(name) {
  try {
    await prisma.location.create({
      data: { name },
    });

    return { error: false };
  } catch (e) {
    return { error: e.message };
  }
}
export async function editRoom(roomId, uname, usize, ulocationId, udetails) {
  try {
    if (uname && uname != "") {
      await prisma.room.update({
        where: { id: roomId },
        data: { name: uname.toString() },
      });
    }

    if (usize > 0) {
      await prisma.room.update({
        where: { id: roomId },
        data: { size: usize },
      });
    }
    if (ulocationId && ulocationId != "") {
      await prisma.room.update({
        where: { id: roomId },
        data: { locationId: ulocationId },
      });
    }
    if (udetails && udetails != "") {
      await prisma.room.update({
        where: { id: roomId },
        data: { details: udetails },
      });
    }
    return { error: false };
  } catch (e) {
    return { error: e.message };
  }
}
export async function editLocation(locationId, name) {
  try {
    await prisma.location.update({
      where: { id: locationId },
      data: { name },
    });

    return { error: false };
  } catch (e) {
    return { error: e.message };
  }
}

export async function reserveRoom(roomId, userId, startTime, title, details, length) {
  try {
    await prisma.reservation.create({
      data: {
        roomId,
        userId,
        startTime,
        title,
        details,
        length,
      },
    });
    return { error: false };
  } catch (e) {
    return { error: e.message };
  }
}
