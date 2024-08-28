<script lang="ts">
  import { websiteName } from "$lib/helper";
  import type { PageData } from "./$types";

  export let data: PageData;
  let showPW = false;
  function togglePW() {
    showPW = !showPW;
    console.log(showPW);
  }
</script>

<div class="fullHeight d-flex align-items-center flex-column justify-content-center row-gap">
  <h1 class="text-center display-1">{websiteName}</h1>

  <div class="container-sm text-center">
    <div class="input-group mb-3 align-middle">
      <span class="input-group-text" id="basic-addon1">@</span>
      <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
    </div>
    <div class="input-group mb-3 align-middle">
      <span class="input-group-text" id="basic-addon1">**</span>
      <input type={showPW ? "text" : "password"} id="PW" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />
      <button class="input-group-text" id="basic-addon1" on:click={togglePW}><i class={"bi bi-eye" + (showPW ? "" : "-slash") + "-fill"}></i></button>
    </div>

    <button type="submit"><i class="bi bi-box-arrow-right"></i> Log In</button>
  </div>
</div>
