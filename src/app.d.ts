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
  id: Number;
  title: String;
  details: String;
  startTime: Date;
  length: number;
}
