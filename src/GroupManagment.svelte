{#if available.length > 0}
<div class="dropdown" class:disabled="{updating}">
    <a class="btn btn-link dropdown-toggle" tabindex="0">
        add member <i class="icon icon-plus"></i>
    </a>
                <!-- menu component -->
    <ul class="menu">
        {#each available as service}
            <li class="nav-item">
                <a href="#" on:click|preventDefault="{()=>join(service.name)}">{service.name}</a>
            </li>
        {/each}
    </ul>
</div>
{/if}
<script>
    import * as API from './api'
    import {services} from './stores'
    import {shouldUpdateGroups} from './stores'
    import {createEventDispatcher} from 'svelte';

    const dispatch = createEventDispatcher();
    export let group = '';
    export let members = [];
    let updating = false;

    $: available = $services.filter((x) => members.indexOf(x.name) === -1);

    function join(service) {
        updating = true;
        API.join(group, service).then(() => {
            dispatch('created');
        }).finally(() => updating = false)
    }
</script>