<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
  import { Notifications, acts } from "@tadashi/svelte-notification";

  async function handleRoleChange(event: Event, oldRole: number, userId: Number) {
    const { target } = event;
    if (!target) return;
    let newrole = (target as HTMLSelectElement).value;
    console.log(newrole, oldRole, userId);

    acts.add({ mode: "warn", message: `Changing userid${userId}, from ${oldRole} to ${newrole}`, lifetime: 30 });
  }
</script>

<div class="px-4 py-1 mt-1 text-center d-flex flex-column align-items-center">
  <h1 class="mb-3">Users</h1>

  <table>
    <thead>
      <th>User Name</th>
      <th>User Email</th>
      <th>User Role</th>
    </thead>

    {#each data.users as user}
      <tr>
        <td> {user.name} </td>
        <td> {user.email} </td>
        <td>
          <select name="role" id="role" on:change={(e) => handleRoleChange(e, user.role, user.id)} value={user.role}>
            <option value={1}>User</option>
            <option value={2}>Admin</option>
            <option value={3}>Owner</option>
          </select>
        </td>
      </tr>
    {/each}
  </table>
</div>
<Notifications />

<style>
  th,
  td {
    padding: 5px;

    border: 1px solid #989898;
  }
</style>
