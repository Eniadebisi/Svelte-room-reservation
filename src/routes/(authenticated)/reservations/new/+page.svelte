<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
    export let data;
    let rooms = data.rooms;
</script>

<h1>Create new booking</h1>

<label for="room">Room</label>
<select name="room" id="room">
    {#each rooms as room}
        <option value={room.id}>{room.name} ({room.size})</option>
    {/each}
</select>