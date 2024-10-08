<script lang="ts">
  import { closeModal, closeAllModals, openModal, modals } from "svelte-modals";
  import { fade, scale } from "svelte/transition";
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  dayjs.extend(utc);
  import timezone from "dayjs/plugin/timezone";
  dayjs.extend(timezone);

  import type { User } from "@prisma/client";
  import { timeZone } from "./settings";
  import { goto, invalidateAll } from "$app/navigation";

  export let isOpen, rooms, user: User, refresh: Function;
  let date = dayjs(new Date()).format("YYYY-MM-DD");
  let roomId: number,
    start: Date,
    sTime = 600,
    eTime = 700,
    eventTitle = "",
    eventDetails = "Features",
    length;
  let recurring = false;
  let weekday = date;
  let formError = false;

  function getWeekText(date: Date) {
    let weekday = dayjs(date).format("dddd");
    let weekNum = Math.ceil(dayjs(date).date() / 7);

    switch (weekNum) {
      case 1:
        return "1st" + " " + weekday;
      case 2:
        return "2nd" + " " + weekday;
      case 3:
        return "3rd" + " " + weekday;
      default:
        return weekNum + "rd" + " " + weekday;
    }
  }
  async function submitReservation() {
    const startTime = dayjs(date)
      .tz(timeZone)
      .hour(sTime / 100)
      .minute(sTime % 100)
      .toISOString();
    const endTime = dayjs(date)
      .tz(timeZone)
      .hour(eTime / 100)
      .minute(eTime % 100)
      .toISOString();

    const response = await fetch("/api/newReservation", {
      method: "POST",
      body: JSON.stringify({ roomId, userId: user.id, startTime, endTime, eventTitle, eventDetails }),
    });
    const { error } = await response.json();

    if (error) {
      formError = error;
    } else {
      refresh()
    }
  }
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents text-center">
      <h1>Create new booking</h1>

      <div class="m-2">
        <label for="roomId">Room</label>
        <select name="roomId" id="roomId" bind:value={roomId}>
          <option selected>Select a room..</option>
          {#if rooms}
            {#each rooms as room}
              <option value={room.id}>{room.name} ({room.size})</option>
            {/each}
          {:else}
            Failed to load
          {/if}
        </select>
      </div>

      <div class="m-2">
        <label for="startDate">Date</label>
        <input type="date" name="startDate" id="startDate" bind:value={date} />

        <br />
        <select name="startTime" id="startTime" bind:value={sTime}>
          {#each Array(36) as _, i}
            <option value={(Math.floor(i / 2) + 6) * 100 + (i % 2) * 30}>{(Math.floor(i / 2) + 6) * 100 + (i % 2) * 30}</option>
          {/each}
        </select>
        ➡️
        <select name="startTime" id="startTime" bind:value={eTime}>
          {#each Array(36) as _, i}
            <option value={(Math.floor(i / 2) + 6) * 100 + (i % 2) * 30}>{(Math.floor(i / 2) + 6) * 100 + (i % 2) * 30}</option>
          {/each}
        </select>
      </div>

      <div class="m-2">
        <label for="eventTitle">Event Title</label>
        <input type="text" name="eventTitle" id="eventTitle" bind:value={eventTitle} maxlength="50" />
      </div>

      <div class="m-2">
        <label for="eventDetails" class="align-top">Event Details</label>
        <textarea name="eventDetails" id="eventDetails" maxlength="200" bind:value={eventDetails} />
      </div>

      <!-- {getWeekText(date)}
  <div class="m-3">
    <label for="recurrence">Make Recurring: </label>
    <select name="recurrence" id="recurrence">
      <option value="0">Does not repeat</option>
      <option value="1">Daily</option>
      <option value="2">Weekly on {dayjs(date).format("dddd")}</option>
      <option value="3">Monthly on the {dayjs(date).format()}</option>
      <option value="4">Every weekday (Monday to Friday)</option>
    </select>
  </div>

  {#if recurring}
    <select name="" id=""></select>
  {/if} -->

      <br />
      {#if formError}
        <div class="notice error m-2">
          {formError}
        </div>
      {/if}
      <div>
        <button class="" on:click={submitReservation}>Submit</button>
        <button type="button" on:click={closeModal} class=""> Close </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
  }
  .contents {
    min-width: 240px;
    border-radius: 6px;
    padding: 16px;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
  }
</style>
