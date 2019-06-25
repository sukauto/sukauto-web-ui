<div class:disabled class="d-inline">
    <button class="btn btn-action" on:click="{()=> dispatch('stop')}">
        <i class="icon icon-stop"></i>
    </button>
    <button class="btn btn-action" on:click="{()=> dispatch('start')}">
        <i class="icon icon-arrow-up"></i>
    </button>
    <button class="btn btn-action" on:click="{()=> dispatch('restart')}">
        <i class="icon icon-refresh"></i>
    </button>
    <button class="btn btn-action" on:click="{()=> dispatch('update')}">
        <i class="icon icon-upload"></i>
    </button>
    <button class="btn btn-action" on:click="{()=> dispatch('delete')}">
        <i class="icon icon-delete"></i>
    </button>
</div>
<script>
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    export let disabled = false;
</script>