<script lang="ts">
  import { closeModal, closeAllModals, openModal, modals } from "svelte-modals";
  import { fade, scale } from "svelte/transition";
  import dayjs from "dayjs";

  export let isOpen;
  export let resvObj: reservationObject;
  export let openEditResv;
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
        <div class="mt-3 text-center" transition:scale={{ duration: 200 }}>
          <h3 class="">{resvObj.title}</h3>
          <div class="mt-2 px-7 py-3">
            Details: {resvObj.details}
            <br />
            Date: {dayjs(resvObj.startTime).toISOString()}
            <br />
            Time: {(dayjs(resvObj.startTime).hour() * 100 + dayjs(resvObj.startTime).minute()).toString().padStart(4, "0")} - {(
              dayjs(resvObj.startTime)
                .add(resvObj.length * 30, "minute")
                .hour() *
                100 +
              dayjs(resvObj.startTime)
                .add(resvObj.length * 30, "minute")
                .minute()
            )
              .toString()
              .padStart(4, "0")}
          </div>
          <div class="items-center px-4 py-3">
            <button on:click={closeModal} class=""> Close </button>
            <button on:click={openEditResv} class=""> Edit </button>
          </div>
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
