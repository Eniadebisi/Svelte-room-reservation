// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user?: {
        name: string;
        id: number;
        email: string;
        role: number;
      };
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

interface reservationObject {
  id: number;
  roomId: number;
  userId: number;
  startTime: Date;
  endTime: Date | null;
  title: string;
  details: string;
  length: number | null;
}
