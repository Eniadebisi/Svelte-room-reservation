<script lang="ts">
  import { enhance } from "$app/forms";
  import { websiteName } from "$lib/settings";
  import type { ActionData, PageData } from "./$types";

  export let data: PageData;
  let showPW = false;
  function togglePW() {
    showPW = !showPW;
  }
  export let form: ActionData;
</script>

<div class="fullHeight d-flex align-items-center flex-column justify-content-center row-gap">
  <h1 class="text-center display-1">Register New User</h1>

  <form
    class="container-sm text-center"
    action="?"
    use:enhance={({ formElement, formData, action, cancel, submitter }) => {
      let pw = formData.get("password");
      let vPw = formData.get("verifyPassword");
      if (pw !== vPw && !!form) {
        cancel();
        form.error = "Passwords don't match";
      }

      let role = formData.get("role");
      if (role == "-1" && !!form) {
        cancel();
        form.error = "Please select a role";
      }

      return async ({ result, update }) => {
        update();
        // `result` is an `ActionResult` object
        // `update` is a function which triggers the default logic that would be triggered if this callback wasn't set
      };
    }}
    method="POST"
  >
    <div class="input-group mb-3 align-middle">
      <span class="input-group-text" id="basic-addon1">A</span>
      <input spellcheck="false" name="name" type="name" class="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
    </div>

    <div class="input-group mb-3 align-middle">
      <span class="input-group-text" id="basic-addon1">@</span>
      <input name="email" type="email" class="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" />
    </div>

    <div class="input-group mb-3 align-middle">
      <span class="input-group-text" id="basic-addon1">**</span>

      <input name="password" type={showPW ? "text" : "password"} id="PW" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" />

      <button type="button" class="input-group-text" id="basic-addon1" on:click={togglePW}><i class={"bi bi-eye" + (showPW ? "" : "-slash") + "-fill"}></i></button>
    </div>

    <div class="input-group mb-3 align-middle">
      <span class="input-group-text" id="basic-addon1">**</span>
      <input class="form-control" type="password" name="verifyPassword" placeholder="Verify Password" />
    </div>

    <div class="input-group mb-3 align-middle">
      <select class="form-control" name="role" id="role" required>
        <option selected value="-1">Select a role...</option>
        <option value="2">Admin</option>
        <option value="1">User</option>
        <option value="0">Guest</option>
      </select>
    </div>

    {#if form?.error}
      <div class="notice error m-2">
        {form.error}
      </div>
    {/if}

    <button>Sign In</button>
  </form>
</div>

<style>
  .error {
    border-color: red;
  }
  .notice {
    font-style: italic;
    color: orangered;
  }
</style>
