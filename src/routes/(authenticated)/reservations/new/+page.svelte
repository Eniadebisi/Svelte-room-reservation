<script lang="ts">
  import { enhance } from "$app/forms";
  import { timeZone } from "$lib/settings";
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  dayjs.extend(utc);
  import timezone from "dayjs/plugin/timezone";
  import { Notifications, acts } from "@tadashi/svelte-notification";
  dayjs.extend(timezone);
  import AdvancedFormat from "dayjs/plugin/advancedFormat";
  dayjs.extend(AdvancedFormat);

  /** @type {import('./$types').PageData} */
  export let data;

  /** @type {import('./$types').ActionData} */
  export let form;

  let date = new Date();
  let recurring = false;
  let weekday = date;

  function getWeekText(date: Date) {
    let weekday = dayjs(date).format("dddd");
    let weekNum = Math.ceil(dayjs(date).date() / 7);

    switch (weekNum) {
      case 1:
        return "1st" + " " + weekday;
        break;
      case 2:
        return "2nd" + " " + weekday;
        break;
      case 3:
        return "3rd" + " " + weekday;
        break;
      default:
        return weekNum + "rd" + " " + weekday;
        break;
    }
  }
</script>

<div>
  <form class="text-center" method="POST" use:enhance>
    <h1>Create new booking</h1>
    <div class="m-3">
      <label for="roomId">Room</label>
      <select name="roomId" id="roomId" required>
        <option selected>Select a room..</option>
        {#if data.rooms}
          {#each data.rooms as room}
            <option value={room.id}>{room.name} ({room.size})</option>
          {/each}
        {:else}
          Failed to load
        {/if}
      </select>
    </div>
    <div class="m-3">
      <label for="date">Date</label>
      <input type="date" name="date" id="date" bind:value={date} required />
    </div>

    <div class="m-3">
      <label for="timeStart">Start Time</label>
      <select name="timeStart" id="timeStart">
        {#each Array(36) as _, i}
          <option value={(Math.floor(i / 2) * 100 + 600 + (i % 2) * 30).toString().padStart(4, "0")}>{(Math.floor(i / 2) * 100 + 600 + (i % 2) * 30).toString().padStart(4, "0")}</option>
        {/each}
      </select>
    </div>

    <div class="m-3">
      <label for="timeEnd">End Time</label>
      <select name="timeEnd" id="timeEnd" required>
        {#each Array(36) as _, i}
          <option value={(Math.floor(i / 2) * 100 + 600 + (i % 2) * 30).toString().padStart(4, "0")}>{(Math.floor(i / 2) * 100 + 600 + (i % 2) * 30).toString().padStart(4, "0")}</option>
        {/each}
      </select>
    </div>
    <div class="m-3">
      <label for="eventTitle">Event Title</label>
      <input type="text" name="eventTitle" id="eventTitle" maxlength="50" required />
    </div>

    <div class="m-3">
      <label for="eventDetails" class="align-top">Event Details</label>
      <textarea name="eventDetails" id="eventDetails" maxlength="200" required />
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

    <input type="hidden" name="userId" value={data.user.id} />
    <br />

    <br />
    {#if form?.error}
      <div class="notice error m-2">
        {form.error}
      </div>
    {/if}
    <button>Submit</button>
  </form>
</div>

<Notifications />
