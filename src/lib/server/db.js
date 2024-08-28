import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

// db.$on("query", (e) => {})

export async function queryRooms() {
  const rooms = await db.room.findMany();
  return rooms;
}
