<script lang="ts">
  import { closeModal, closeAllModals, openModal, modals } from "svelte-modals";
  import { fade, scale } from "svelte/transition";
  import dayjs from "dayjs";

  export let isOpen;
  export let resvObj: reservationObject

  let errorMsg: string;

  let timeStart = resvObj.startTime;
  let timeStartS = (dayjs(resvObj.startTime).get("hour") * 100).toString();
  let timeEnd = (dayjs(resvObj.startTime).get("hour") * 100 + (resvObj.length % 2) * 30 + Math.floor(resvObj.length / 2) * 100).toString();
</script>

{#if isOpen}
  <button type="button" class="backdrop z-10" on:click={closeModal}>
    <button class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" on:click|stopPropagation transition:fade={{ duration: 200 }}>
      <div class="mt-3 text-center" transition:scale={{ duration: 200 }}>
        <div class="m-3">
          <h1>{resvObj.title}</h1>
          {timeStart}
          {timeStartS}
          {timeEnd}
          <br />
          {resvObj.length / 2}
          <br />
          <label for="timeStart">Start Time</label>
          <select name="timeStart" id="timeStart" value={timeStartS}>
            {#each Array(36) as _, i}
              <option value={(Math.floor(i / 2) * 100 + 600 + (i % 2) * 30).toString().padStart(4, "0")}>{(Math.floor(i / 2) * 100 + 600 + (i % 2) * 30).toString().padStart(4, "0")}</option>
            {/each}
          </select>
        </div>

        <div class="m-3">
          <label for="timeEnd">End Time</label>
          <select name="timeEnd" id="timeEnd" value={timeEnd}>
            {#each Array(36) as _, i}
              <option value={(Math.floor(i / 2) * 100 + 600 + (i % 2) * 30).toString().padStart(4, "0")}>{(Math.floor(i / 2) * 100 + 600 + (i % 2) * 30).toString().padStart(4, "0")}</option>
            {/each}
          </select>
        </div>

        {#if errorMsg}
          <div class="notice error m-2">
            {errorMsg}
          </div>
        {/if}
        <button class="m-3" type="submit">Update Reservation</button>
        <button class="m-3" type="button">Delete Reseveration</button>
      </div>
    </button>
  </button>
{/if}

<style>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
