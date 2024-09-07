<script lang="ts">
  import { enhance } from "$app/forms";
  import { timeZone } from "$lib/settings";
  import dayjs from "dayjs";
  import utc from "dayjs/plugin/utc";
  dayjs.extend(utc);
  import timezone from "dayjs/plugin/timezone";
  dayjs.extend(timezone);

  /** @type {import('./$types').PageData} */
  export let data;

  /** @type {import('./$types').ActionData} */
  export let form;
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
      <input type="date" name="date" id="date" required />
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
      <input type="text" name="eventTitle" id="eventTitle" required />
    </div>

    <div class="m-3">
      <label for="eventDetails" class="align-top">Event Details</label>
      <textarea name="eventDetails" id="eventDetails" required />
    </div>

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
