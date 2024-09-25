<script lang="ts">
  import { enhance } from "$app/forms";
  import { timeZone } from "$lib/settings";
  import { Notifications, acts } from "@tadashi/svelte-notification";

  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  dayjs.extend(utc);
  import timezone from "dayjs/plugin/timezone";
  dayjs.extend(timezone);
  import AdvancedFormat from "dayjs/plugin/advancedFormat";
  dayjs.extend(AdvancedFormat);

  /** @type {import('./$types').PageData} */
  export let data;

  /** @type {import('./$types').ActionData} */
  export let form;

  let date: Date = new Date();
  let startTime: string = dayjs(new Date()).toISOString();
  let timeStartHH: string = "0600";
  let recurring = false;
  let weekday = date;

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
      <input
        type="date"
        name="date"
        id="date"
        bind:value={date}
        on:change={(e) => {
          startTime = dayjs(date)
            .hour(parseInt(timeStartHH) / 100)
            .minute(parseInt(timeStartHH) % 100)
            .second(0)
            .millisecond(0)
            .tz(timeZone)
            .utc()
            .toISOString();
        }}
        required
      />
      <input type="hidden" name="startTime" id="startTime" bind:value={startTime} />
    </div>

    <!-- {startTime} -->

    <div class="m-3">
      <label for="timeStart">Start Time</label>
      <select
        name="timeStart"
        id="timeStart"
        bind:value={timeStartHH}
        on:change={(e) => {
          startTime = dayjs(date)
            .hour(parseInt(e.target.value) / 100)
            .minute(parseInt(e.target.value) % 100)
            .second(0)
            .millisecond(0)
            .tz(timeZone)
            .utc()
            .toISOString();
        }}
        required
      >
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
      <textarea name="eventDetails" id="eventDetails" maxlength="200" placeholder="Features" required />
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

    <!-- {#if form?.success}
      {form.startTime}
    {/if} -->

    <button>Submit</button>
  </form>
</div>

<Notifications />
