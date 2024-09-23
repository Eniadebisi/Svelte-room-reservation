<script lang="ts">
  import { fade, scale } from "svelte/transition";
  import dayjs from "dayjs";

  export let showModal = false;
  export let resvObj: { id: Number; title: String; details: String; startTime: Date; length: number };
  export let resvEditModal = false;

  function closeModal() {
    showModal = false;
  }

  function openEditResv() {
    showModal = false;
    resvEditModal = true;
  }
</script>

{#if showModal}
  <button class="backdrop z-10" on:click={closeModal}>
    <button class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" on:click|stopPropagation transition:fade={{ duration: 200 }}>
      <div class="mt-3 text-center" transition:scale={{ duration: 200 }}>
        <h3 class="">{resvObj.title}</h3>
        <div class="mt-2 px-7 py-3">
          Details: {resvObj.details}
          <br>
          Date: {dayjs(resvObj.startTime).toISOString()}
          <br>
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
