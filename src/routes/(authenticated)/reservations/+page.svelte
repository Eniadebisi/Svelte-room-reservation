<script lang="ts">
  import type { PageData } from "./$types";
  import { sampleLocations, sampleRooms, sampleReservations } from "$lib/assets/sample";
  import { dateFormat } from "$lib/helpers";
  export let data: PageData;

  let users = [];
  let date = data.date ? data.date : new Date()
  users.push(data.user);
</script>

<div class="px-4 py-1 mt-1 text-center d-flex flex-column align-items-center">
  <h1 class="mb-3">Reservations for {dateFormat(date, "ddd, MMM Do")}</h1>

  <div class="container text-center mb-2">
    <div class="row align-items-start">
      <div class="col">
        <input type="date" name="date" id="date" />
        <button type="button"> Go to date </button>
      </div>
      <div class="col">
        <button type="button"> New Reservation </button>
      </div>
      <div class="col">
        <button type="button"> New Location </button>
      </div>
    </div>
  </div>

  <div class="w-100">
    <div class="d-flex overflow-x-hidden mt-3">
      <div class="rowStart">
        <div class="lCell Locations">Locations</div>
        {#each sampleLocations as loc}
          <div class="lCell locHeaderColor">{loc.name}</div>

          {#each sampleRooms.filter((room) => room.location === loc.id) as room}
            <div class="lCell roomHeaderColor">
              {room.name}
            </div>
          {/each}
        {/each}
      </div>
      <div class="rowEnd overflow-x-scroll">
        <div class="tableRow">
          {#each Array(18) as _, i}
            <div class="rCell time-header">{i + 6}:00</div>
          {/each}
        </div>
        {#each sampleLocations as loc}
          <div class="tableRow">
            {#each Array(18) as _, i}
              <div class="rCell locRCell"></div>
            {/each}
          </div>
          {#each sampleRooms.filter((room) => room.location === loc.id) as room}
            <div class="tableRow">
              {#each Array(18) as _, i}
                <div class="rCell"></div>
              {/each}
              {#each sampleReservations.filter((resv) => resv.roomId === room.id) as resv}
                <div class="reservation" style="width: {85 * resv.length}px;margin-left: {85 * parseInt(dateFormat(resv.startTime, 'H')) - 6 * 85}px;">Here</div>
              {/each}
            </div>
          {/each}
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .rowStart {
    min-width: 150px;
    max-width: 150px;
    z-index: 1;
  }
  .rCell {
    min-width: 85px;
    width: 85px;
    padding: 1px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #989898;
  }
  .lCell {
    border: 1px solid #989898;
    min-width: 150px;
    width: 150px;
    padding: 1px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .locRCell,
  .locHeaderColor {
    background-color: #e6e6e6;
  }
  .rowEnd {
    display: flex;
    flex-direction: column;
    -ms-overflow-style: none;
    scrollbar-width: none;
    width: 1530px;
  }
  .tableRow {
    position: relative;
    width: 1530px;
    height: 40px;
    /* border: 0.5px solid #000000 !important; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
  }
  .reservation {
    left: 0;
    position: absolute;
    background-color: #4caf50;
    color: white;
    text-align: center;
    padding: 5px;
    border-radius: 5px;
  }
  .time-header {
    position: sticky;
    top: 0;
    z-index: 1;
  }
  .time-header,
  .Locations {
    background-color: #989898;
    color: white;
  }
</style>
