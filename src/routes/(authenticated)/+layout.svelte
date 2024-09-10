<script lang="ts">
  import { Logo } from "$lib/settings";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<div class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <a href="/" class="navbar-brand">
      <img src={Logo} alt="" width="45px" /> Room Reservation
    </a>
    <div class="navbar-nav d-flex flex-row flex-grow-1 justify-content-between px-5">
      <a class="nav-link" href="/reservations">Reservations</a>
      <a class="nav-link" href="/spaces">Manage Spaces</a>
      <a class="nav-link" href="/users">Manage Users</a>
      <a class="nav-link" href="/register">Register User</a>
      <a class="nav-link" href="/profile">Profile</a>
    </div>
    <div class="h-100">{data.user.name}
        ({data.user.role})
    </div>
  </div>
</div>

<slot />
